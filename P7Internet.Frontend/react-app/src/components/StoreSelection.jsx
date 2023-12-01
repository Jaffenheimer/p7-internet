import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { offersActions } from "../features/offersSlice";
import Select from "react-select";
import { allStoreObjects } from "../objects/Stores.js";
import { toast } from "react-toastify";

const StoreSelection = ({ values, setValues, options, setOptions }) => {
  const dispatch = useDispatch();
  const allStores = allStoreObjects;

  //make a new list of options with the selected stores as well as the option to select all stores
  const selectAllOption = { value: "All stores", label: "Vælg alle" };
  const allOptions = [selectAllOption, ...allStoreObjects];

  //whenever we update the store hook, we update the redux
  useEffect(() => {
    dispatch(offersActions.setStores(getStoresListFromStoreObjects(values)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  function getStoresListFromStoreObjects(storeObjects) {
    var stores = [];
    for (const store of storeObjects) {
      stores.push(store.value);
    }
    return stores;
  }
  const handleChange = (_, actionMeta) => {
    //action is the type of action, option is the selected option, removedValue is the removed value
    const { action, option, removedValue } = actionMeta;
    //removing a store
    if (action === "remove-value") {
        //if the removed value is "Bilka", we show a toast that explains why it is not possible to remove it
        if (removedValue.value === "Bilka") {
          toast.error("Bilka kan ikke fjernes fordi priser bliver vist for Bilka hvis der ikke er tilbud i andre butikker eller det er billigst i Bilka")
          return;
        }
      const removedValueOption = {
        value: removedValue.value,
        label: removedValue.value,
      };
      setValues(values.filter((value) => value.value !== removedValue.value));
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
        setValues(allStores);
        return;
      }
      //selecting a store
      else {
        //if one have selected a store and there are 2 options left, and one of them is "vælg alle",
        // it means the user has selected all stores and ensure that no options are available
        if (
          options.length === 2 &&
          (options[0].value === "All stores" ||
            options[1].value === "All stores")
        )
          setOptions([]);
        //Otherwise we remove the option from the options list and add it to the values
        else {
          setOptions(options.filter((value) => value.value !== option.value));
          setValues([option, ...values]);
        }
      }
    }

    //clearing all selections: we reset the values and enable all options
    else if (action === "clear") {
      setValues([]);
      setOptions(allOptions);
    }
  };

  return (
    <div className="StoreSelection">
      <h3 id="StoreSelectionText">Mulige Butikker:</h3>
      <Select
        closeMenuOnSelect={false}
        // makes it possible to select multiple options
        isMulti
        id="storesSelect"
        options={options}
        onChange={handleChange}
        value={values}
        noOptionsMessage={() => "Ingen butikker"}
      />
    </div>
  );
};

export default StoreSelection;
