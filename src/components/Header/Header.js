import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TextField, Typography } from "@mui/material";
import { fontSize } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSearch, searchData } from "../../features/counter/movieCaller";

function Header() {
  const dispatch = useDispatch()
  const[search,setSearch] = useState('')
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  console.log(value);
  const handleSubmit =(event)=>{
    event.preventDefault()
    dispatch(fetchSearch(search))
    setSearch('')
  }
  return (
    <div>
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand display-1  " href="javascript:void(0)">
            Movie Blast
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mynavbar">
            <ul class="navbar-nav me-auto">
              <Tabs value={value} onChange={handleChange} centered>
                <Tab
                  label="Movie List"
                  sx={{ color: "white", fontSize: "large" }}
                  component={Link}
                  to="/"
                />
                <Tab
                  label="Top India"
                  sx={{ color: "white", fontSize: "large" }}
                  component={Link}
                  to="/india"
                />
                <Tab
                  label="TOP NETFLIX"
                  sx={{ color: "white", fontSize: "large" }}
                  component={Link}
                  to="/netflix"
                />
              </Tabs>
            </ul>
            <form class="d-flex" onSubmit={handleSubmit}>
              <input
                class="form-control me-2"
                type="text"
                name="search"
                value={search}
                size='small'
                placeholder="Search platform"
                onChange={(event)=>{setSearch(event.target.value)}}
              />
              <button class="btn btn-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
