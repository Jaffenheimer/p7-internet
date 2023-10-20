import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storesActions } from "../features/storesSlice";
import Select from "react-select";

const StoreSelection = () => {
  const dispatch = useDispatch();

  const allStores = [
    { value: "Bilka", label: "Bilka" },
    { value: "Rema 1000", label: "Rema 1000" },
    { value: "Netto", label: "Netto" },
    { value: "Føtex", label: "Føtex" },
    { value: "Kvickly", label: "Kvickly" },
    { value: "Fakta", label: "Fakta" },
    { value: "Lidl", label: "Lidl" },
  ];

  //make a new list of options with the selected stores as well as the option to select all stores
  const selectAllOption = { value: "All stores", label: "Vælg alle" };
  const allOptions = [selectAllOption, ...allStores];

  const [values, setValue] = useState(allStores);
  const [options, setOptions] = useState([]);

  //whenever we update the store hook, we update the redux
  useEffect(() => {
    dispatch(storesActions.setStores(values));
  }, [values]);

  const handleChange = (event, actionMeta) => {
    console.log(actionMeta);
    //action is the type of action, option is the selected option, removedValue is the removed value
    const { action, option, removedValue } = actionMeta;
    console.log(option);
    //removing a store
    if (action === "remove-value") {
      const removedValueOption = {
        value: removedValue.value,
        label: removedValue.value,
      };
      setValue(values.filter((value) => value.value !== removedValue.value));
      //if the options list is empty, we set the options to be the removed value as well as the select all
      if (options.length === 0)
        setOptions([selectAllOption, removedValueOption]);
      //otherwise we append the removed value to the options
      else setOptions([...options, removedValueOption]);
    }

    //selecting an option
    else if (action === "select-option") {
      //selecting the "vælg alle" option: we reset the options and add all stores as value
      if (option.value === "All stores") {
        setOptions([]);
        setValue(allStores);
        return;
        //selecting a store: we remove the option from the options list and add it to the values
      } else {
        setOptions(options.filter((value) => value.value !== option.value));
        setValue([option, ...values]);
        return;
      }
    }

    //clearing all selections: we reset the values and enable all options
    if (action === "clear") {
      setValue([]);
      setOptions(allOptions);
      return;
    }
  };

  return (
    <div className="StoreSelection">
      <h3 id="StoreSelectionText">Mulige Butikker:</h3>
      <Select
        closeMenuOnSelect={false}
        isMulti
        id="storesSelect"
        options={options}
        onChange={handleChange}
        value={values}
      />
    </div>
  );
};

export default StoreSelection;
