import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: 'black',
    fontFamily: 'Poppins',
    fontWeight: 200,
    fontSize: 30,
    height: 65,
  },
  title: {
    margin: 0,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default useStyles;
