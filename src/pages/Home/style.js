import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rootForm: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    minHeight: '100vh',
    display: 'grid',
    placeContent: 'center',
    gap: 15,
  },
  button: {
    margin: 'auto',
    width: '95%',
    backgroundColor: '#333333',
    '&:hover': {
      backgroundColor: '#999999',
    },
  },
  cssLabel: {
    color: '#333333 !important',
  },
  alert: {
    width: '100%',
    '& > * + *': {
      margin: theme.spacing(2),
    },
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

export default useStyles;
