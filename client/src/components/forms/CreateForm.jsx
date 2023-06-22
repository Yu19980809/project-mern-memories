import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../../actions/posts';
import { createFormStyles } from '../../styles';

const CreateForm = ( { currentPostId, setCurrentPostId } ) => {
  const post = useSelector( state => ( !currentPostId ? null : state.posts.posts.find( item => item._id === currentPostId ) ) );
  const user = JSON.parse( localStorage.getItem( 'profile' ) );
  const classes = createFormStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialForm = {
    title: '',
    message: '',
    selectedFile: '',
    tags: []
  };

  const [ form, setForm ] = useState( initialForm );

  useEffect( () => {
    if ( post ) setForm( post );
  }, [ post ] );

  const handleChange= e => setForm( { ...form, [ e.target.name ]: e.target.value } );

  const clearForm = () => {
    setForm( initialForm );
    setCurrentPostId( null );
  };

  const handleSubmit = e => {
    e.preventDefault();

    !currentPostId ? dispatch( createPost( { ...form, name: user?.result?.name }, navigate ) ) : dispatch( updatePost( currentPostId, { ...form, name: user?.result?.name } ) )
  
    clearForm();
  };

  return (
    <Paper className={ classes.paper }>
      <form
        autoComplete="off"
        noValidate
        className={ `${ classes.root } ${ classes.form }` }
        onSubmit={ handleSubmit }
      >
        <Typography variant="h6">
          { !currentPostId ? 'Create a memory' : 'Edit a memory' }
        </Typography>

        <TextField
          variant="outlined"
          label="Title"
          name="title"
          value={ form.title }
          fullWidth
          onChange={ handleChange }
        />
        <TextField
          variant="outlined"
          label="Message"
          name="message"
          value={ form.message }
          fullWidth
          onChange={ handleChange }
        />
        <TextField
          variant="outlined"
          label="Tags (coma separated)"
          name="tags"
          value={ form.tags }
          fullWidth
          onChange={ e => setForm( { ...form, tags: e.target.value.split( ',' ) } ) }
        />
        <div className={ classes.fileInput }>
          <FileBase
            type="file"
            multiple={ false }
            onDone={ ( { base64 } ) => setForm( { ...form, selectedFile: base64 } ) }
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          size="large"
          color="primary"
          fullWidth
          className={ classes.buttonSubmit }
        >
          Submit
        </Button>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          fullWidth
          onClick={ clearForm }
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default CreateForm;
