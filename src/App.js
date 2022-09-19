import React, { useEffect } from "react";

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import MovieList from './components/MoveList/MovieList'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import MovieDetail from './components/MovieDetail/MovieDetail'
// import { useSelector } from "react-redux";
// import { allMovieData } from "./features/counter/movieCaller";
import movieApi from "./apiCaller/movieApi";
import {key} from './apiCaller/movieApiKey'
import { useDispatch } from "react-redux";
import { fetchAllMovie } from "./features/counter/movieCaller";
import IndiaMovie from "./components/MoveList/IndiaMovie";
import NetflixMovie from "./components/MoveList/NetflixMovie";



function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
          <Routes>
            <Route path="/" exact element={<MovieList/>}/>
            <Route path="/movie-detail" element={<MovieDetail/>}/>
            <Route path="/india" element={<IndiaMovie/>}/>
            <Route path="/netflix" element={<NetflixMovie/>}/>
          </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
