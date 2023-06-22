import * as api from '../api';
import { AUTH } from '../constants';

const signIn = ( userData, navigate ) => async ( dispatch ) => {
  try {
    const { data } = await api.signIn( userData );
    dispatch( { type: AUTH, payload: data } );
    navigate( '/' );
  } catch (error) {
    console.log( error );
  }
};

const signUp = ( userData, navigate ) => async ( dispatch ) => {
  try {
    const { data } = await api.signUp( userData );
    dispatch( { type: AUTH, payload: data } );
    navigate( '/' );
  } catch (error) {
    console.log( error );
  }
};

export {
  signIn,
  signUp
};
