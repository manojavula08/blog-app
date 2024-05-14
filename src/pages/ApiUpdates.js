import {GetToken} from "./Token";
import { json, redirect } from "react-router-dom";


export async function action({request, id}){
    const data = await request.formData()
    const date = new Date();
    const formattedDate = date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    const idP = await id
    const formData = {
        title: data.get('title'),
        description: data.get('description'),
        datetime: formattedDate,
        id: 4
    }
    console.log(formData)

    const response = await fetch(`http://localhost:8000/blog/edit-blog/${id}`,
        {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+GetToken()
            },
            body: JSON.stringify(formData)
        }
    )
    if(!response.ok){
        throw json({
            message:"error"
        })
    }
    const responseData = await response.json()
    if(responseData.ok){
    }
    return redirect('/')
}

export async function GetBlogData({id}){

    const response = await fetch(`http://localhost:8000/blog/write-blog/${id}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            Authorization: 'Bearer '+ GetToken()
        },
    })
    if(!response.ok){
        throw json({
            message: 'Item not found',
            status: 505
        })
    }
    const data = await response.json()
    return data
}

export async function DeleteBlog({id}){
    const response = await fetch(`http://localhost:8000/blog/delete/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            Authorization: 'Bearer '+ GetToken()
        },
    })
    if(!response.ok){
        throw json({
            message: 'Item not found',
            status: 505
        })
    }
    const data = await response.json()
    return true
}

