import React from "react";
import PropTypes from "prop-types";

function Summary({ cartItems }) {
  const [distinctCartItemsCount, setDistinctCartItemsCount] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    const mapping = cartItems.reduce((acc, { id }) => {
      if (!acc[id]) {
        acc[id] = 1;
      } else {
        acc[id]++;
      }
      return acc;
    }, {});
    setDistinctCartItemsCount(Object.keys(mapping).length);
  }, [cartItems]);

  React.useEffect(() => {
    setTotalPrice(cartItems.reduce((acc, { price }) => acc + price, 0));
  }, [totalPrice]);

  return (
    <div>
      <h1>Arkadiusz Kasprzyk</h1>
      <div>
        <span>Ile różnych produktów? {distinctCartItemsCount}</span>
      </div>
      <div>
        <span>Ile wszystkich produktów? {cartItems.length}</span>
      </div>
      <div>
        <span>Cena wszystkich produktów? {totalPrice.toFixed(2)} zł</span>
      </div>
    </div>
  );
}

Summary.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object)
};

Summary.defaultProps = {};

export default Summary;
