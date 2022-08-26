import {
  IconDefinition,
  IconLookup,
  findIconDefinition,
  library,
} from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FC } from 'react';

import { PlayArrow, Square } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { ReplStatus } from '../constants/constants';
import ReplStatusIndicator from './ReplStatusIndicator';

library.add(fas);
const broomLookup: IconLookup = { prefix: 'fas', iconName: 'broom' };
const broomIconDefinition: IconDefinition = findIconDefinition(broomLookup);

type Props = {
  onRunCode: () => void;
  onStopCode: () => void;
  onClearOutput: () => void;
  status: ReplStatus;
};

const ReplToolbar: FC<Props> = ({
  onRunCode,
  onStopCode,
  onClearOutput,
  status,
}) => {
  const isLoading = [
    ReplStatus.LOADING_MODULE,
    ReplStatus.LOADING_PYODIDE,
    ReplStatus.INSTALLING,
    ReplStatus.ERROR,
  ].includes(status);
  const isRunning = [ReplStatus.RUNNING, ReplStatus.WAIT_INPUT].includes(
    status,
  );

  return (
    <Grid container alignItems="stretch" justifyContent="space-between">
      <Grid xs={3} display="flex" justifyContent="flex-start">
        <ReplStatusIndicator status={status} />
      </Grid>
      <Grid>
        <Stack direction="row" spacing={1}>
          <LoadingButton
            variant="outlined"
            loading={isLoading}
            disabled={isRunning}
            startIcon={<PlayArrow />}
            onClick={onRunCode}
          >
            Run
          </LoadingButton>
          <Button
            variant="outlined"
            color="error"
            disabled={!isRunning}
            startIcon={<Square />}
            onClick={onStopCode}
          >
            Stop
          </Button>
        </Stack>
      </Grid>
      <Grid xs={3} display="flex" justifyContent="flex-end">
        <Button
          variant="outlined"
          color="error"
          startIcon={
            <FontAwesomeIcon icon={broomIconDefinition} color="error" />
          }
          onClick={onClearOutput}
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  );
};
export default ReplToolbar;
