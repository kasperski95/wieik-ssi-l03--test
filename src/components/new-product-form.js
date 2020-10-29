import React from "react";
import PropTypes from "prop-types";

function NewProductForm({ addItem }) {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");

  const onSubmit = React.useCallback(() => {
    if (!price || price.length === 0) {
      alert("Cena jest wymagana.")
      return;
    }

    addItem({ name: name.length === 0 ? undefined: name, price });
    setName("")
    setPrice("")
  }, [addItem, name, setName, price, setPrice]);

  return (
    <div>
      <span>Nazwa</span>
      <input
        placeholder="Podaj nazwę"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <span>Cena</span>
      <input
        placeholder="Podaj cenę*"
        type="number"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <button children="Dodaj nowy produkt" onClick={onSubmit} />
    </div>
  );
}

NewProductForm.propTypes = {
  addItem: PropTypes.func.isRequired
};

NewProductForm.defaultProps = {};

export default NewProductForm;
