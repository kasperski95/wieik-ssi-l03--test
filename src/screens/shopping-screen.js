import React from "react";
import Summary from "../components/summary";
import ShoppingList from "../components/shopping-list";
import NewProductForm from "../components/new-product-form";

const initItems = [{
  id: 1,
  name: "Chleb",
  price: 3,
  color: "red",
}];

const initCartItemIds = [1, 1];

function ShoppingScreen() {
  const [items, setItems] = React.useState(initItems);
  const [cartItemIds, setCartItemIds] = React.useState(initCartItemIds);

  // ---------------

  const addItem = React.useCallback(
    (item) => {
      const newId =
        items.reduce((maxId, item) => {
          return item.id > maxId ? item.id : maxId;
        }, 0) + 1;

      const colorId = Math.round(Math.random() * 5);
      const colors = ["red", "green", "blue", "cyan", "pink", "purple"];

      setItems([...items, { ...item, color: colors[colorId], id: newId }]);
    },
    [items]
  );

  const updateItem = React.useCallback(
    (item) => {
      const oldItem = items.find(({ id }) => id === item.id);
      setItems([
        ...items.filter(({ id }) => id !== item.id),
        { ...oldItem, ...item },
      ]);
    },
    [items]
  );

  const deleteItem = React.useCallback(
    (id) => {
      setCartItemIds([
        ...cartItemIds.filter((cartItemId) => cartItemId !== id),
      ]);
      setItems([...items.filter(({ id: currId }) => currId !== id)]);
    },
    [items, setCartItemIds, cartItemIds]
  );

  const itemActions = {
    add: addItem,
    update: updateItem,
    delete: deleteItem,
  };

  // ---------------

  const addItemCart = (id) => {
    setCartItemIds([...cartItemIds, id]);
  };

  const deleteCartItem = (id) => {
    const idx = cartItemIds.findIndex((itemId) => id === itemId);
    setCartItemIds([...cartItemIds.filter((_, index) => idx !== index)]);
  };

  const clearCartItem = (id) => {
    setCartItemIds([
      ...cartItemIds.filter((itemId) => {
        return id !== itemId;
      }),
    ]);
  };

  const cartItemActions = {
    add: addItemCart,
    delete: deleteCartItem,
    clear: clearCartItem,
  };

  // ---------------

  const retrieveItemsFromIds = React.useCallback(
    (ids) => {
      const result = [];
      for (const itemId of ids) {
        const item = items.find((item) => item.id === itemId);
        if (item) {
          result.push(item);
        }
      }
      return result;
    },
    [items]
  );

  const [cartItems, setCartItems] = React.useState(
    retrieveItemsFromIds(cartItemIds)
  );

  React.useEffect(() => {
    setCartItems(retrieveItemsFromIds(cartItemIds));
  }, [cartItemIds, retrieveItemsFromIds]);

  // --------------
  const onClearCartItems = React.useCallback(() => {
    setItems(initItems);
    setCartItemIds(initCartItemIds);
  }, [setCartItemIds]);

  // =====================================================

  return (
    <div className="wrapper">
      <div className="card">
        <Summary cartItems={cartItems} />
      </div>
      <div className="card">
        <div>
          <button children="Resetuj" onClick={onClearCartItems} />
        </div>
        <ShoppingList
          cartItems={cartItems}
          cartItemActions={cartItemActions}
          items={items}
          itemActions={itemActions}
        />
      </div>
      <div className="card">
        <NewProductForm addItem={addItem} />
      </div>
    </div>
  );
}

ShoppingScreen.propTypes = {};

export default ShoppingScreen;
