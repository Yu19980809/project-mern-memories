import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const InputField = ( { type, label, name, half, autoFocus, handleChange, handleShowPassword } ) => (
  <Grid item xs={ 12 } sm={ half ? 6 : 12 }>
    <TextField
      variant="outlined"
      type={ type }
      label={ label }
      name={ name }
      autoFocus={ autoFocus }
      required
      fullWidth
      onChange={ handleChange }
      InputProps={ name === 'password' ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={ handleShowPassword }>
              { type === 'password' ? <Visibility /> : <VisibilityOff /> }
            </IconButton>
          </InputAdornment>
        )
      } : null }
    />
  </Grid>
);

export default InputField;
