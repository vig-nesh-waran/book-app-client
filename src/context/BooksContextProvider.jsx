import { useState, useEffect, use } from "react";
import { BooksContext } from "./BooksContext";
import axios from "axios";

const BooksContextProvider = ({ children }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Multiple States
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  const [active, setActive] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchItems, setSearchItems] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [quantities, setQuantities] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [badge, setBadge] = useState(0);
  const [addOrders, setAddOrders] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  
  const [userDetails, setUserDetails] = useState(() => {
    const storedDetails = localStorage.getItem("userDetails");
    return storedDetails ? JSON.parse(storedDetails) : {};
  });


  console.log("Orders in Context:", addOrders);

  // Function to Fetch User Details
  const fetchUserDetails = async () => {
    if (!isLogin) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/userdetail/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUserDetails(response.data.userDetail);
      localStorage.setItem("userDetails", JSON.stringify(response.data.userDetail));

      
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Function to Update User Details
  const updateUserDetails = async (updatedData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/userdetail/add`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Inside updateUserDetails
      setUserDetails(response.data);
      localStorage.setItem("userDetails", JSON.stringify(response.data));
      fetchUserDetails(); 
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  // Call fetchUserDetails when user logs in
  useEffect(() => {
    if (isLogin) {
      fetchUserDetails();
    }
  }, [isLogin]);

  useEffect(() => {
      fetchUserDetails();
  }, [cart]);


  // Function to Fetch Books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=*&maxResults=40&startIndex=${pageNum}`
        )
        .then((response) => setBooks(response.data))
        .catch((error) => console.error("Error fetching books:", error));
    } catch (err) {
      setError("Failed to fetch books", err);
    }
    setLoading(false);
  };

  // Fetch users on mount
  useEffect(() => {
    fetchBooks();
  }, [pageNum]);

  // Function to Fetch Books
  const fetchSearchBooks = async () => {
    setLoading(true);
    try {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchItems}`
        )
        .then((response) => setSearchBooks(response.data))
        .catch((error) => console.error("Error fetching books:", error));
    } catch (err) {
      setError("Failed to fetch books", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSearchBooks();
  }, [searchItems]);

  // Fetch cart from API if logged in
  const fetchCart = () => {
    if (isLogin) {
      axios
        .get(`${API_BASE_URL}/cart/`, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          setCart(response.data?.books);
          const initialQuantities = {};
          response.data?.books.forEach((item) => {
            initialQuantities[item.bookId] = item.quantity || 1;
          });
          setQuantities(initialQuantities);
          setTotalAmount(response.data?.totalAmount || 0);
        })
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }

  useEffect(() => {
    fetchCart();
  }, [isLogin]);

  // Login API
  const login = async (userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, user,email } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      localStorage.setItem("email", email);
      setIsLogin(true);
      fetchUserDetails();
      setTokenExpiry();
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const setTokenExpiry = () => {
    const expiryTime = 1 * 30 * 60 * 1000; 
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userDetails");
      localStorage.removeItem("user");
      localStorage.removeItem("email");
      setIsLogin(false);
    }, expiryTime);
  }

  // Register API
  const register = async (userData) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Registration successful! Please login.");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Try again.");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    setIsLogin(false);
    setCart([]);
    setUserDetails({});
  };

  // Add to Cart API
  const addToCart = async (book) => {

    const bookData = {
      bookId: book.id,
      title: book.volumeInfo?.title || "Unknown",
      author: book.volumeInfo?.authors?.[0] || "Unknown",
      price: book.saleInfo?.listPrice?.amount || 560.70,
      thumbnail: book.volumeInfo?.imageLinks?.thumbnail || ""
    };

    if (!isLogin) {
      alert("Oops! Please Login first!. and Then Add Your Perfect One :)");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/cart/add`,
        bookData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // setCart(response.data);
      setCart((prevCart) => {
        const isBookInCart = prevCart.some((item) => item.id === book.id);
        if (isBookInCart) {
          return prevCart.filter((item) => item.id !== book.id); // Remove if already in cart
        } else {
          return [...prevCart, book]; // Add to cart
        }
      });
      fetchCart()
    } catch (error) {
      console.error("Error adding book to cart:", error);
    }
  };


  const totalQuantity = cart.reduce((sum, book) => sum + book.quantity, 0);

  useEffect(() => {
    setBadge(totalQuantity);
  }, [cart, quantities]);

  // Update Cart Quantity API
  const updateCart = async (bookId, quantity) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/cart/update`,
        { bookId, quantity },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      //setCart(response.data);
      setCart((prevCart) => {
        const isBookInCart = prevCart.some((item) => item.id === books.id);
        if (isBookInCart) {
          return prevCart.filter((item) => item.id !== books.id); // Remove if already in cart
        } else {
          return [...prevCart, books]; // Add to cart
        }
      });
      fetchCart()

    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Remove from Cart API
  const removeFromCart = async (bookId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/cart/remove/${bookId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // setCart(response.data);
      setCart((prevCart) => {
        const isBookInCart = prevCart.some((item) => item.id === books.id);
        if (isBookInCart) {
          return prevCart.filter((item) => item.id !== books.id); // Remove if already in cart
        } else {
          return [...prevCart, books]; // Add to cart
        }
      });
      fetchCart()

    } catch (error) {
      console.error("Error removing book from cart:", error);
    }
  };

    // Clear Cart Data API
    const clearCart = async (bookId) => {
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/cart/clear`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchCart()
  
      } catch (error) {
        console.error("Error removing book from cart:", error);
      }
    };

    const placeOrderAPI = async (orderDetails) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${API_BASE_URL}/orders/place`,
          {
            products: orderDetails.items.map(item => ({
              productId: item._id || item.bookId,
              productName: item.title,
              productImage: item.thumbnail,
              quantity: item.quantity,
              price: item.price,
            })),
            totalAmount: orderDetails.totalAmount,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAddOrders(response.data.order);
      } catch (error) {
        console.error("❌ Error placing order:", error.response?.data || error.message);
      }
    };

     // 2. Get Orders
  const getOrdersAPI = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/`, 
        {
          headers: 
          {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
      setMyOrders(response.data);
      console.log("📦 Orders fetched:", response.data);
    } catch (error) {
      console.error("❌ Error fetching orders:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (isLogin) {
      getOrdersAPI();
    }
  }, [isLogin]);

  // 3. Delete Order
  const deleteOrderAPI = async (orderId) => {
    try {
      await axios.delete(`${API_URL}/orders/${orderId}`, {
        headers: 
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setMyOrders(prev => prev.filter(order => order._id !== orderId));
      console.log("🗑️ Order deleted:", orderId);
    } catch (error) {
      console.error("❌ Error deleting order:", error.response?.data || error.message);
    }
  };

  // 4. Update Order Status
  const updateOrderStatusAPI = async (orderId) => {
    try {
      const response = await axios.put(`${API_URL}/orders/${orderId}`, {}, 
        {
        headers: 
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      // Replace updated order in state
      setMyOrders(prev =>
        prev.map(order =>
          order._id === orderId ? response.data : order
        )
      );
      console.log("🔁 Order status updated:", response.data);
    } catch (error) {
      console.error("❌ Error updating status:", error.response?.data || error.message);
    }
  };


  return (
    <BooksContext.Provider
      value={{
        books,
        loading,
        error,
        fetchBooks,
        isLogin,
        setIsLogin,
        active,
        setActive,
        cart,
        setCart,
        searchItems,
        setSearchItems,
        searchBooks,
        setSearchBooks,
        setPageNum,
        pageNum,
        quantities,
        setQuantities,
        totalAmount,
        badge,
        setBadge,
        login,
        register,
        logout,
        addToCart,
        updateCart,
        removeFromCart,
        totalQuantity,
        userDetails,
        fetchUserDetails,
        updateUserDetails,
        setAddOrders,
        clearCart,
        placeOrderAPI,
        updateOrderStatusAPI,
        getOrdersAPI,
        // quantities
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
