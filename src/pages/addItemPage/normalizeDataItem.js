const normalizeDataItem = (inputsValue) => {
  return {
    title: inputsValue.title,
    brand: inputsValue.brand,
    description: inputsValue.description,
    phone: inputsValue.phone,
    price: {
      value: inputsValue.value,
      currency: inputsValue.currency,
    },
    size: inputsValue.size,
    image: {
      url: inputsValue.url,
      alt: inputsValue.alt,
    },
    address: {
      state: inputsValue.state,
      country: inputsValue.country,
      city: inputsValue.city,
      street: inputsValue.street,
      houseNumber: inputsValue.houseNumber,
     // zip: +inputsValue.zip,
    },
  };
};
export { normalizeDataItem };
