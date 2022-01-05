import React, { useState, useEffect } from 'react';
import User from '../models/user';

const EditUser = () => {

  const [input, setInput] = useState<User>({
    YTunnus: "",
    username: "",
    email: "",
    iban: ""
  })

  
  React.useEffect(()=> {
    getUser();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
  }

  const getUser = async () => {
    try {
      let id = localStorage.getItem('userID');
      const userdata = await fetch(`/api/${id}/getBiller?`,{
        method : 'GET',
        headers: { 'Content-type': 'application/json'},
      });
      const data = await userdata.json()
      console.log(data)
      setInput(data)
    } catch (error) {
      console.log("getUser failed, error: " + error);
    }
  }

  const editUser = async () => {
    try {
        let id = localStorage.getItem('userID');
        const userdata = await fetch(`/api/${id}/postUser?`,{
          method : 'POST',
          headers: { 'Content-type': 'application/json'},
          body : JSON.stringify({
            YTunnus: input.YTunnus,
            username: input.username,
            email: input.email,
            iban: input.iban
        })
        });
        console.log(userdata);
        document.getElementById("savedText")!.hidden = false
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
            name="username"
            value={input.username}
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
          <button onClick={editUser}>Tallenna</button>
          <h4 id="savedText" hidden>Tallennettu</h4>
        </div>
    )
}

export default EditUser