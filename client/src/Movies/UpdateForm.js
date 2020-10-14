import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";


export const UpdateForm = ({setMovieList, movieList}) => {
    const history = useHistory()
    const { id } = useParams()
    const [newMovie, setNewMovie] = useState({
        title: "",
        director: "",
        metascore: "",
    })

    const changeHandler = (e) => {
        setNewMovie({
            ...newMovie, [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
            // console.log("res", res)
            setNewMovie(res.data)
        })
        .catch((err) => {
            console.log("error with update", err)
        })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log("handleSubmit", newMovie)
        axios.put(`http://localhost:5000/api/movies/${id}`, newMovie)
        .then((res) => {
            console.log("put res", res.data)
            setMovieList([...movieList, res.data])
            history.push("/")

        })
        .catch((err) => {
            console.log("error with put res", err)
        })
    }

    return(
        <>
        <h1>Test update form</h1>
        <form onSubmit={handleSubmit}>
            <input
            name="title"
            id="title"
            placeholder="title"
            value={newMovie.title}
            onChange={changeHandler}
            ></input>
            <input
            name="director"
            id="director"
            placeholder="director"
            value={newMovie.director}
            onChange={changeHandler}
            ></input>
            <input
            name="metascore"
            id="metascore"
            placeholder="metascore"
            value={newMovie.metascore}
            onChange={changeHandler}
            ></input>
            <button>Save Changes</button>
        </form>
        
        </>
    )
}