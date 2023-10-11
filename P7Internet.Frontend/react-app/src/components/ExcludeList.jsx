import React from "react";

const ExcludeList = () => {
  function AddIngredientToList(event, inputField, list) {
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

  function RemoveIngredientFromList(event, list) {
    //check if list is empty
    if (list.childElementCount === 0) {
      return;
    }
    // Prevents the page from reloading
    event.preventDefault();
    // Removes the last child of the list
    list.removeChild(list.lastChild);
  }

  function SubmitAdd(event) {
    AddIngredientToList(
      event,
      document.getElementById("InputFieldExclude"),
      document.getElementById("ExcludedIngredientsList")
    );
}
    function SubmitRemove(event) {
      RemoveIngredientFromList(
        event,
        document.getElementById("ExcludedIngredientsList")
      );
    }
  return (
    <div>
      <form onSubmit={SubmitAdd}>
        <input
          id="InputFieldExclude"
          type="text"
          placeholder="Ekskluder ingrediens"
        />
        <ul id="ExcludedIngredientsList"></ul>
        <input id="addButton" type="submit" value="Tilføj" />
      </form>
        <button id="removeButton" onClick={SubmitRemove}>Fjern</button>
    </div>
  );
};

export default ExcludeList;
