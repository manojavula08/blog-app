import React, { useEffect, useState } from 'react'
import { Form, Link, redirect, useParams } from 'react-router-dom'
import { DeleteBlog, GetBlogData } from './ApiUpdates'

function WriteBlog() {
    const { id } = useParams();
    const [data, setData] = useState({ title: '', description: '', datetime: '' });

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const blogData = await GetBlogData({ id });
                setData(blogData);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className='bg-gray-100 box-border  border-red-400 flex justify-center items-center h-screen'>
            <div className='bg-white shadow-md border border-orange-300 rounded px-8 pr-8 pt-6 mb-4 w-3/4 h-[80%]'>
            <div className='flex justify-between items-center my-5'>
            <h1>Edit Blog</h1>
            <button className='text-orange-300 hover:text-orange-600' onClick={()=>{
                const res = DeleteBlog({id})
                }}><Link to={'/'}>Delete</Link></button>

            </div>
                <Form method='post'>
                    <div className='mb-3'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>Title</label>
                        <input className="shadow appearance-none border border-orange-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-[50px]" id="title" type="text" name='title' defaultValue={data.title}  required/>
                    </div>
                    <div className='mb-3'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>Description</label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-60 border-orange-300 " cols='15' rows="5" id="description" type="text" name='description' defaultValue={data.description} required/>
                    </div>
                    <p>{data.datetime}</p>
                    <div className=''>
                        <button type='submit' className="bg-orange-300 hover:bg-orange-500 text-white text-lg font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-20">
                        Post
                        </button>
                    </div>
                </Form>
            </div>

        </div>
    )
}

export default WriteBlog
