import React from 'react';
import Box from '@mui/material/Box';
import banner from '../../../images/banner.jpg'
const styleBanner = {
    width: '100%',
    height: 600,
    backgroundImage:`url(${banner})`,
    backgroundSize:'100%',
    backgroundRepeat:'no-repeat',
  };
const Banner = () => {
    return (
        <Box
      sx={styleBanner}
    />
    );
};

export default Banner;