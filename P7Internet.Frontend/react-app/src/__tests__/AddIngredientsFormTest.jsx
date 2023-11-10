import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import AddIngredientsForm from "../components/AddIngredientsForm.jsx";

afterEach(cleanup);

describe("AddIngredientsForm", () => {
  const ingredientsList = {
    0: { id: "0", text: "flour" },
    1: { id: "1", text: "sugar" },
  };
  const addIngredient = jest.fn();
  const removeAllHandler = jest.fn();

  beforeEach(() => {
    renderComponent(
      <AddIngredientsForm
        ingredientsList={ingredientsList}
        addIngredient={addIngredient}
        removeAllHandler={removeAllHandler}
      />
    );
  });

  it("renders an input field", () => {
    expect(
      screen.getByPlaceholderText("Tilføj en ingrediens...")
    ).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    expect(screen.getByRole("button", { name: "Tilføj" })).toBeInTheDocument();
  });

  it("renders a remove all button", () => {
    expect(
      screen.getByRole("button", { name: "Fjern alle" })
    ).toBeInTheDocument();
  });
  
  test("when the form is submitted and the input field is empty does not call the addIngredient prop", () => {
    fireEvent.submit(screen.getByRole("button", { name: "Tilføj" }));
    expect(addIngredient).not.toHaveBeenCalled();
  });

  test("when the remove all button is clicked it calls the removeAllHandler prop", () => {
      fireEvent.click(screen.getByRole("button", { name: "Fjern alle" }));
      expect(removeAllHandler).toHaveBeenCalled();
  });
});
