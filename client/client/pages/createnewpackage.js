import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import { createContext } from "react";




const Form = () => {
  const [values, setValues] = useState({
    place: "",
    days: "",
    price: "",
    description: "",
    image: null,
    loading: false,
  });

  const { state, dispatch } = useContext(Context);

  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  const { pack } = state;
  const router = useRouter();
  useEffect(() => {
    if (pack !== null) {
      router.push("/createnewpackage");
    }
  }, [pack]);

  const { place, days, price, description, image } = values;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!place || !days || !price || !description) {
      toast.error("Please enter all the data.");
      return;
    }

    try {
      setValues({ ...values, loading: true });
      const formData = new FormData();
      formData.append("place", place);
      formData.append("days", days);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);

      await axios.post("/api/createnewpackage", formData);
      toast.success("Submitted");

      console.log("Submit response", { data });

      dispatch({
        type: "Submit",
        payload: data,
      });

      window.localStorage.setItem("createnewpackage", JSON.stringify(data));

      // router.push("/user");
    } catch (err) {
      const errorMessage = err.response ? err.response.data : "Error saving data";
     // toast.error(errorMessage);
    }
  };

  const handlePlaceChange = (e) => {
    const inputValue = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/; // Regular expression pattern for alphabets and spaces only

    if (pattern.test(inputValue)) {
      setValues({ ...values, place: inputValue });
      // Clear the error message when the input is correct
    } else {
      toast.error("Invalid input. Only alphabets and spaces are allowed.");
    }
  };

  const handleDaysChange = (e) => {
    const inputValue = e.target.value;
    const pattern = /^[0-9\b]+$/; // Regular expression pattern for numbers only

    if (pattern.test(inputValue)) {
      setValues({ ...values, days: inputValue });
    } else {
      toast.error("Invalid input. Only numbers are allowed.");
    }
  };

  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    const pattern = /^[0-9\b]+$/; // Regular expression pattern for numbers only

    if (pattern.test(inputValue)) {
      setValues({ ...values, price: inputValue });
    } else {
      toast.error("Invalid input. Only numbers are allowed.");
    }
  };

  const handleDescriptionChange = (e) => {
    setValues({ ...values, description: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];



  };

    return (
      <FormDataContext.Provider value={values}>
    <form className="form" onSubmit={handleSubmit}>
    <div>
    <label htmlFor="place">Place:</label>
    <input
           type="text"
           id="place"
           name="place"
           value={values.place}
           onChange={handlePlaceChange}
         />
    </div>
    <div>
    <label htmlFor="days">Days:</label>
    <input
           type="text"
           id="days"
           name="days"
           value={values.days}
           onChange={handleDaysChange}
         />
    </div>
    <div>
    <label htmlFor="price">Price:</label>
    <input
           type="text"
           id="price"
           name="price"
           value={values.price}
           onChange={handlePriceChange}
         />
    </div>
    <div>
    <label htmlFor="description">Description:</label>
    <textarea
           id="description"
           name="description"
           value={values.description}
           onChange={handleDescriptionChange}
         ></textarea>
    </div>
    <div>
    <label htmlFor="image">Image:</label>
    <input
           type="file"
           id="image"
           name="image"
           accept="image/*"
           value={values.image}
           onChange={handleImageChange}
         />
    </div>
    <button type="submit" onClick={submit}>Submit</button>
    </form>
    </FormDataContext.Provider>
    );
    };

    export const FormDataContext = createContext(null);
    export default Form;