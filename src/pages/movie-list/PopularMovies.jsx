import React, { useEffect, useState } from "react";

import movieService from "../../_services/movieService";
import MovieCard from "../../components/movie-card/MovieCard";
import { Box, Container, Pagination, Typography } from "@mui/material";
import PageLoader from "../../components/loaders/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { savePopular } from "../../features/pagination/paginationSlice";
// import Pagination from "../../components/pagination/Pagination";

export default function PopularMovies() {
  const initialMovies = [];
  // hooks
  const [movies, setMovies] = useState(initialMovies);
  const [isLoading, setisLoading] = useState(true);
  const page = useSelector((state) => state.pagination.popular);
  const dispatch = useDispatch();

  useEffect(() => {
    getPopular();
  }, [page]);

  // handles
  const handleChange = (event, value) => {
    dispatch(savePopular(value));
  };

  // functions
  const getPopular = async () => {
    setisLoading(true);
    try {
      const data = await movieService.getPopular(page);
      setMovies(data.results);
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
            Popular Movies
          </Typography>
          <Box sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "center" }}>
            <Pagination page={page} count={500} onChange={handleChange} />
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
