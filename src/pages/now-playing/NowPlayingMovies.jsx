import React, { useEffect, useState } from "react";

import movieService from "../../_services/movieService";
import MovieCard from "../../components/movie-card/MovieCard";
import { Box, Container, Pagination, Typography } from "@mui/material";
import PageLoader from "../../components/loaders/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { saveNowPlaying } from "../../features/pagination/paginationSlice";

export default function NowPlayingMovies() {
  const initialMovies = [];
  // hooks
  const [movies, setMovies] = useState(initialMovies);
  const [isLoading, setisLoading] = useState(true);
  const [count, setCount] = useState(0);
  const page = useSelector((state) => state.pagination.nowPlaying);
  const dispatch = useDispatch();

  useEffect(() => {
    getNowPlaying();
  }, [page]);

  // handles
  const handleChange = (event, value) => {
    dispatch(saveNowPlaying(value));
  };

  // functions
  const getNowPlaying = async () => {
    setisLoading(true);
    try {
      const data = await movieService.getNowPlaying(page);
      setMovies(data.results);
      setCount(data.total_pages);
      console.log(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      {!isLoading ? (
        <Container sx={{ pt: 5, pb: 5 }}>
          <Typography variant='h1' fontSize={30} align='center' gutterBottom>
            Now Playings Movies
          </Typography>
          <Box sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "center" }}>
            <Pagination page={page} count={85} onChange={handleChange} />
          </Box>
          <Box className='movie-list-wrapper'>
            {movies.map((mov) => (
              <MovieCard key={mov.id} movie={mov} />
            ))}
          </Box>
        </Container>
      ) : (
        <>
          <PageLoader />
        </>
      )}
    </>
  );
}
