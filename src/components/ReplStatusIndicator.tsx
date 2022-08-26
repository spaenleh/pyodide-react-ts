import { FC } from 'react';

import { Paper } from '@mui/material';

import { ReplStatus } from '../constants/constants';

type Props = {
  status: ReplStatus;
};

const ReplStatusIndicator: FC<Props> = ({ status }) => {
  let style;
  switch (status) {
    case ReplStatus.READY:
      style = {
        borderColor: 'success.main',
        color: 'success.main',
      };
      break;
    case ReplStatus.LOADING_PYODIDE:
    case ReplStatus.LOADING_MODULE:
    case ReplStatus.INSTALLING:
    case ReplStatus.RUNNING:
      style = {
        borderColor: 'warning.main',
        color: 'warning.main',
      };
      break;
    case ReplStatus.ERROR:
    case ReplStatus.TIMEOUT:
      style = {
        borderColor: 'error.main',
        color: 'error.main',
      };
      break;
    case ReplStatus.WAIT_INPUT:
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
