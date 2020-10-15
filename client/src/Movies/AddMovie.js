import axios from "axios";
import React, { useState } from "react";
import {useHistory} from "react-router-dom";

const initialItem = {
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: [],
}

export const AddMovie = ({setMovieList, movieList}) => {
    const history = useHistory()
   const [movie, setMovie] = useState(initialItem)

   const handleChange = (e) =>{
       e.persist()
       setMovie({
           ...movie, [e.target.name]: e.target.name === "stars" ? [e.target.value.split(',')] : e.target.value
       })
   }

   const handleSubmit = (e) => {
       e.preventDefault()
    //    console.log("submit", movie)
        axios.post("http://localhost:5000/api/movies", movie)
        .then(res => {
            // console.log("res from post AddMovie", res.data)
            setMovieList(res.data)
            setMovie(initialItem)
            history.push("/")
        })
        .catch(err => {
            console.log("error with post AddMovie", err)
        })
    
   }
   

    return(
        <>
        <h1>Add New Movie</h1>
        <form onSubmit={handleSubmit}>
            <input
            name="title"
            id="title"
            placeholder="title"
            onChange={handleChange}
            value={movie.title}
            ></input>
             <input
            name="director"
            id="director"
            placeholder="director"
            onChange={handleChange}
            value={movie.director}
            ></input>
             <input
            name="metascore"
            id="metascore"
            type="number"
            placeholder="metascore"
            onChange={handleChange}
            value={movie.metascore}
            ></input>
             <input
            name="stars"
            id="stars"
            placeholder="stars"
            onChange={handleChange}
            value={movie.stars}
            ></input>
            <button>Add New Movie</button>
        </form>


        </>
    )
}
