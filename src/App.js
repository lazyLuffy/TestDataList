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
import DataTable from "./components/TestProject";



function App() {
  return (
    <div className="App">
      <Router>
       <div className="container-fluid bg-danger">
          <h1 className="text-center py-2 text-light fw-bold fs-2">
          DataTable Test
          </h1>
       </div>
          <Routes>
            <Route path="/" exact element={<DataTable/>}/>
          
          </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
