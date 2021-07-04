import {
  AppBar, Toolbar, IconButton, Box,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import useAuth from '../../hooks/useAuth';
import useStyles from './style';
import Balance from '../../components/Balance';
import Time from '../../components/Time';

function Painel() {
  const { id, deslogar } = useAuth();
  const classes = useStyles();
  return (
    <>
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <p className={classes.title}>Gb</p>
          <Box>
            {id && (
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
            )}
            {id && (
            <IconButton
              color="inherit"
              onClick={() => deslogar()}
            >
              <ExitToAppIcon />
            </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Balance />
      <Time />
    </>
  );
}

export default Painel;
