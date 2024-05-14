import { redirect, json } from "react-router-dom";
import Login from '../components/LoginPage/Login'

const AuthPage = () =>{
    return <Login />
}

export default AuthPage

export async function action ({request}) {
    const data = await request.formData();
    const email = data.get('username')
    const password = data.get('password')
    
        const response = await fetch("http://localhost:8000/auth/token", {
            method: 'POST',
            headers:{
                'Content-Type': "application/x-www-form-urlencoded"
            },
            body: JSON.stringify(`grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`),
        })

        if (response.status === 422 || response.status === 401) {
            return response;
        }
        
        if (!response.ok) {
            throw json({ message: 'Could not authenticate user.' }, { status: 500 });
        }

        const resultData = await response.json()
        const token = resultData.access_token
        localStorage.setItem('TOKEN', token)

        return redirect('/')
}