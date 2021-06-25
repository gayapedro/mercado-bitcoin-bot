import { useState } from 'react';

export default function useAuthProvider() {
  const [id, setId] = useState(localStorage.getItem('id'));
  const [secret, setSecret] = useState(localStorage.getItem('secret'));

  const logar = (userId, userSecret, callback) => {
    setId(userId);
    setSecret(userSecret);
    localStorage.setItem('id', userId);
    localStorage.setItem('secret', userSecret);
    if (callback) callback();
  };

  const deslogar = (callback) => {
    setId(null);
    setSecret(null);
    if (callback) callback();
  };

  return {
    id,
    secret,
    logar,
    deslogar,
  };
}
