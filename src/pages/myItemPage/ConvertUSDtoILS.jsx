import React, { useState, useEffect } from "react";

const ConvertCurrency = ({ api_key, amount }) => {
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const convertUSDToILS = async () => {
      try {
        const response = await fetch(
          `http://data.fixer.io/api/latest?access_key=${api_key}`
        );
        const data = await response.json();

        if (!data.success) {
          console.error(`Error: ${data.error.info}`);
          return;
        }

        const usdToIlsRate = data.rates.ILS;

        const amountInILS = amount * usdToIlsRate;

        setConvertedAmount(amountInILS.toFixed(2));
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    convertUSDToILS();
  }, [api_key, amount]);

  return (
    <div>
      
        <p>{`${amount} USD is approximately`} <br/> {` ${convertedAmount} ILS`}</p>
      
    </div>
  );
};

// // Example usage:
// const YourReactComponent = () => {
//   const apiKey = "69eb4eb0b7cdf5687d7f3464639f7935"; // Replace with your API key
//   const usdAmount = 25; // Replace with the amount you want to convert from USD to ILS

//   return <ConvertCurrency api_key={apiKey} amount={usdAmount} />;
// };

export default ConvertCurrency;
