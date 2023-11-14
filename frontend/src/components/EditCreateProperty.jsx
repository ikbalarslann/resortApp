import React from "react";
import FormContainer from "./FormContainer";
import "./scss/editCrateProperty.scss";

const EditCreateProperty = ({ title, formData, setFormData, handleSubmit }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const options = [
    "Olimpic",
    "Semi-Olimpic",
    "Hotel Pool",
    "Villa Pool",
    "Aqua Park",
  ];

  const handleImageChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imagePath = reader.result;
        setFormData((prevData) => ({ ...prevData, [name]: imagePath }));
      };

      // Read the file as a data URL
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <FormContainer>
      <h1>{`${title} Property`}</h1>
      <form className="editCreateProperty" onSubmit={handleSubmit}>
        <div className="editCreateProperty__group">
          <label htmlFor="title" className="editCreateProperty__group__label">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter title"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="editCreateProperty__group__input"
          />
        </div>

        <div className="editCreateProperty__group">
          <label
            htmlFor="description"
            className="editCreateProperty__group__label"
          >
            Description
          </label>
          <textarea
            rows="3"
            placeholder="Enter description"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="editCreateProperty__group__input"
          ></textarea>
        </div>

        <div className="editCreateProperty__group">
          <label
            htmlFor="location"
            className="editCreateProperty__group__label"
          >
            Location
          </label>
          <input
            type="text"
            placeholder="Enter location"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="editCreateProperty__group__input"
          />
        </div>

        <div className="editCreateProperty__group">
          <label htmlFor="price" className="editCreateProperty__group__label">
            Price
          </label>
          <input
            type="number"
            placeholder="Choose price"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="editCreateProperty__group__input"
          />
        </div>

        <div className="editCreateProperty__group">
          <label htmlFor="space" className="editCreateProperty__group__label">
            Available Space
          </label>
          <input
            type="number"
            placeholder="Choose available space"
            name="space"
            id="space"
            value={formData.space}
            onChange={handleInputChange}
            required
            className="editCreateProperty__group__input"
          />
        </div>

        <label htmlFor="type" className="editCreateProperty__group__label">
          Pool Type
        </label>
        <select
          name="type"
          id="type"
          value={formData.type}
          onChange={handleInputChange}
          required
          className="editCreateProperty__group__select"
        >
          <option value="" disabled>
            Select pool type
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="editCreateProperty__group">
          <label htmlFor="images" className="editCreateProperty__group__label">
            Images
          </label>
          <input
            type="file"
            name="images"
            id="images"
            onChange={handleImageChange}
            multiple
            className="editCreateProperty__file"
          />
          <p className="editCreateProperty__group__text">
            Select two images for upload.
          </p>
        </div>

        <button type="submit" className="editCreateProperty__button">
          {`${title} Property`}
        </button>
      </form>
    </FormContainer>
  );
};

export default EditCreateProperty;
