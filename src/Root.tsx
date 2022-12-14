import React, { useMemo, useState } from 'react';

import {
  CssBaseline,
  Divider,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { Box } from '@mui/material';

import App from './App';
import { ColorModeSwitcher } from './components/layout/ColorModeSwitcher';
import Footer from './components/layout/Footer';
import ColorModeContext from './contexts/ColorModeContext';

export default function Root() {
  // get user preference from browser
  const userPrefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  const [mode, setMode] = useState<'light' | 'dark'>(
    userPrefersDarkMode ? 'dark' : 'light',
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* Use CSSBaseline to reset the CSS and make sure everything is nice and elegant */}
        {/* Use enableColorScheme to enable dark or light element by default */}
        <CssBaseline enableColorScheme />
        <Box
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            p: 2,
          }}
        >
          <Stack
            direction={'column'}
            justifyItems="center"
            divider={<Divider />}
            spacing={1}
          >
            <Stack direction={'row'} justifyContent="space-between">
              <Typography variant="h4">Code REPL</Typography>
              <ColorModeSwitcher />
            </Stack>
            <App />
          </Stack>
        </Box>
        <Footer />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
