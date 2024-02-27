import React, { useState, useEffect } from "react";
import api from "./api";

const Blog = () => {
    const [blog, setBlog] = useState([]);
    const [blogID, setBolgId] = useState(null)
    const [hoveredRow, setHoveredRow] = useState(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        datetime: ''
    });

    const fetchBlogData = async () => {
        try {
            const response = await api.get('/getAll_blog/');
            setBlog(response.data);
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    }

    const onChangeEvent = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            datetime: new Date().toDateString()
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await api.post('/blog/', formData);
            await fetchBlogData();
            setFormData({
                title: '',
                description: ''
            });
            
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const UpdateOnSubmit = async (e) =>{
        e.preventDefault()
        try{
            await api.put('/edit_blog/'+ blogID, formData)
            await fetchBlogData()
            setFormData({
                title: '',
                description: ''
                
            });
            setBolgId(null)
            setIsUpdating(false)
        }catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    

    const handleMouseEnter = (inputID) =>{
        setHoveredRow(inputID)
        console.log(inputID)
    }

    const handleMouseLeave = () => {
        setHoveredRow(null)
    }

    const handleUpdateId = async (inputID) =>{

        console.log(inputID)
        const response = await api.get('/blog/'+inputID)
        const blogData = response.data
        setFormData({
            title: blogData.title,
            description: blogData.description,
            datetime: new Date().toDateString()
        })
        setBolgId(inputID)
        setIsUpdating(true)
    }

    const handleDeleteId = async (blogId) => {
        try {
            await api.delete('/delete/'+ blogId);
            console.log("deleted")
            await fetchBlogData();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
}

// Rest of your component remains the same


    useEffect(() => {
        fetchBlogData();
    }, []); // Empty dependency array to fetch data only once when component mounts

    return (
        <>
        <form onSubmit={isUpdating ? UpdateOnSubmit : onSubmit}>
            
            <div className="mb-3 mt-3">
                <label className="form-label" htmlFor="InputTitle">Title</label>
                <input type="text" className="form-control" name="title" placeholder="Title" onChange={onChangeEvent} value={formData.title}/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="InputDescription">Description</label>
                <input type="text" className="form-control" name="description" placeholder="Description" onChange={onChangeEvent} value={formData.description} />
            </div>
            
            <button type="submit" className="btn btn-primary">{isUpdating? "Update" : "Submit"}</button>
        </form>
        <table className="table table-hover mt-5 ">
        <thead>
        <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Datetime</th>
        </tr>
        </thead>
        <tbody className="table-group-divider">
        {
            blog.map((blog) =>(
                <tr key={blog.id} onMouseEnter={() => handleMouseEnter(blog.id)} onMouseLeave={handleMouseLeave}>
                    <td>{blog.id}</td>
                    <td>{blog.title}</td>
                    <td>{blog.description}</td>
                    <td>{blog.datetime}</td>
                    <td style={{width:'200px'}}>
                        {
                            hoveredRow === blog.id &&(
                                <div>
                                    <button type="button" className="btn btn-outline-info mx-5" 
                                    onClick={()=>handleUpdateId(blog.id)}>Update</button>
                                    <button type="button" className="btn btn-outline-danger" 
                                    onClick={() =>handleDeleteId(blog.id)}>Delete</button>
                                </div>
                            )
                        }
                    </td>
                </tr>
            ))
        }
        <tr></tr>
        </tbody>
        </table>
        </>
    );
}

export default Blog;
