import './App.css';
import logo from './square-shaped-loop.png';
import React, { useState } from 'react';

import CurrencyComponent from './components/CurrencyComponent';
import WalletCardEthers from "./components/WalletDetailComponent"; 





function App() {
  const nepCurrency = 'NEP';
  const bsudCurrency = 'BSUD';
  const exchangeRate = 3; //1 NEP is equal to 3 BUSD.
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  
  function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
  }

  function togglePopup(){
    setIsOpen(!isOpen);
  }

  function calculateNep(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  
  function calculateBsud(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  let bsudAmount, nepValue;
  if (amountInFromCurrency) {
    nepValue = amount;
    bsudAmount = roundToTwo(amount * exchangeRate);
  } else {
    bsudAmount = amount;
    nepValue = roundToTwo(amount / exchangeRate);
  }

  return (
    <>
      <h1>Crypto converter</h1>
      <CurrencyComponent selectedCurrency={nepCurrency} onChangeAmount={calculateNep} amount={nepValue} />
      <img src={logo} className="convert-icon" />
      <CurrencyComponent selectedCurrency={bsudCurrency} onChangeAmount={calculateBsud} amount={bsudAmount} />
      
      <button className="green" onClick={togglePopup}>Check Wallet Details</button>
      {isOpen && <WalletCardEthers handleClose={togglePopup} />}
    </>
  );
}

export default App;
