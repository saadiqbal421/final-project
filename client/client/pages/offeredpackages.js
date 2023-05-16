import React from 'react';

const NextPage = ({ formData }) => {
  if (!formData || Object.keys(formData).length === 0) {
    return (
      <div>
        <h1>No data submitted</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Submitted Data</h1>
      <div>
        <h3>Place: {formData.place}</h3>
        <h3>Days: {formData.days}</h3>
        <h3>Price: {formData.price}</h3>
        <h3>Description: {formData.description}</h3>
        {/* Render the image using formData.image */}
        <img src={formData.image} alt="Submitted" />
      </div>
    </div>
  );
};

export default NextPage;
