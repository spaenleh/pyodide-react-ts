import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';
import { useRef } from 'react';

import { styled } from '@mui/material';

import { DEFAULT_INPUT_VALUE } from '../constants/constants';

const StyledTextArea = styled('textarea')(({ theme }) => ({
  fontFamily: 'monospace',
  width: '100%',
  resize: 'none',
  height: 'auto',
  borderWidth: '0px',
  color: 'inherit',
  backgroundColor: 'inherit',
  '&:focus-visible': {
    outline: 'none',
  },
}));

type Props = {
  prompt: string;
  readOnly: boolean;
  onValidate: (input: string) => void;
  onCancel: () => void;
};

const InputArea: FC<Props> = ({ prompt, readOnly, onValidate, onCancel }) => {
  const [input, setInput] = useState(DEFAULT_INPUT_VALUE);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setInput(DEFAULT_INPUT_VALUE);
    if (inputRef?.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;

      inputRef.current.focus();
      inputRef.current.setSelectionRange(prompt.length, prompt.length);
    }
  }, [prompt, readOnly]);

  // scroll in output window to bottom
  useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [prompt]);

  const onChangeInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = event.target.value.slice(prompt.length);
    setInput(newInput);
  };

  const onKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      setInput(DEFAULT_INPUT_VALUE);
      onValidate(input);
      event.preventDefault();
    } else if (event.ctrlKey && event.key === 'c') {
      setInput(DEFAULT_INPUT_VALUE);
      onCancel();
      event.preventDefault();
    }
  };

  return (
    <div ref={containerRef} style={{ overflowY: 'scroll', width: '100%' }}>
      <StyledTextArea
        readOnly={readOnly}
        ref={inputRef}
        onChange={onChangeInput}
        onKeyDown={onKeyPress}
        value={`${prompt}${input}`}
      ></StyledTextArea>
    </div>
  );
};

export default InputArea;
