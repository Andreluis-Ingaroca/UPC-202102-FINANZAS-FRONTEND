import axios from 'axios'

export default axios.create({
    baseURL: 'https://finanzas20211121131207.azurewebsites.net/api',
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
});