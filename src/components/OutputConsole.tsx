import { FC, useRef } from 'react';
import { useEffect } from 'react';

import { styled } from '@mui/material';

const StyledTextArea = styled('textarea')(({ theme }) => ({
  width: '100%',
  boxSizing: 'border-box',
  resize: 'none',
  borderWidth: '0px',
  color: 'inherit',
  backgroundColor: 'inherit',
  '&:focus-visible': {
    outline: 'none',
  },
}));

type Props = {
  output: string;
};

const OutputConsole: FC<Props> = ({ output }) => {
  const outputRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (outputRef?.current) {
      outputRef.current.style.height = `${outputRef.current.scrollHeight}px`;
      console.log(outputRef.current.style.height);
    }
  }, [output]);

  if (!output) {
    return null;
  }
  return (
    <StyledTextArea
      ref={outputRef}
      readOnly
      value={output.trim()}
    ></StyledTextArea>
  );
};

export default OutputConsole;
