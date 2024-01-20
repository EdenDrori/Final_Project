import axios from "axios";
import { validateEditUser } from "../../validation/editUserValidation";
import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";
const editProfileSubmit = async (
  inputsValue,
  setErrorsState,
  navigate,
  userId
) => {
  try {
    const joiResponse = validateEditUser(inputsValue);
    setErrorsState(joiResponse);
    if (joiResponse) return;
    const { data } = await axios.put("/users/" + userId, {
      name: {
        first: inputsValue.first,
        middle: inputsValue.middle,
        last: inputsValue.last,
      },
      // email: inputsValue.email,
      // password: inputsValue.password,
      phone: inputsValue.phone,
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
        zip: +inputsValue.zip,
      },
    });
    toast("You Edited Your Profile Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate(ROUTES.PROFILE);
  } catch (err) {
    toast("Something is missing..", {
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
export { editProfileSubmit };
