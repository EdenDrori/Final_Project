const normalizeDataItem = (inputsValue) => {
  return {
    title: inputsValue.title,
    brand: inputsValue.brand,
    description: inputsValue.description,
    phone: inputsValue.phone,
    price:inputsValue.price,
    size: inputsValue.size,
    image: {
      url: inputsValue.url,
      alt: inputsValue.alt,
    },
    address: {
     
      country: inputsValue.country,
      city: inputsValue.city,
      street: inputsValue.street,
      houseNumber: inputsValue.houseNumber,
     // zip: +inputsValue.zip,
    },
  };
};
export { normalizeDataItem };
