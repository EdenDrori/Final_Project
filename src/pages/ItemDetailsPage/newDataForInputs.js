const newDataForInputs = (data) => {
  const newData = {
    title: data.title,
    brand: data.brand,
    description: data.description,
    phone: data.phone,
    value: data.price.value,
    currency: data.price.currency,
    size: data.size,
    url: data.image.url,
    alt: data.image.alt,
    state: data.address.state,
    country: data.address.country,
    city: data.address.city,
    street: data.address.street,
    houseNumber: data.address.houseNumber,
    status: data.status,
    //zip: +data.address.zip,
  };
  return newData;
};
export { newDataForInputs };
