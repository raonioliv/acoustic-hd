import axios from 'axios'
console.log(process.env);
export default axios.create({ 
    baseURL: process.env.VUE_APP_SERVER_BASE_URL || 'http://localhost:8081/', 
})
