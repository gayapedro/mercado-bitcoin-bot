import {
  TextField,
  Button,
  Snackbar,
  Backdrop,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Alert } from '@material-ui/lab';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import qs from 'querystring';
import crypto from 'crypto';
import useStyles from './style';
import useAuth from '../../hooks/useAuth';
import './style.css';

function Home() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { logar, id } = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [error]);

  const onSubmit = async (data) => {
    setError(false);
    setErrorMessage('');
    setLoading(true);
    const now = String(Math.floor(new Date().getTime() / 1000));
    const host = 'https://www.mercadobitcoin.net';
    const endpoint = '/tapi/v3/';
    const query = { tapi_method: 'get_account_info', tapi_nonce: now };

    try {
      const queryString = qs.stringify(query);
      const h = crypto.createHmac('sha512', data.secret)
        .update(`${endpoint}?${queryString}`)
        .digest('hex');

      const config = {
        headers: {
          'TAPI-ID': data.id,
          'TAPI-MAC': h,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const response = await axios.post(`${host}${endpoint}`, queryString, config);
      if (response.data.status_code !== 100) {
        setError(true);
        setErrorMessage('Client ID e Secret não conferem.');
        setLoading(false);
        return response;
      }
      logar(data.id, data.secret, () => history.push('/'));
    } catch {
      setError(true);
      setErrorMessage('Client ID e Secret não conferem.');
    }
    setLoading(false);
    return '';
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <p className={classes.title}>Gb</p>
          {id && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={classes.menuButton}
          >
            <ExitToAppIcon />
          </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <form
        className={classes.rootForm}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img src="/logo.png" alt="Gaya bot" />
        <TextField
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
            },
          }}
          id="standard-basic"
          label="Client ID"
          {...register('id')}
        />
        <TextField
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
            },
          }}
          id="standard-basic"
          label="Secret ID"
          {...register('secret')}
        />
        <Button className={classes.button} type="submit" variant="contained" color="primary">
          Entrar
        </Button>
        <Snackbar className={classes.alert} open={error} autoHideDuration={6000}>
          <Alert severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </form>
      <Backdrop className="backdrop" open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Home;
