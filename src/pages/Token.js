import { redirect } from "react-router-dom"


export function GetToken(){
    const token = localStorage.getItem('TOKEN')

    if(!token){
        return null
    }
    return token
}


export function checkAuthToken(){
    const token = GetToken()

    if(!token){
        return redirect('/auth')
    }
    return null
}