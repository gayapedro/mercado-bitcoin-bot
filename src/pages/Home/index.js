import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import qs from 'querystring';
import crypto from 'crypto';
import useStyles from './style';
import useAuth from '../../hooks/useAuth';

function Home() {
  const { logar } = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const now = String(Math.floor(new Date().getTime() / 1000));
    const host = 'https://www.mercadobitcoin.net';
    const endpoint = '/tapi/v3/';
    const query = { tapi_method: 'get_account_info', tapi_nonce: now };
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
    try {
      const response = await axios.post(`${host}${endpoint}`, queryString, config);
      if (response.data.status_code !== 100) {
        console.log('erro');
        // exibir erro
        return response;
      }
      logar(data.id, data.secret, () => history.push('/'));
    } catch (error) {
      throw error.message;
    }
    return '';
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField color="disabled" className={classes.input} id="standard-basic" label="Client ID" {...register('id')} />
      <TextField id="standard-basic" label="Secret ID" {...register('secret')} />
      <Button className={classes.button} type="submit" variant="contained" color="primary">
        Entrar
      </Button>
    </form>
  );
}

export default Home;
