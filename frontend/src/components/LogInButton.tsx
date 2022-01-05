import React, {useState, useEffect} from 'react';
import './LogOutButton.css';


export function LogInButton() {
    return (        
        <div className="App">
        <a href="/.auth/login/aad">
            <button className='btn'>
                Log in
                <i className="fas fa-sign-in-alt"/>           
            </button>        
        </a>
        </div>
    );
}