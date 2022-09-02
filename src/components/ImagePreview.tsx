import { FC, useState } from 'react';
import React from 'react';

import { Dialog, DialogContent, Zoom, styled } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

const StyledImagePreview = styled('img')(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(1),
  border: '1px solid lightgray',
  objectFit: 'cover',
  cursor: 'pointer',
}));

const StyledImageFullView = styled('img')(({ theme }) => ({
  maxHeight: 'calc(100vh - 128px)',
  maxWidth: 'calc(100vw - 128px)',
  borderRadius: theme.spacing(1),
  border: '1px solid lightgray',
  objectFit: 'scale-down',
}));

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
    <>
      <StyledImagePreview
        onClick={() => setIsOpen(true)}
        src={imageSrc}
        alt={alt}
      ></StyledImagePreview>
      <Dialog
        TransitionComponent={Transition}
        maxWidth={false}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DialogContent>
          <StyledImageFullView src={imageSrc} alt={alt}></StyledImageFullView>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImagePreview;
