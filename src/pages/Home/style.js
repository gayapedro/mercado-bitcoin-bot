import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    minHeight: '100vh',
    display: 'grid',
    placeContent: 'center',
    gap: 15,
  },
  input: {
    color: 'red',

  },
  button: {
    margin: 'auto',
    width: '95%',
    backgroundColor: '#333333',
    '&:hover': {
      backgroundColor: '#999999',
    },
  },
}));

export default useStyles;
