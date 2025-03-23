import React from 'react'
import {BrowserRouter,Route, Routes} from 'react-router'
import Login from './components/Login'
import Home from'./pages/Home'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import BooksList from './pages/BooksList'
import SearchBooksList from './pages/SearchBooksList'
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/profile' element={<Profile />} />
      <Route path="/book-list" element={<BooksList />} />
      <Route path="/search-book-list" element={<SearchBooksList/>} />


    </Routes>

    </BrowserRouter>
  )
}

export default App