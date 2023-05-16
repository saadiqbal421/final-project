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
        price: "9.99",
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
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/Submit`, {
        place,
        days,
        price,
        description,
        image,
      });
      toast.success("Submitted");
  
      console.log("Submit response", { data });
  
      dispatch({
        type: "Submit",
        payload: data,
      });
  
      window.localStorage.setItem("packages", JSON.stringify(data));
  
      // router.push("/user");
    } catch (err) {
      toast.error(`Error saving data`,err.response.data);
      setLoading(false);
    }
  
  
  };
    return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="place">Place:</label>
        <input
          type="text"
          id="place"
          name="place"
          onChange={(e) => place(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="days">Days:</label>
        <input
          type="text"
          id="days"
          name="days"
          onChange={(e) => setdays(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          onChange={(e) => setprice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={(e) => setdescription(e.target.value)}
 
        ></textarea>
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={(e) => setimage(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    
  );
  
};

export default Form;
