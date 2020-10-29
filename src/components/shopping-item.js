import React from "react";
import PropTypes from "prop-types";

function ShoppingItem({ id, name, price, color, count, cartItemActions, itemActions }) {
  const [newName, setNewName] = React.useState("");
  const [newPrice, setNewPrice] = React.useState("");
   

  const onAdd = React.useCallback(() => {
    cartItemActions.add(id)
  }, [id, cartItemActions])

  const onDelete = React.useCallback(() => {
    cartItemActions.delete(id)
  }, [id, cartItemActions])    
  
  const onItemDelete = React.useCallback(() => {
    itemActions.delete(id)
  }, [id, itemActions])  
  
  const onClear = React.useCallback(() => {
    cartItemActions.clear(id)
  }, [id, cartItemActions])

  const onUpdate = React.useCallback(() => {
    if (!newPrice || newPrice.length === 0) {
      alert("Cena jest wymagana.")
      return;
    }
    itemActions.update({id, name: newName.length === 0 ? undefined : newName, price: newPrice})
  }, [itemActions, newName, newPrice])


  return (
    <div>
      <span style={{marginRight: '1rem'}}>{count || "Brak"}</span>
      <span style={{ color }}>{name}</span>
      <span>, {price} zł</span>
      <button children="+" onClick={onAdd} />
      <button children="-" onClick={onDelete} />
      <button children="0" onClick={onClear} />
      <button children="Usuń" onClick={onItemDelete} />
      <input value={newName} placeholder="nazwa"  onChange={(e) => {
        setNewName(e.target.value)
      }} />
      <input placeholder="cena" type="number" value={newPrice} onChange={(e) => {
        setNewPrice(parseFloat(e.target.value))
      }} />
      <button children="Zaktualizuj" onClick={onUpdate} />
    </div>
  );
}

ShoppingItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  price: PropTypes.any.isRequired,
  color: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  cartItemActions: PropTypes.object.isRequired,
  itemActions: PropTypes.object.isRequired
};

ShoppingItem.defaultProps = {
  name: 'PRODUCT_NAME'
};

export default ShoppingItem;
