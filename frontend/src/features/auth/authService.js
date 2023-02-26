import axios from 'axios'

//register user
const register = async(userData) => {
    const response = await axios.post(process.env.REACT_APP_API_URL + "/users", userData)
    
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    
    return response.data 
}
//login user
const login = async(userData) => {
    const response = await axios.post(process.env.REACT_APP_API_URL + '/users/login', userData)
    
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    
    return response.data 
}

// logout the user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService
