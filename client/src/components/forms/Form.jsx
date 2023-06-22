import CreateForm from './CreateForm';
import SearchForm from './SearchForm';

const Form = ( { currentPostId, setCurrentPostId } ) => {
  return (
    <div>
      <SearchForm />
      <CreateForm currentPostId={ currentPostId } setCurrentPostId={ setCurrentPostId } />
    </div>
  )
}

export default Form