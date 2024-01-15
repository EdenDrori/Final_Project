import { toast } from "react-toastify";
import { validateRegister } from "../../validation/registerValidation";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { normalizeData } from "./normalizeData";
const submit = async (navigate, inputsValue, setErrorsState, thisChecked) => {
  try {
    const joiResponse = validateRegister(inputsValue);
    setErrorsState(joiResponse);
    if (joiResponse) return;
    let request = normalizeData(inputsValue, thisChecked);
    const { data } = await axios.post("/users", request);
    toast("You have successfully registered! Please log in now", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate(ROUTES.LOGIN);
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
export { submit };
