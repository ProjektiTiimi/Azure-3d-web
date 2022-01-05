import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { LogOutButton } from '../LogOutButton';
import { LogInButton } from '../LogInButton';
import './Navbar.css';


function Navbar() {
    const [click, setClick] = useState(false);
    const [logged,setLogged] = useState<boolean>(false);

    const resetLocalStorage = () =>{
        localStorage.clear();
    };

    useEffect(() => {
        let id = localStorage.getItem('userID');
        handleLogged();
    },[]);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const handleLogged = ( () => {
        let id = localStorage.getItem('userID');
        if (id === null || id === undefined)
        {
            setLogged(false);
        }
        else if (id !== null || id !== undefined)
        {
            setLogged(true);
        }
        
    });

    let element = logged ?  <a href="/.auth/logout" className="nav-links-mobile" onClick={() => {handleLogged(); resetLocalStorage()}}>
                                <button className='btn' onClick={closeMobileMenu} />
                                Log Out
                                <i className="fas fa-sign-out-alt"/>
                            </a> :
                            <a href="/.auth/login/aad" className="nav-links-mobile" onClick={() => handleLogged()}>
                                <button className='btn' onClick={closeMobileMenu} />                              
                                Log In
                                <i className="fas fa-sign-in-alt"/>
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
                {logged ? <LogOutButton /> : <LogInButton /> }
            </nav>



        </>
    )
}

export default Navbar;