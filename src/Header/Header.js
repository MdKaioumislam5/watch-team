import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import './Header.css';

const Header = () => {
    const [user, setUser] = useContext(UserContext);
    // console.log(user);
    return (
        <div>
            <header className="header">
                <div className="container">
                    <div className="mainNav">
                        <div className="nav">
                            <h3>Vehicles Riders</h3>
                        </div>
                        <div className="navbar">
                            <Link className="nav_link" to="/">Home</Link>
                            <Link className="nav_link" to="/">Destination</Link>
                            <Link className="nav_link" to="/">Blog</Link>
                            <Link className="nav_link" to="/">Contact</Link>
                            {
                                !user.isLoggedIn && <Link className="btn_danger" to="/profile">Login</Link>
                            }
                            {
                                user.isLoggedIn && <Link className="nav_link" to="/">{user.name}</Link>
                            }
                        </div>

                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;