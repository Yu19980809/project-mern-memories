import { useState, useEffect } from 'react';
import { Avatar, Button, Container, Paper, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../actions/user';
import { AUTH } from '../../constants';
import InputField from './InputField';
import Icon from './Icon';
import { authStyles } from '../../styles';

const Auth = () => {
  const classes = authStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const [ isSignUp, setIsSignUp ] = useState( false );
  const [ showPassword, setShowPassword ] = useState( false );
  const [ form, setForm ] = useState( initialForm );

  useEffect( () => {
    const initClient = () => gapi.client.init( { clientId: import.meta.env.VITE_GOOGLE_ID, scope: '' } );
    gapi.load( 'client:auth2', initClient );
  }, [] );

  const handleChange = e => setForm( { ...form, [ e.target.name ]: e.target.value } );

  const handleShowPassword = () => setShowPassword( prev => !prev );

  const googleSuccess = res => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch( { type: AUTH, payload: { result, token } } );
      navigate( '/' );
    } catch (error) {
      console.log( error );
    }
  };

  const googleFailure = err => {
    alert( 'Google Sign In was unsuccessful. Try again later.' );
    console.log( 'googleFailure', err );
  };

  const switchMode = () => {
    setIsSignUp( !isSignUp );
    setShowPassword( false );
  };

  const handleSubmit = e => {
    e.preventDefault();

    isSignUp ? dispatch( signUp( form, navigate ) ) : dispatch( signIn( form, navigate ) )
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={ 3 } className={ classes.paper }>
        <Avatar className={ classes.avatar }>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="h5">
          { isSignUp ? 'Sign Up' : 'Sign In' }
        </Typography>

        <form className={ classes.form } onSubmit={ handleSubmit }>
          <Grid container spacing={ 2 }>
            { isSignUp && (
              <>
                <InputField
                  label="First Name"
                  name="firstName"
                  half
                  autoFocus
                  handleChange={ handleChange }
                />

                <InputField
                  label="Last Name"
                  name="lastName"
                  half
                  handleChange={ handleChange }
                />
              </>
            ) }

            <InputField
              type="email"
              label="Email"
              name="email"
              handleChange={ handleChange }
            />

            <InputField
              type={ showPassword ? 'text' : 'password' }
              label="Password"
              name="password"
              handleChange={ handleChange }
              handleShowPassword={ handleShowPassword }
            />

            { isSignUp && (
              <InputField
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                handleChange={ handleChange }
              />
            ) }
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={ classes.submit }
          >
            { isSignUp ? 'Sign Up' : 'Sign In' }
          </Button>

          <GoogleLogin
            clientId={ import.meta.env.VITE_GOOGLE_ID }
            render={ renderProps => (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={ <Icon /> }
                className={ classes.googleButton }
                onClick={ renderProps.onClick }
                disabled={ renderProps.disabled }
              >
                Sign In with Google
              </Button>
            ) }
            onSuccess={ googleSuccess }
            onFailure={ googleFailure }
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={ switchMode }>
                { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth