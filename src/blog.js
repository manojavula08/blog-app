import React, {useState, useEffect} from "react";
import api from "./api";

const blog = () =>{
    [blog, setBlog] = useState([])
    [foamData, setFoamData] = useState({
        title: '',
        description: '',
        datetime: ''
    })

    const fetchBlogData = async () =>{
        const response = await api.get('/blog/');
        setBlog(response.data)
    }
}

export default blog;