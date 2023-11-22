import React from "react";
import { useProductsContext } from "../context/ProductsProvider";

const ModalSaveChanges = ({ products }) => {
  const { productID, handleHideModal } = useProductsContext();

  const productToBeSaved = products.filter(
    (product) => product._id === productID
  );
  const { sku, name, onHold, sold, toCome } = productToBeSaved[0];

  return (
    <div className="modal-container">
      <div className="modal">
        <h3>Are you sure you want to save these changes?</h3>
        <div className="btns-container">
          <button className="btn">Save Changes</button>
          <button className="modal-btn" onClick={handleHideModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSaveChanges;
