import React from "react";
import { storesSlice } from "../features/storesSlice";
import { useDispatch } from "react-redux";
import { storesActions } from "../features/storesSlice";
import Select from "react-select";

const StoreSelection = () => {
  const dispatch = useDispatch();

  const stores = [
    {value: "Bilka",label: "Bilka"},
    {value: "Rema 1000",label: "Rema 1000"},
    {value: "Netto",label: "Netto"},
    {value: "Føtex",label: "Føtex"},
    {value: "Kvickly",label: "Kvickly"},
    {value: "Fakta",label: "Fakta"},
    {value: "Lidl",label: "Lidl"},
  ];



  const handleChange = (event) => {
    const stores = [];
    for (const element of event) {
      const value = element.value.toLowerCase();
      stores.push(value);
    }
    dispatch(storesActions.setStores(stores));
  };

  return (
    <div className="StoreSelection">
      <h3 id="StoreSelectionText">Mulige Butikker:</h3>
      <Select
        isMulti
        id="storesSelect"
        options={stores}
        onChange={handleChange}
      />
    </div>
  );
};

export default StoreSelection;
