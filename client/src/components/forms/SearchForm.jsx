import { useState } from 'react';
import { AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchPosts } from '../../actions/posts';
import { searchFormStyles } from '../../styles';

const SearchForm = () => {
  const classes = searchFormStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ search, setSearch ] = useState( '' );
  const [ tags, setTags ] = useState( [] );

  const handleKeyPress = e => {
    if ( e.keyCode === 13 ) handleSearch();
  };

  const handleAddChip = tag => setTags( [ ...tags, tag ] );

  const handleDeleteChip = tag => setTags( tags.filter( item => item !== tag ) );

  const handleSearch = () => {
    if ( !search && !tags ) return navigate( '/' );

    dispatch( searchPosts( { search, tags: tags.join( ',' ) } ) );
    navigate( `/posts/search?searchQuery=${ search || 'none' }&tags=${ tags.join( ',' ) }` );
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      className={ classes.appBarSearch }
    >
      <TextField
        variant="outlined"
        label="Search Memories"
        value={ search }
        fullWidth
        onChange={ e => setSearch( e.target.value ) }
        onKeyDown={ handleKeyPress }
      />

      <ChipInput
        variant="outlined"
        label="Tags"
        value={ tags }
        style={ { margin: "10px 0" } }
        onAdd={ chip => handleAddChip( chip ) }
        onDelete={ chip => handleDeleteChip( chip ) }
      />

      <Button
        variant="contained"
        color="primary"
        onClick={ handleSearch }
      >
        Search
      </Button>
    </AppBar>
  )
}

export default SearchForm;