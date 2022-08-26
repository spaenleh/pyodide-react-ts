import { FC } from 'react';

import { Stack, styled } from '@mui/material';

import ImagePreview from './ImagePreview';

const StyledContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  overflowX: 'scroll',
}));

type Props = {
  figures: string[];
};

const ShowFigures: FC<Props> = ({ figures }) => {
  const figureWall = figures.map((fSrc, idx) => (
    <ImagePreview key={`fig.${idx}`} alt={`fig.${idx}`} imageSrc={fSrc} />
  ));

  return (
    <StyledContainer direction="row" spacing={2}>
      {figureWall}
    </StyledContainer>
  );
};

export default ShowFigures;
