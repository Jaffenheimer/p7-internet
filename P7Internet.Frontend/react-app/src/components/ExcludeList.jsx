import React from "react";

const ExcludeList = () => {
  function addIngredientToList(event, inputField, list) {
    // Prevents the page from reloading
    event.preventDefault();
    // Creates a new list item
    var listItem = document.createElement("li");
    // Adds the input value to the list item
    listItem.innerHTML = inputField.value;
    // Adds the list item to the list
    list.appendChild(listItem);
    inputField.value = "";
  }

  function submitAdd(event) {
    if (
      document.getElementById("ExcludedIngredientsList").childElementCount <= 10
    ) {
      addIngredientToList(
        event,
        document.getElementById("InputFieldExclude"),
        document.getElementById("ExcludedIngredientsList")
      );
    } else {
      event.preventDefault();
      alert("Du kan ikke tilføje flere ingredienser");
    }
  }

  function submitRemoveAll() {
    var list = document.getElementById("ExcludedIngredientsList");
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  }
  return (
    <div id="ExcludeList">
      <p id="ExcludeListText">Ekskluder ingredienser</p>
      <form id="ExcludeForm" onSubmit={submitAdd}>
        <input
          id="InputFieldExclude"
          type="text"
          placeholder="Ekskluder ingrediens"
        />
        <div id="ExcludedIngredientsList">
          <ul></ul>
        </div>
      </form>
      <button id="RemoveButton" onClick={submitRemoveAll}>
        Fjern alle
      </button>
    </div>
  );
};

export default ExcludeList;
