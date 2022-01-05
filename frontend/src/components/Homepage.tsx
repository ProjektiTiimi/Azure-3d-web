import React, { useState, useEffect } from 'react';
import '../App.css'


const Homepage: React.FunctionComponent = () => {
    const [message, setMessage] = useState('');

    const checkLogin = async () => {
        try {
            const user = await fetch('/.auth/me', {
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
            });
            const userInfo = await user.json();
            console.log("UserInfo is: " + userInfo.clientPrincipal.userId);
            let id = userInfo.clientPrincipal.userId;
            let userDetails = userInfo.clientPrincipal.userDetails;
            localStorage.setItem('userID', id);
            setMessage("Tervetuloa, " + userDetails);
            getUserData(id);
        } catch (error) {
            console.log("checkLogin failed, error:" + error);
        }
    }

    const getUserData = async (id:string) => {
        try {
            const billerInfo = await fetch(`/api/${id}/getBiller?`,{
                method : 'GET',
                headers: { 'Content-type': 'application/json'}
              })
              .then(function(response){
                  if(response.ok){
                    const log = response.json();
                    console.log(log);
                  }
                  else if(response.status == 500){
                    console.log("Setting container for new user");
                    setContainer(id);
                  }
              })
              console.log(billerInfo);

        } catch (error) {
            console.log("getUserData failed, error: " +error);
        }
    }

    const setContainer = async (id:string) => {
        try {
            const userdata = await fetch(`/api/${id}/setContainer?`,{
                method : 'POST',
                headers: { 'Content-type': 'application/json'}
              });
        } catch (error) {
            
        }
    }


    React.useEffect(()=> {
        checkLogin();
    }, []);


    return(
        <div className='homepage'>
            <h1>Tervetuloa laskut sovellukseen</h1>
            <h3>
                {message}
            </h3>
            <a href="/.auth/login/aad">Login</a>
        </div>
    )
};
export default Homepage;
