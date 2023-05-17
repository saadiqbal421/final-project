import { useContext } from "react";
import { FormDataContext } from "./Form";

const DisplayFormData = () => {
  const formData = useContext(FormDataContext);

  return (
    <div>
      <h2>Form Data:</h2>
      <p>Place: {formData.place}</p>
      <p>Days: {formData.days}</p>
      <p>Price: {formData.price}</p>
      <p>Description: {formData.description}</p>
      <p>Image: {formData.image ? formData.image.name : "No image selected"}</p>
    </div>
  );
};

export default DisplayFormData;
