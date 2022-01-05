import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { LogOutButton } from '../LogOutButton';
import './Navbar.css';


function Navbar() {
    const [click, setClick] = useState(false);
    const [state,setState] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    let element = state ?   <a href="/.auth/login/aad" className="nav-links-mobile">
                                <button className='btn' onClick={closeMobileMenu} />                              
                                Log In
                                <i className="fas fa-sign-in-alt"/>
                            </a> :
                            <a href="/.auth/logout" className="nav-links-mobile">
                            <button className='btn' onClick={closeMobileMenu} />
                            Log Out
                            <i className="fas fa-sign-out-alt"/>
                            </a>;

    return (
        <>
            <nav className='navbar'>
                <Link to='/user' className='navbar-logo'>
                    3D-WEB
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={ click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/invoice' className='nav-links' onClick={closeMobileMenu}>
                            Luo lasku
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/addcustomer' className='nav-links' onClick={closeMobileMenu}>
                            Lisää asiakas
                        </Link>
                    </li>
                    <li >
                        <div className='App'>
                        {element}
                        </div>
                    </li>
                </ul>
                <LogOutButton />
            </nav>



        </>
    )
}

export default Navbar;