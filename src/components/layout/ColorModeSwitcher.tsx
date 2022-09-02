import React, { useContext } from 'react';

import { Brightness4, Brightness7 } from '@mui/icons-material';
import {
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';

import ColorModeContext from '../../contexts/ColorModeContext';

export const ColorModeSwitcher = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="button">{theme.palette.mode}</Typography>
      <Tooltip
        title={`Change to ${
          theme.palette.mode === 'dark' ? 'light' : 'dark'
        } mode`}
      >
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
