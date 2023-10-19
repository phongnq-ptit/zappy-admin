import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const FormInput = ({ name, label, control, rules, defaultValue, ...args }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...args}
          label={label}
          variant="outlined"
          value={value}
          onChange={onChange}
          error={!!error}
          fullWidth
          helperText={error ? error.message : null}
        />
      )}
    />
  );
};

export default FormInput;
