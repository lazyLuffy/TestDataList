import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allMovieData,
  fetchAllMovie,
  searchData,
} from "../../features/counter/movieCaller";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from "@mui/material";
import movieApi from "../../apiCaller/movieApi";
import MovieDetail from "./MovieDetail";

function MovieList() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const search = useSelector(searchData);
  const [page, setPage] = useState(1);
  const [len, setLen] = useState(null);
  const movieData = useSelector(allMovieData);
  useEffect(() => {
    const fetch = async () => {
      const response = await movieApi
        .get(
          `http://www.omdbapi.com/?apikey=15ae9fea&s=${
            search ? search : "harry"
          }&page=${page + ""}`
        )
        .catch((err) => {
          console.log(err);
        });
      dispatch(fetchAllMovie(response.data));
      setLen(response.data.Search);
    };
    fetch();
  }, [search, page]);

  const handleOpen = (data) => {
    setData(data);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div class="container d-flex justify-content-between  align-items-center flex-wrap">
      {movieData && movieData.Response !== "False" ? (
        <>
          {Boolean(movieData?.Search.length > 0) && (
            <>
              {movieData.Search.map(({ Poster, Title, Type, Year, imdbID }) => (
                <Box
                  sx={{
                    padding: "5px",
                    margin: "auto",
                  }}
                  key={imdbID}
                >
                  <Card
                    sx={{
                      width: 320,
                      marginTop: "10px",
                      backgroundColor: "lightgray",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="400"
                      src={Poster !== "N/A" ? Poster : "images/banner.jpg"}
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
                      <Button size="large" onClick={() => handleOpen(imdbID)}>
                        Read More
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </>
          )}
        </>
      ) : (
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
      <MovieDetail open={open} handleClose={handleClose} data={data} />
    </div>
  );
}

export default MovieList;
