import { FC } from 'react';

import { Paper } from '@mui/material';

export enum Status {
  READY = 'Ready',
  LOADING = 'Loading',
  ERROR = 'Error',
}

type Props = {
  status: Status;
};

const ReplStatus: FC<Props> = ({ status }) => {
  let style;
  switch (status) {
    case Status.READY:
      style = {
        borderColor: 'success.main',
        color: 'success.main',
      };
      break;
    case Status.LOADING:
      style = {
        borderColor: 'warning.main',
        color: 'warning.main',
      };
      break;
    case Status.ERROR:
      style = {
        borderColor: 'error.main',
        color: 'error.main',
      };
      break;
  }

  return (
    <Paper
      sx={{
        px: 1,
        py: 0.5,
        ...style,
      }}
      variant="outlined"
    >
      {status}
    </Paper>
  );
};

export default ReplStatus;
