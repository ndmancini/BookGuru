import { toast } from "react-toastify";

const SuccessToast = (inputText) => {
  toast.warning(inputText, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default SuccessToast;
