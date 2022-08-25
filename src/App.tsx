import { Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import logo from './logo.svg';

const App = () => {
  return (
    <Stack justifyItems={'center'} divider={<Divider />}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Typography variant="h1">Helo World</Typography>
    </Stack>
  );
};

export default App;
