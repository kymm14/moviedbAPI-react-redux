import React, { useEffect } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./VoteAverage.scss";

export default function VoteAverage({ value, style, size }) {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= value ? value : prevProgress + 10
      );
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, []);

  // functions
  const colorFromValue = (value) => {
    if (value >= 70) return "success";
    if (value >= 50) return "warning";
    return "error";
  };

  const color = colorFromValue(value);

  return (
    <div className='VoteAverage' style={style}>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant='determinate'
          value={progress}
          color={color}
          size={size}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography
            variant='caption'
            component='div'
            color='white'
            fontSize={13}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}>
            {`${Math.round(progress)}%`}
            <Typography
              variant='caption'
              component='span'
              fontSize={13}></Typography>
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
