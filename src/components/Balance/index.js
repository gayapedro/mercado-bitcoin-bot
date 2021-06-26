import { useEffect, useState } from 'react';
import './style.css';
import useAuth from '../../hooks/useAuth';
import bitcoin from '../../assets/bitcoin.png';
import real from '../../assets/real.png';

function Balance() {
  const [balanceBtc, setBalanceBtc] = useState(0);
  const [balanceBrl, setBalanceBrl] = useState(0);
  const [lastPrice, setLastPrice] = useState(0);
  const { fetchTapi, fetchData } = useAuth();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const balance = await fetchTapi('get_account_info');
      const cotacao = await fetchData('ticker');
      setBalanceBtc(Number(balance.balance.btc.available));
      setBalanceBrl(Number(balance.balance.brl.available));
      setLastPrice(Number(cotacao));
    }, 5000);

    return () => clearInterval(intervalId);
  });

  return (
    <div className="cabecalho">
      <div className="balance">
        <img src={bitcoin} alt="bitcoin" />
        <p>{`${balanceBtc}`}</p>
        <img src={real} alt="real" />
        <p>{`${balanceBrl.toFixed(2)}`}</p>
        <p>Total</p>
        <img src={real} alt="real" />
        <p>{`${(lastPrice * balanceBtc + balanceBrl).toFixed(2)}`}</p>
      </div>
    </div>
  );
}

export default Balance;
