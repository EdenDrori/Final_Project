const normalizeData = (inputsValue, isBusiness, selectedFile) => {
  return {
    name: {
      first: inputsValue.first,
      middle: inputsValue.middle,
      last: inputsValue.last,
    },
    phone: inputsValue.phone,
    email: inputsValue.email,
    password: inputsValue.password,
    image: {
      image: selectedFile,
      alt: inputsValue.alt,
    },
    address: {
      country: inputsValue.country,
      city: inputsValue.city,
      street: inputsValue.street,
      houseNumber: inputsValue.houseNumber,
      // zip: +inputsValue.zip,
    },
    isBusiness: isBusiness,
  };
};
export { normalizeData };
