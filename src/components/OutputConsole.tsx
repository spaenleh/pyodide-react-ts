import { FC } from 'react';

import { styled } from '@mui/material';

const Frame = styled('pre')(({ theme }) => ({
  margin: '0px',
  padding: theme.spacing(1),
  overflow: 'scroll',
}));

type Props = {
  output: string;
};

const OutputConsole: FC<Props> = ({ output }) => {
  return <Frame>{output}</Frame>;
};

export default OutputConsole;
