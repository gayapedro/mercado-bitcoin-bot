import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useStyles from './style';
import useAuth from '../../hooks/useAuth';

function Home() {
  const { logar } = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    logar(data.id, data.secret, () => history.push('/painel'));
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField id="standard-basic" label="Client ID" {...register('id')} />
      <TextField id="standard-basic" label="Secret ID" {...register('secret')} />
      <Button type="submit" variant="contained" color="primary">
        Entrar
      </Button>
    </form>
  );
}

export default Home;
