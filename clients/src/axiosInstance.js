import axios from "axios"

const instance = axios.create ({
    baseURL: `https://kanvan-project.herokuapp.com`
    // baseURL: "http://localhost:5555"
})

export default instance