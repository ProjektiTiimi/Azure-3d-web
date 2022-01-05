import React, { useState, useEffect } from 'react';
import Customer from '../models/customer';

const UserLogin = () => {
  const [input, setInput] = useState({
    YTunnus: "",
    nimi: "",
    email: "",
    iban: ""
})

const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  setInput({
      ...input,
      [e.target.name]: e.target.value
  })
}


  const getData = async () => {
    try {
        const user = await fetch('/.auth/me', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        });
        const userInfo = await user.json();
        console.log("UserInfo is: " + userInfo.clientPrincipal.userId);
        let id = userInfo.clientPrincipal.userId;
        localStorage.setItem('userID', id);
        //console.log("trying to send data: " + input.YTunnus + " " + input.nimi);
        const userdata = await fetch(`/api/${id}/postUser?`,{
          method : 'POST',
          headers: { 'Content-type': 'application/json'},
          body : JSON.stringify({
            YTunnus: input.YTunnus,
            username: input.nimi,
            email: input.email,
            iban: input.iban
        })
        });
        console.log(userdata);
    } catch (error) {
        console.log("GetData failed, error:" + error);
    }
}
    return(
      <div className="AddCustomer">
          <h1>Laskuttajan tiedot</h1>
          <h3>Y-tunnus</h3>
          <input 
            type="text"
            onChange={handleChange}
            className="AddCustomer-input"
            name="YTunnus"
            value={input.YTunnus}
          />
          <h3>Nimi</h3>
          <input 
            type="text"
            onChange={handleChange}
            className="AddCustomer-input"
            name="nimi"
            value={input.nimi}
          />
          <h3>Sähköposti</h3>
          <input 
            type="text"
            onChange={handleChange}
            className="AddCustomer-input"
            name="email"
            value={input.email}
          />
          <h3>Tilinumero</h3>
          <input 
            type="text"
            onChange={handleChange}
            className="AddCustomer-input"
            name="iban"
            value={input.iban}
          />
          <button onClick={getData}>Tallenna</button>
        </div>
    )
}

export default UserLogin