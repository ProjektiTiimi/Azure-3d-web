import React, {useState, useEffect} from 'react';
import './LogOutButton.css';


export function LogOutButton() {
    const resetLocalStorage = () =>{
        localStorage.clear();
    };
    return (        
        <div className="App">
        <a href="/.auth/logout">
            <button className='btn' onClick={resetLocalStorage}>
                Log out
                <i className="fas fa-sign-out-alt"/>           
            </button>        
        </a>
        </div>
    );
}