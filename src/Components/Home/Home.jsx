import React, { useEffect, useState } from 'react'
import './Home.scss';
import axios from 'axios'
import { Link } from 'react-router-dom';
import {BiPlay} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai';

const apiKey = 'f306ce463d4ce43db46fe47f7fe0c8e2';
const url = 'https://api.themoviedb.org/3/';
const imgUrl = `https://image.tmdb.org/t/p/original`;
const upcoming = 'upcoming';
const nowPlaying = 'now_playing';
const popular = 'popular';
const topRated = `top_rated`;

const Card = ({img})=>(
  <img className="card" src={img} alt='cover' />
)

const Row = ({
  title,
  arr = [
  ]
})=>{
  return (
    <div className="row">
      <h2>{title}</h2>
        <div>
        {
          arr.map((item,index)=>(
            <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
        
          ))
        }
        </div>
      </div>
  )
}

const Home = () => {

  const [upcomingMovies,setUpcomingMovies] = useState([]);
  const [nowPlayingMovies,setNowPlayingMovies] = useState([]);
  const [popularMovies,setPopularMovies] = useState([]);
  const [topRatedMovies,setTopRatedMovies] = useState([]);
  const [genre,setGenre] = useState([]);

  useEffect(()=>{

    const fetchUpcoming = async() =>{
      const {data} = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}&page=5`)
      setUpcomingMovies(data.results);
    };  
    const fetchNowPlaying = async() =>{
      const {data} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
      setNowPlayingMovies(data.results);
    };  
    const fetchPopular = async() =>{
      const {data} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
      setPopularMovies(data.results);
    };  
    const fetchTopRated = async() =>{
      const {data} = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
      setTopRatedMovies(data.results);
    };  
    const getAllGenre = async() =>{
      const {data} = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
      setGenre(data.genres);
      console.log(data.genres);
    };  
    getAllGenre();

    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    fetchUpcoming();
  },[])

  return (
    <section className="home">
       <div className="banner" style={{
        backgroundImage: popularMovies[0]? `url(${imgUrl}/${popularMovies[0].poster_path})`:`rgb(22, 21, 21)`,
       }}>
    {
      popularMovies[0] && (
          <h1>{popularMovies[0].original_title}</h1>
      )
    }
    {
      popularMovies[0] && (
        <p>{popularMovies[0].overview}</p>
      )
    }
    <div>
         <button> <BiPlay/> Play</button>
         <button>My List <AiOutlinePlus/></button>
    </div>
       </div>

       <Row title={'Upcoming'} arr={upcomingMovies}/>
       <Row title={'Now playing '} arr={nowPlayingMovies}/>
       <Row title={'Popular '} arr={popularMovies}/>
       <Row title={'Top Rated'} arr={topRatedMovies}/>
       
    <div className = 'genreBox'>
      {genre.map((item)=>(
        <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
      ))}
    </div>

    </section>
  )
}

export default Home

// https://api.themoviedb.org/3/movie/550?api_key=f306ce463d4ce43db46fe47f7fe0c8e2
// https://api.themoviedb.org/3/movie/popular?api_key=f306ce463d4ce43db46fe47f7fe0c8e2
// https://api.themoviedb.org/3/movie/upcoming?api_key=f306ce463d4ce43db46fe47f7fe0c8e2
// https://api.themoviedb.org/3/genre/movie/list?api_key=f306ce463d4ce43db46fe47f7fe0c8e2