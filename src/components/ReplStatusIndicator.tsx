import { FC } from 'react';

import { Paper } from '@mui/material';

import { PyodideStatus } from '@graasp/pyodide-worker';

type Props = {
  status: PyodideStatus;
};

const ReplStatusIndicator: FC<Props> = ({ status }) => {
  let style;
  switch (status) {
    case PyodideStatus.READY:
      style = {
        borderColor: 'success.main',
        color: 'success.main',
      };
      break;
    case PyodideStatus.LOADING_PYODIDE:
    case PyodideStatus.LOADING_MODULE:
    case PyodideStatus.INSTALLING:
    case PyodideStatus.RUNNING:
      style = {
        borderColor: 'warning.main',
        color: 'warning.main',
      };
      break;
    case PyodideStatus.ERROR:
    case PyodideStatus.TIMEOUT:
      style = {
        borderColor: 'error.main',
        color: 'error.main',
      };
      break;
    case PyodideStatus.WAIT_INPUT:
      style = {
        borderColor: 'info.main',
        color: 'info.main',
      };
  }

  return (
    <Paper
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        ...style,
      }}
      variant="outlined"
    >
      {status}
    </Paper>
  );
};

export default ReplStatusIndicator;
