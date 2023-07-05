import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieService from "../../_services/movieService";
import { global } from "../../_config/global";
import { Box, Chip, Container, Typography, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import getYear from "date-fns/getYear";
import format from "date-fns/format";
import "./MovieDetail.scss";
import VoteAverage from "../../components/vote-average/VoteAverage";
import PageLoader from "../../components/loaders/PageLoader";

export default function MovieDetail() {
  // hooks
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getMovie();
  }, []);

  // functions
  const getMovie = async () => {
    try {
      const data = await movieService.getById(id);
      setMovie(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const renderGenders = (genres) => {
    return (
      <Stack direction='row' spacing={2}>
        {genres.map((g) => (
          <Chip
            key={g.id}
            label={g.name}
            variant='outlined'
            size='small'
            sx={{ color: "white", opacity: 0.8 }}
          />
        ))}
      </Stack>
    );
  };

  return (
    <>
      {!isLoading ? (
        <div className='MovieDetail'>
          <section className='backdrop-container'>
            <div
              className='backdrop-background'
              style={{
                backgroundImage: `url(${global.BASE_IMAGES_URL}/original${movie.backdrop_path})`,
              }}></div>
            <Container sx={{ pt: 5, pb: 5 }}>
              <Grid container spacing={2}>
                <Grid item sm={4}>
                  <Box>
                    <img
                      className='poster-path'
                      src={
                        movie.poster_path
                          ? `${global.BASE_IMAGES_URL}/w342${movie.poster_path}`
                          : "/images/w342/pelicula342.jpg"
                      }
                      alt={movie.title}
                    />
                  </Box>
                </Grid>
                <Grid item sm={8}>
                  <Box>
                    <Typography variant='h1' fontSize={40} fontWeight={600}>
                      {movie.title}
                      <Typography
                        variant='caption'
                        fontSize={40}
                        sx={{ ml: 1, opacity: 0.7 }}>
                        ({getYear(new Date(movie.release_date))})
                      </Typography>
                    </Typography>
                    <Stack direction='row' spacing={2}>
                      <Chip
                        sx={{
                          border: "none",
                          color: "white",
                          fontSize: "1.05em",
                        }}
                        icon={
                          <CalendarMonthIcon
                            sx={{ "&&": { color: "white" } }}
                          />
                        }
                        color='primary' // para que funcione la propiedad de && (important)
                        label={format(
                          new Date(movie.release_date),
                          "dd/LL/yyyy"
                        )}
                        variant='outlined'
                      />
                      <Chip
                        sx={{
                          border: "none",
                          color: "white",
                          fontSize: "1.05em",
                        }}
                        icon={
                          <ScheduleIcon sx={{ "&&": { color: "white" } }} />
                        }
                        color='primary' // para que funcione la propiedad de && (important)
                        label={movie.runtime + " min"}
                        variant='outlined'
                      />
                    </Stack>
                  </Box>
                  <Box sx={{ mt: 3 }}>{renderGenders(movie.genres)}</Box>
                  <Box sx={{ mt: 3 }}>
                    <VoteAverage value={movie.vote_average * 10} size={70} />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Typography variant='h3' fontSize={24} gutterBottom>
                      Overview
                    </Typography>
                    <Typography paragraph gutterBottom>
                      {movie.overview}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </section>
        </div>
      ) : (
        <>
          <PageLoader />
        </>
      )}
    </>
  );
}
