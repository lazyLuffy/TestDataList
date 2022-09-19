import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import movieApi from "../../apiCaller/movieApi";
import {fetchSingle, singleData } from "../../features/counter/movieCaller";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function MovieDetail({open,handleClose,data}) {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetch = async ()=>{
            const response = await movieApi.get(`http://www.omdbapi.com/?i=${data?data:'tt3896198'}&apikey=15ae9fea`)
            .catch((err)=>{
                console.log(err)
            })
            console.log(response)
            dispatch(fetchSingle(response.data))
        }
        fetch()
    },[data])
    const each = useSelector(singleData)
  return (
    <div>
        
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           {each ? (
            <>
            <div class='row '>
                <div class='col-6'>
                    <img src={each.Poster} class='img-fluid'/>
                </div>
                <div class='col-6 '>
                    <div class='container text-start'>
                    <p class='h5 text-start '>{each.Title}</p>
                    <p class='blockquote text-start'>{each.Plot}
                    </p>
                    <p class='h4 text-start'>
                        IMDB Rating :  <span>{each.imdbRating}</span>
                    </p>
                    <p class='h4 text-start'>
                        Genre:
                        <span>{each.Genre}</span></p>
                     </div>
                </div>
            </div>
            </>
           ):(
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
        </Box>
      </Modal>
    </div>
  );
}

export default MovieDetail;
