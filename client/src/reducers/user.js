import { LOGOUT, AUTH } from '../constants';

export default ( state = { authData: null }, action ) => {
  switch ( action.type ) {
    case LOGOUT:
      localStorage.removeItem( 'profile' );
      return { ...state, authData: null };
    case AUTH:
      localStorage.setItem( 'profile', JSON.stringify( { ...action?.payload } ) );
      return { ...state, authData: action?.payload };
    default:
      return state;
  }
}
