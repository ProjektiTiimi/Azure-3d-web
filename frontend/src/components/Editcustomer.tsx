import React, { useState } from 'react';
import Customer from '../models/customer';
import configData from "../config/configData.json"

//url pitää olla muotoa http://localhost:3000/editcustomer/?id=61827ee5878942efcc8fb40b
const Editcustomer = () => {
    const querystring = window.location.search;
    const urlParams = new URLSearchParams(querystring);
    const id = urlParams.get('id');
    let currentUser = localStorage.getItem('currentUser');

    //http://localhost:7071/api/Billers/get-customer
    //https://3d-web-api.azurewebsites.net/api/Billers/getcustomer?
    const getData = async () => {
        console.log(id)
        let userID = localStorage.getItem("userID");
        const response = await fetch(`/api/${userID}/getcustomer?`, {
            method:'POST',
            headers:{ 'Content-type': 'application/json' },
            body: JSON.stringify({
                "_id": id
            })
        });
        const data = await response.json()
        console.log(data)
        setInput(data)
    }

    React.useEffect(()=> {
        getData();
    }, []);

    const [input, setInput] = useState<Customer>({
        YTunnus: "",
        asiakkaanNimi: "",
        Postitusosoite: "",
        Postinumero: "",
        Toimipaikka: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    //https://3d-web-api.azurewebsites.net/api/Billers/editcustomer?
    //http://localhost:7071/api/Billers/edit-customer?
    const editcustomer = (): void =>{
        let userID = localStorage.getItem("userID");
        fetch(`/api/${userID}/editcustomer?`, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                "_id": id,
                YTunnus: input.YTunnus,
                asiakkaanNimi: input.asiakkaanNimi,
                Postitusosoite: input.Postitusosoite,
                Postinumero: input.Postinumero,
                Toimipaikka: input.Toimipaikka
            })
        })
        .then(function(data){
            console.log("Request succeeded with response ", data)
            document.getElementById("savedText")!.hidden = false
        })
        .catch(function(error){
            console.log("Request failed ", error)
            document.getElementById("savedText")!.textContent = "Virhe"
            document.getElementById("savedText")!.hidden = false
        })
    }

    //https://3d-web-api.azurewebsites.net/api/Billers/deleteCustomer?
    //http://localhost:7071/api/Billers/deleteCustomer?
    const deleteCustomer = (): void => {
        let userID = localStorage.getItem("userID");
        fetch(`/api/${userID}/deleteCustomer?`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                "_id": id
            })
        })
        .then(function(data){
            console.log("Request succeeded with response ", data)
            document.getElementById("savedText")!.textContent = "Poistettu"
            document.getElementById("savedText")!.hidden = false
        })
        .catch(function(error){
            console.log("Request failed ", error)
            document.getElementById("savedText")!.textContent = "Virhe"
            document.getElementById("savedText")!.hidden = false
        })
    }

    return(
        <div className="AddCustomer">
            <h3>Muokkaa asiakasta</h3>
                <input 
                    type="text"
                    placeholder="Y-Tunnus"
                    className="AddCustomer-input"
                    onChange={handleChange}
                    name="YTunnus"
                    value={input.YTunnus}
                />
                <input 
                    type="text"
                    placeholder="Yrityksen nimi"
                    className="AddCustomer-input"
                    onChange={handleChange}
                    name="asiakkaanNimi"
                    value={input.asiakkaanNimi}
                />
                <input 
                    type="text"
                    placeholder="Osoite"
                    className="AddCustomer-input"
                    onChange={handleChange}
                    name="Postitusosoite"
                    value={input.Postitusosoite}
                />
                <input 
                    type="text"
                    placeholder="Postinumero"
                    className="AddCustomer-input"
                    onChange={handleChange}
                    name="Postinumero"
                    value={input.Postinumero}
                />
                <input 
                    type="string"
                    placeholder="Kaupunki"
                    className="AddCustomer-input"
                    onChange={handleChange}
                    name="Toimipaikka"
                    value={input.Toimipaikka}
                />            
            <button 
                className = "AddCustomer-btn"
                onClick={editcustomer}>
                Tallenna
            </button>
            <button 
                className = "AddCustomer-btn"
                onClick={deleteCustomer}>
                Poista
            </button>
            <h4 id="savedText" hidden>Tallennettu</h4>
        </div>
    )
}

export default Editcustomer