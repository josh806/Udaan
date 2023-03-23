import React from 'react';
import { TextField } from '@mui/material';

type Props = {
  name: string;
  label: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  helperText?: string;
};

function Field({
  name,
  label,
  value,
  handleChange,
  isRequired = false,
  isDisabled = false,
  isError = false,
  helperText,
}: Props) {
  return (
    <TextField
      className={`_form__field _form__field--${name}`}
      label={label}
      variant="outlined"
      name={name}
      value={value}
      onChange={handleChange}
      required={isRequired}
      disabled={isDisabled}
      helperText={helperText}
      error={isError}
    />
  );
}

export default Field;
