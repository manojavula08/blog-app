import React, { useEffect, useState } from 'react'
import api from '../../api'
const AllBlogs = () =>{
    const [blog, setBlog] = useState([])
    const fetchBlogData = async () =>{
        try{
            const response =  await api.get('/getAll_blog/')
            setBlog(response.data)
        }
        catch(error){
            console.error("error: ", error.data)
        }
    }
    useEffect(()=>{
        fetchBlogData()
    },[])
    
    return(
        <div className='mx-auto'>
            {
                blog.map((blog)=>(
                    <div className='mx-auto' style={{width:'500px', margin: '20px', border: 'solid', padding:'15px'}} key={blog.id}>
                        
                        <h1>{blog.title}</h1>
                        
                        <p style={{color:'red'}}>{blog.description}</p>
                        <p>{blog.datetime}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default AllBlogs