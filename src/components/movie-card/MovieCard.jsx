import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { global } from "../../_config/global";
import { useNavigate } from "react-router-dom";
import { CardActionArea } from "@mui/material";
import VoteAverage from "../vote-average/VoteAverage";

export default function MovieCard({ movie }) {
  // hooks
  const navigate = useNavigate();

  // handle
  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const image = movie.poster_path
    ? `${global.BASE_IMAGES_URL}/w185${movie.poster_path}`
    : "/images/w185/pelicula.jpg";

  return (
    <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia component='img' image={image} alt='green iguana' />
        <CardContent sx={{ position: "relative", pt: 3 }}>
          <VoteAverage
            value={movie.vote_average * 10}
            style={{ position: "absolute", top: "-25px" }}
          />
          <Typography
            gutterBottom
            variant='h5'
            fontSize={18}
            fontWeight={600}
            component='div'>
            {movie.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {movie.release_date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
