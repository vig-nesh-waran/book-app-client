import{Link} from 'react-router'
import Cart from '../assets/img/cart.png'
import Profile from'../assets/img/profile.png'
import React, { useContext } from "react";
import { BooksContext } from "../context/BooksContext";
import Name from '../assets/img/name.png'



function Navbar() { 
    const { isLogin, badge, cart } = useContext(BooksContext);
    
  return (
    <nav className="navbar fixed-top navbar-expand bg-success navbar-dark">
        <div className="container d-flex fustify-content-between align-items-center">
            <Link className="navbar-brand" to="/">
            <img className='name' src={Name} alt="BookStore"/>
            </Link>
            <div className="collapse navbar-collapse d-flex justify-content-end align-items-center " id="navbarNavAltMarkup">
                {
                    !isLogin ?
                        <div className="navbar-nav">
                            <Link className="nav-link fw-bolder" to="/login">Login</Link>
                            <Link className="nav-link fw-bolder" to="/register">Register</Link>
                        </div>
                    :
                        <div className="navbar-nav">
                            <Link className="nav-link position-relative"  to="/cart">
                                <img src={Cart} alt="cart" className='nav-img' />
                                { badge > 0 || cart.length > 0 ?
                                <span className="position-absolute badge translate-middle badge rounded-pill bg-danger">
                                        {badge > 0 ? badge : cart.length}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                                : <span></span>
                                }
                            </Link>
                            <Link className="nav-link" to="/profile">
                                <img src={Profile} alt="profile" className='nav-img'/>
                            </Link>
                        </div>
                }
            </div>
        </div>
    </nav>
  )
}

export default Navbar