// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [data, setData] = useState({});
  const [options, setOptions] = useState([]);

  const update = async () => {
    let url = `https://v6.exchangerate-api.com/v6/4a30afed5794663a7b0f8e15/latest/${from.toUpperCase()}`;
    let d = await fetch(url);
    let parsedData = await d.json();
    setData(parsedData.conversion_rates);
    setOptions(Object.keys(parsedData.conversion_rates));
  };

  useEffect(() => {
    update();
    //eslint-disable-next-line
  }, [from]);

  const convert = (amount) => {
    const u = to.toUpperCase();
    if (data[u] !== undefined) {
      setConvertedAmount(amount * data[u]);
    } else {
      console.error(`Conversion rate for ${to} is not available.`);
    }
  };
  const swap=()=>{
    const t=from;
    setFrom(to);
    setTo(t);
    const t1=amount;
    setAmount(convertedAmount);
    setConvertedAmount(t1);
  }

  return (
    <div className="box1">
      <div className="box2">
        <h1 style={{ marginBottom: "30px" }}>Currency Converter</h1>
        <Navbar
          label="from"
          amount={amount}
          selectedCurrency={from}
          currencyType="Selected Currency"
          onAmountChange={(amount) => setAmount(amount)}
          onCurrencyChange={(cur) => { setFrom(cur) }}
          amountDisable={false}
          currencyDisable={false}
          options={options}
        />
        <div className="buttonSwap">
          <button
            className="btn btn-primary"
            onClick={swap}
            style={{
              fontWeight: "bolder",
              padding: "15px",
              borderRadius: "10px",
              position: "absolute",
              top: "-20px",
            }}
          >
            Swap
          </button>
        </div>
        <Navbar
          label="to"
          amount={convertedAmount}
          selectedCurrency={to}
          currencyType="Converted Currency"
          onCurrencyChange={(cur) => { setTo(cur) }}
          amountDisable={true}
          currencyDisable={false}
          options={options}
        />
        <button
          onClick={() => convert(amount)}
          className="btn btn-primary"
          style={{
            width: "100%",
            fontWeight: "bolder",
            marginTop: "10px",
            padding: "15px",
            borderRadius: "10px",
          }}
        >{`Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}</button>
      </div>
    </div>
  );
}

export default App;
