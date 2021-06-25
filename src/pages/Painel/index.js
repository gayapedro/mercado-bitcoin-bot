import useAuth from '../../hooks/useAuth';

function Painel() {
  const { id, secret } = useAuth();

  return (
    <>
      <h1>Painel</h1>
      <p>{id}</p>
      <p>{secret}</p>
    </>
  );
}

export default Painel;
