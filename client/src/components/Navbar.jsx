import { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { memoriesLogo, memoriesText } from '../assets';
import { LOGOUT } from '../constants';
import { navbarStyles } from '../styles';

const Navbar = () => {
  const classes = navbarStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [ user, setUser ] = useState( JSON.parse( localStorage.getItem( 'profile' ) ) );

  useEffect( () => {
    const token = user?.token;

    if ( token ) {
      const decodedToken = decode( token );
      if ( decodedToken.exp * 1000 < new Date().getTime() ) logout();
    }

    setUser( JSON.parse( localStorage.getItem( 'profile' ) )  );
  }, [ location ] );

  const logout = () => {
    dispatch( { type: LOGOUT } );
    navigate( '/auth' );
    setUser( null );
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      className={ classes.appBar }
    >
      <Link to="/" className={ classes.brandContainer }>
        <img
          src={ memoriesText }
          alt="textIcon"
          height="45px"
        />
        <img
          src={ memoriesLogo }
          alt="icon"
          height="40px"
          className={ classes.image }
        />
      </Link>

      <Toolbar className={ classes.toolbar }>
        { user?.result ? (
          <div className={ classes.profile }>
            <Avatar
              src={ user?.result.imageUrl }
              alt={ user?.result.name }
              className={ classes.purple }
            >
              { user?.result.name.charAt( 0 ) }
            </Avatar>

            <Typography
              variant="h6"
              className={ classes.userName }
            >
              { user?.result.name }
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              className={ classes.logout }
              onClick={ logout }
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={ Link }
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        ) }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
