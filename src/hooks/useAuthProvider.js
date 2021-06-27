import { useState } from 'react';
import axios from 'axios';
import qs from 'querystring';
import crypto from 'crypto';

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

  const estaLogado = () => {
    if (id && secret) return true;
    return false;
  };

  const fetchTapi = async (method, queryParams) => {
    const now = String(Math.floor(new Date().getTime() / 1000));
    const host = 'https://www.mercadobitcoin.net';
    const endpoint = '/tapi/v3/';
    let query = { tapi_method: method, tapi_nonce: now };
    if (queryParams) {
      query = ({ ...query, ...queryParams });
    }
    const queryString = qs.stringify(query);
    const teste = crypto.createHmac('sha512', secret)
      .update(`${endpoint}?${queryString}`)
      .digest('hex');

    const config = {
      headers: {
        'TAPI-ID': id,
        'TAPI-MAC': teste,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    try {
      const response = await axios.post(`${host}${endpoint}`, queryString, config);
      return response.data.response_data;
    } catch (error) {
      throw error.message;
    }
  };

  const fetchData = async (method) => {
    const address = `https://www.mercadobitcoin.net/api/BTC/${method}/`;
    const config = {
      headers: {

        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.get(address, config);
      return response.data.ticker.last;
    } catch (error) {
      throw error.message;
    }
  };

  return {
    fetchTapi,
    fetchData,
    logar,
    deslogar,
    estaLogado,
    id,
    secret,
  };
}
