import {
  IconDefinition,
  IconLookup,
  findIconDefinition,
  library,
} from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FC } from 'react';

import { PlayArrow } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { ReplStatus } from '../constants/constants';
import ReplStatusIndicator from './ReplStatusIndicator';

library.add(fas);
const broomLookup: IconLookup = { prefix: 'fas', iconName: 'broom' };
const broomIconDefinition: IconDefinition = findIconDefinition(broomLookup);

type Props = {
  onRunCode: () => void;
  onClearOutput: () => void;
  status: ReplStatus;
};

const ReplToolbar: FC<Props> = ({ onRunCode, onClearOutput, status }) => {
  const isLoading = [
    ReplStatus.LOADING,
    ReplStatus.INSTALLING,
    ReplStatus.WAIT_INPUT,
    ReplStatus.ERROR,
  ].includes(status);

  return (
    <Grid container alignItems="stretch" justifyContent="space-between">
      <Grid xs={3} display="flex" justifyContent="flex-start">
        <ReplStatusIndicator status={status} />
      </Grid>
      <Grid>
        <LoadingButton
          variant="outlined"
          loading={isLoading}
          startIcon={<PlayArrow />}
          onClick={onRunCode}
        >
          Run
        </LoadingButton>
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
