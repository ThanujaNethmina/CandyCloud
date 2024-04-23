import { Autocomplete } from "@mui/material";
import { StyledTextField } from "../../../assets/theme/theme";

const CustomAutocomplete = ({
  freeSolo,
  value,
  onChange,
  onFocus,
  label,
  helperText,
  required,
  disabled,
  readonly,
  error,
  placeholder,
  onInputChange,
  options,
  ...rest
}) => {
  return (
    <Autocomplete
      {...rest}
      freeSolo={freeSolo}
      options={options}
      value={value}
      onChange={onChange}
      readOnly={readonly}
      disabled={disabled}
      getOptionLabel={(option) => option.label || ''}
      isOptionEqualToValue={(option, val) => option.value === val.value}
      onInputChange={onInputChange}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          required={required}
          onFocus={onFocus}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          size="small"
          inputProps={{ ...params.inputProps }}
          InputLabelProps={{ ...params.InputLabelProps }}
        />
      )}
    />
  );
};

export default CustomAutocomplete;
