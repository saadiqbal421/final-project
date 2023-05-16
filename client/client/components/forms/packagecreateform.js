import { Select,  Button, Avatar, Badge } from "antd";
import packagecreateform from "../../../components/forms/packagecreateform";

const CourseCreateForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
  preview,
  uploadButtonText,
  handleImageRemove = (f) => f,
  editPage = false,
}) => {
  const children = [];
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
  }
  return (
    <>
      {values && (
        <form onSubmit={handleSubmit}>
          
          <div className="form-group pb-2">
  <label htmlFor="packageName">Package Name</label>
  <input
    type="text"
    name="packageName"
    className="form-control"
    placeholder="Package Name"
    value={values.packageName}
    onChange={handleChange}
  />
  {values.error && <p className="text-danger">{values.error}</p>}
</div>

<div className="form-group pb-3">
  <label htmlFor="destination">Destination</label>
  <input
    type="text"
    name="destination"
    className="form-control"
    placeholder="Destination"
    value={values.destination}
    onChange={handleChange}
  />
</div>

<div className="form-group pb-3">
  <label htmlFor="duration">Duration (in days)</label>
  <input
    type="number"
    name="duration"
    className="form-control"
    placeholder="Duration (in days)"
    value={values.duration}
    onChange={handleChange}
  />
</div>



<div className="form-group pb-3">
  <label htmlFor="price">Price (per person)</label>
  <input
    type="number"
    name="price"
    className="form-control"
    placeholder="Price (per person)"
    value={values.price}
    onChange={handleChange}
  />
</div>
<div className="form-group pb-3">
  <label htmlFor="meals">Meals</label>
  <input
    type="text"
    name="meals"
    className="form-control"
    placeholder="Meals"
    value={values.meals}
    onChange={handleChange}
  />
</div>


          <div className="form-row">
            <div className="col">
              <div className="form-group pb-3">
                <label className="btn btn-outline-secondary btn-block text-left">
                  {uploadButtonText}
                  <input
                    type="file"
                    name="image"
                    onChange={handleImage}
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            </div>

            {preview && (
              <Badge count="X" onClick={handleImageRemove} className="pointer">
                <Avatar width={200} src={preview} />
              </Badge>
            )}

            {editPage && values.image && (
              <Avatar width={200} src={values.image.Location} />
            )}
          </div>
         <div className="pb-3"> </div>
          <div className="row">
            <div className="col">
              <Button
                onClick={handleSubmit}
                disabled={values.loading || values.uploading}
                className="register_btn1"
                loading={values.loading}
                type="primary"
                size="large"
                shape="round"
              >
                {values.loading ? "Saving..." : "Save & Continue"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default CourseCreateForm;
