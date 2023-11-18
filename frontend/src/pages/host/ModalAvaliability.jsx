import React from "react";
import "./scss/modalAvaliability.scss";

const ModalAvaliability = ({
  showModal,
  handleClose,
  handleFormSubmit,
  availableSpaces,
  pricePerNight,
  availableSpacesRef,
  pricePerNightRef,
  date,
}) => {
  return (
    <div className={`modalA ${showModal ? "show" : ""}`} onClick={handleClose}>
      <div className="modalA-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modalA-content">
          <div className="modalA-content-header">
            <h4 className="modalA-title">Edit Availability</h4>
            <button
              type="button"
              className="modalA-content-close"
              onClick={handleClose}
            >
              &times;
            </button>
          </div>
          <div className="modalA-content-body">
            <h6>Date : {date}</h6>
            <form>
              <div className="modalA-content-body__form-group">
                <label htmlFor="availableSpaces">Available Spaces</label>

                <input
                  type="text"
                  id="availableSpaces"
                  defaultValue={availableSpaces}
                  ref={availableSpacesRef}
                />
              </div>
              <div className="modalA-content-body__form-group">
                <label htmlFor="pricePerNight">Price Per Night</label>
                <input
                  type="text"
                  id="pricePerNight"
                  defaultValue={pricePerNight}
                  ref={pricePerNightRef}
                />
              </div>
            </form>
          </div>
          <div className="modalA-content-footer">
            <button
              type="button"
              className="modalA-content-footer__closebtn"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="modalA-content-footer__savebtn"
              onClick={handleFormSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAvaliability;
