import React from "react";
import PropTypes from "prop-types";
import ShoppingItem from "./shopping-item";

function ShoppingList({ items, cartItems, cartItemActions, itemActions }) {
  return (
    <div>
      {items.map((item) => {
        const cartItemsCount = cartItems.filter((cartItem) => {
          return cartItem.id === item.id;
        }).length;

        return (
          <ShoppingItem
            key={item.id}
            count={cartItemsCount}
            cartItemActions={cartItemActions}
            itemActions={itemActions}
            {...item}
          />
        );
      })}
    </div>
  );
}

ShoppingList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  cartItemActions: PropTypes.object.isRequired,
  itemActions: PropTypes.object.isRequired
};

ShoppingList.defaultProps = {};

export default ShoppingList;
