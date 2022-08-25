import { FC, useEffect, useState } from 'react';

import { PlayArrow } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';

import ReplStatus, { Status } from '../ReplStatus';

type Props = {
  setExecute: (v: boolean) => void;
};

const ReplToolbar: FC<Props> = ({ setExecute }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <ReplStatus status={Status.LOADING} />
      <ReplStatus status={Status.ERROR} />
      <ReplStatus status={Status.READY} />
      <LoadingButton
        variant="outlined"
        loading={isLoading}
        startIcon={<PlayArrow />}
        onClick={() => setExecute(true)}
      >
        Run
      </LoadingButton>
    </Stack>
  );
};
export default ReplToolbar;
