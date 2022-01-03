import * as React from 'react';
import '../App.css'
import {CurrentUser} from './User'

const Homepage: React.FunctionComponent = () => {
    return(
        <div className='homepage'>
            <h1>Tervetuloa laskut sovellukseen {CurrentUser}</h1>
            <h3>
            </h3>
            <a href="/.auth/login/aad?post_login_redirect_url=https://wonderful-sea-0b9eeac03.azurestaticapps.net/">Login</a>
        </div>
    )
};
export default Homepage;
