import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMovieData, fetchAllMovie } from "../../features/counter/movieCaller";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from "@mui/material";
import movieApi from "../../apiCaller/movieApi";
import MovieDetail from "./MovieDetail";

function NetflixMovie() {
  const dispatch = useDispatch()
  const [open,setOpen] = useState(false)
  const [data,setData] = useState(null)
  useEffect(()=>{
    const fetch = async ()=>{
      const response = await movieApi.get(`http://www.omdbapi.com/?apikey=15ae9fea&s=netflix`)
      .catch((err)=>{
        console.log(err)
      })
      console.log(response)
      dispatch(fetchAllMovie(response.data))
    }
    fetch()
  },[])
  const movieData = useSelector(allMovieData);
  console.log(movieData)
  const handleOpen = (data) =>{
    console.log(data)
    setData(data)
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
  }
  return (
    <div class='container p-5 d-flex justify-content-between  align-items-center flex-wrap'>
        {movieData ? movieData.Search.map(({ Poster, Title, Type, Year,imdbID }) => (
          <Box sx={{
            padding:'5px',
                  margin:'auto'
          }}>
            <Card sx={{ width:320, marginTop:'10px',backgroundColor:'lightgray' }} >
              <CardMedia
                component="img"
                alt="green iguana"
                // height="350"
                src={Poster}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {Title}
                </Typography>
                <p class="h3 text-start">
                  Type - <span class="small">{Type}</span>
                </p>
                <p class="h3 text-start">
                  Release Date - <span class="small">{Year}</span>
                </p>
              </CardContent>
              <CardActions>
                <Button size="large" onClick={()=>handleOpen(imdbID)}>Read More</Button>
              </CardActions>
            </Card>
          </Box>
        )):(
          <Box
                  sx={{
                    p: 3,
                    width: "100%",
                    height: "100%",
                  }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CircularProgress size={64} disableShrink thickness={3} />
                </Box>
        )}
        <MovieDetail open={open} handleClose={handleClose} data={data}/>
     </div>
  );
}

export default NetflixMovie;
