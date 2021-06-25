/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import { useEffect } from 'react';
import crypto from 'crypto';
import qs from 'querystring';
import axios from 'axios';

function App() {
  const testData = async () => {
    const now = String(Math.floor(new Date().getTime() / 1000));
    // const host = 'https://www.mercadobitcoin.net';
    const endpoint = '/tapi/v3/';
    const id = '4b02bc547c9d427c68d8ed72028f3a87';
    const secret = '7b58f32c20ec880147f3624e752fe99958a3a9dc502c9b0080fa959b1fffeca5';
    const queryString = qs.stringify({ tapi_method: 'get_account_info', tapi_nonce: now });
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
      const response = await axios.post('https://www.mercadobitcoin.net/tapi/v3/', queryString, config);
      console.log(response.data.response_data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    testData();
  }, []);

  return <div className="App">olá</div>;
}

export default App;
