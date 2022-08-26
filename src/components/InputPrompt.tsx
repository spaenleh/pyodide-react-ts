import { FC, useState } from 'react';

import { Send } from '@mui/icons-material';
import { IconButton, Stack, TextField } from '@mui/material';

type Props = {
  prompt: string;
  onValidate: (userAnswer: string) => void;
  onCancel: () => void;
  isWaitingForInput: boolean;
};

const InputPrompt: FC<Props> = ({
  prompt,
  onValidate,
  onCancel,
  isWaitingForInput,
}) => {
  const [value, setValue] = useState('');

  const onChangeValue = ({ target }: { target: { value: string } }) => {
    setValue(target.value);
  };

  if (!isWaitingForInput) {
    return null;
  }
  return (
    <Stack direction="row" alignItems="center">
      {prompt}
      <TextField
        variant="filled"
        hidden={!isWaitingForInput}
        value={value}
        fullWidth
        onChange={onChangeValue}
      />
      <IconButton onClick={() => onValidate(value)}>
        <Send />
      </IconButton>
    </Stack>
  );
};

export default InputPrompt;
