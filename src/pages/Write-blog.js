import { json, redirect } from "react-router-dom"
import WriteBlog from "../components/WriteBlog/WriteBlog"
import {GetToken} from "./Token"

// keep at one place make easier
const BlogWrite = ()=>{
    return <WriteBlog />
}
export default BlogWrite


export async function action ({request}) {

    const data = await request.formData()
    const writeData ={
        title: data.get('title'),
        description: data.get('description'),
        datetime: new Date().toLocaleString()
    }

    const response = await fetch('http://localhost:8000/blog/write-blog/',{
        
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization: 'Bearer '+ GetToken()
        },
        body: JSON.stringify(writeData)
    })

    if(!response.ok){
        throw json({ message: 'Could not authenticate user.' }, { status: 500 });
    }

    return redirect('/')  
}