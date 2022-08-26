import { FC, useState } from 'react';
import React from 'react';

import { Fullscreen } from '@mui/icons-material';
import { Dialog, DialogContent, IconButton, Zoom, styled } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

const StyledContainer = styled('div')({
  position: 'relative',
  '&:hover button': {
    display: 'flex',
  },
});

const StyledImagePreview = styled('img')(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(1),
  objectFit: 'cover',
}));

const StyledImageFullView = styled('img')(({ theme }) => ({
  height: '100%',
  width: '100%',
  borderRadius: theme.spacing(1),
  objectFit: 'fill',
}));

const OpenFullScreenButton = styled(IconButton)({
  display: 'none',
  position: 'absolute',
  right: '0px',
  bottom: '0px',
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Zoom ref={ref} {...props} />;
});

type Props = {
  alt: string;
  imageSrc: string;
};

const ImagePreview: FC<Props> = ({ imageSrc, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledContainer>
      <StyledImagePreview src={imageSrc} alt={alt}></StyledImagePreview>
      <OpenFullScreenButton color="primary" onClick={() => setIsOpen(true)}>
        <Fullscreen />
      </OpenFullScreenButton>
      <Dialog
        TransitionComponent={Transition}
        maxWidth="xl"
        sx={{ overflow: 'hidden' }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DialogContent>
          <StyledImageFullView src={imageSrc} alt={alt}></StyledImageFullView>
        </DialogContent>
      </Dialog>
    </StyledContainer>
  );
};

export default ImagePreview;
