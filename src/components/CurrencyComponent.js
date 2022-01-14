import React from 'react';

export default function CurrencyComponent(props) {
  const { selectedCurrency, onChangeAmount, amount } = props;

  return (
    <>
      <input type="number" value={amount} onChange={onChangeAmount} />
      <select><option key={selectedCurrency}>{selectedCurrency}</option></select>
    </>
  );
}
