import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { GetToken } from '../../pages/Token'
const AllBlogs = () =>{
    const [blogs, setBlogs] = useState([])
    const fetchBlogData = async () =>{
        try{
            const response =  await fetch('http://localhost:8000/blog/getAll-blogs/',
        {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                Authorization: 'Bearer '+ GetToken()
            }
        })
            const data = await response.json()
            setBlogs(data)
        }
        catch(error){
            console.error("error: ", error.data)
        }
    }
    useEffect(()=>{
        fetchBlogData()
    },[])
    
    return (
        <div className="container mx-auto py-8 ">
            <h1 className="text-3xl font-semibold mb-8 text-center">Latest Blogs</h1>
            {blogs.map((blog) => (
            <div key={blog.id} className="w-3/4 mx-auto mb-8 border border-orange-300">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                    <p className="text-gray-600 mb-4">{blog.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                        <img
                        src={`https://randomuser.me/api/portraits/men/${blog.id}.jpg`}
                        alt="User"
                        className="w-8 h-8 rounded-full mr-2"
                        />
                        <span>{blog.author}</span>
                    </div>
                    <span>{'Last modified: '+blog.datetime}</span>
                    </div>
                </div>
                <div className="p-4 bg-gray-100 border-t border-gray-200">
                    <Link
                    to={`/edit-blog/${blog.id}`}
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                    >
                    Read More
                    </Link>
                </div>
                </div>
            </div>
            ))}
        </div>
        );
}

export default AllBlogs