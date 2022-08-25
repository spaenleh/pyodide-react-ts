import React, { useContext } from 'react';

import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Box, IconButton, useTheme } from '@mui/material';

import ColorModeContext from '../contexts/ColorModeContext';

export const ColorModeSwitcher = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
};
