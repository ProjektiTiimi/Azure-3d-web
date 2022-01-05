import React, {useState, useEffect} from 'react';
import './LogOutButton.css';


export function LogOutButton() {
    const [state,setState] = useState(false);

    useEffect(() => {
        let userId = localStorage.getItem('userID');
        if (userId === null || userId === undefined){
            console.log("userId is: " + userId);
            setState(true);
        }
        else if (userId != null || userId !== undefined){
            console.log("userId is: " + userId);
            setState(false);
        }
    },[]);
    
    let element = state ?   <a href="/.auth/login/aad">
                                <button className='btn'>
                                    Log in
                                    <i className="fas fa-sign-in-alt"/>           
                                </button>        
                            </a> :
                            <a href="/.auth/logout">
                            <button className='btn'>
                                Log out
                                <i className="fas fa-sign-out-alt"/>           
                            </button>        
                            </a>;
    const handleClick = () =>{
        setState(!state);
    };
    return (        
        <div className="App">
        <button className="btn" onClick={handleClick} />
        {element}
        </div>
    );
}