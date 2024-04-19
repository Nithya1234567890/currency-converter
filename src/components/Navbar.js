// Navbar.js
import React from 'react';
import './box.css';

function Navbar({
    label,
    amount = 0,
    selectedCurrency,
    currencyType,
    onAmountChange,
    onCurrencyChange,
    amountDisable = false,
    currencyDisable = false,
    options
}) {
    // Ensure each Navbar maintains its own local state for selected currency
    const handleCurrencyChange = (e) => {
        onCurrencyChange(e.target.value);
    };
    const u=selectedCurrency.toUpperCase();
    const renderOptions = Array.isArray(options) ? options.map(cur => (
        <option key={cur} value={cur}>
            {cur}
        </option>
    )) : null;

    return (
        <div className='box'>
            <div className="inputBox">
                <label htmlFor="id">{label}</label>
                <input style={{ fontWeight: "bolder", outline: "none", border: "none" }} type="number" id='id' value={amount} onChange={(e) => { onAmountChange && onAmountChange(e.target.value) }} disabled={amountDisable} />
            </div>
            <div className="currencyBox">
                <p>{currencyType}</p>
                <select style={{ fontWeight: "bolder" }} name="" id="currency" value={u} onChange={handleCurrencyChange} disabled={currencyDisable}>
                    {renderOptions}
                </select>
            </div>
        </div>
    )
}

export default Navbar;
