import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Form = () => {
  const [values, setValues] = useState({
    place: "",
    days: "",
    price: "",
    description: "",
    image: "",
    loading: false,
  });

  const { state, dispatch } = useContext(Context);

  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  const { pack } = state;
  const router = useRouter();
  useEffect(() => {
    if (pack !== null) {
      router.push("/createnewpackage");
    }
  }, [pack]);

  const { place, days, price, description } = values;
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      setValues({ ...values, loading: true });
      const formData = new FormData();
      formData.append("place", place);
      formData.append("days", days);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);
  
      const { data } = await axios.post(`/api/createnewpackage`, formData);
      toast.success("Submitted");
  
      console.log("Submit response", { data });
  
      dispatch({
        type: "Submit",
        payload: data,
      });
  
      window.localStorage.setItem("createnewpackage", JSON.stringify(data));
  
      // router.push("/user");
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data
        : "Error saving data";
      toast.error(errorMessage);
    }
  };

  const handlePlaceChange = (e) => {
    const inputValue = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/; // Regular expression pattern for alphabets and spaces only
  
    if (pattern.test(inputValue)) {
      setValues({ ...values, place: inputValue });
       // Clear the error message when the input is correct
    }
 
  else 
  {
    toast.error(errorMessage);
  }
  };

  const handleDaysChange = (e) => {
    setValues({ ...values, days: e.target.value });
  };

  const handlePriceChange = (e) => {
    setValues({ ...values, price: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setValues({ ...values, description: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setUploadButtonText(e.target.files[0].name);
  };
  

    return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="place">Place:</label>
        <input
          type="text"
          id="place"
          name="place"
          onChange={handlePlaceChange}
        />
      </div>
      <div>
        <label htmlFor="days">Days:</label>
        <input
          type="text"
          id="days"
          name="days"
          onChange={handleDaysChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          onChange={handlePriceChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
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
          onChange={handleImageChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    
  );
  
};

export default Form;
