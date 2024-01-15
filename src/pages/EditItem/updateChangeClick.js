import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
import { validateItem } from "../../validation/itemValidation";
import axios from "axios";

const updateChangesClick = async (
  inputsValue,
  setErrorsState,
  navigate,
  _id
) => {
  try {
    const joiResponse = validateItem(inputsValue);
    setErrorsState(joiResponse);
    if (joiResponse) return;
    const { data } = await axios.put("/items/" + _id, {
      title: inputsValue.title,
      brand: inputsValue.brand,
      description: inputsValue.description,
      phone: inputsValue.phone,
      size: inputsValue.size,
      image: {
        url: inputsValue.url,
        alt: inputsValue.alt,
      },
      price: {
        value: inputsValue.value,
        currency: inputsValue.currency,
      },
      address: {
        state: inputsValue.state,
        country: inputsValue.country,
        city: inputsValue.city,
        street: inputsValue.street,
        houseNumber: inputsValue.houseNumber,
        //zip: +inputsValue.zip,
      },
    });
    
    toast("Your item has been edit succssefully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate(ROUTES.HOME);
  } catch (err) {
    toast("Somthing is missing... try again", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
export { updateChangesClick };
