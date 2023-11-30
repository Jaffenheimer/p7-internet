import { cleanup, fireEvent, screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import React from "react";
import {
  renderComponent,
  renderComponentWithSpecificStore,
} from "../testSetupHelper/Helper.jsx";
import AddIngredientsForm from "../components/AddIngredientsForm.jsx";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import { ToastContainer } from "react-toastify";
import configureMockStore from "redux-mock-store";

afterEach(cleanup);

test("Renders the Form correctly", () => {
  renderComponent(<AddIngredientsForm />);
  const form = screen.getByTestId("AddIngredientsForm");
  const addButton = screen.getByTestId("AddButton");
  const removeAllButton = screen.getByTestId("RemoveAllButton");
  expect(form).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
  expect(removeAllButton).toBeInTheDocument();
});

test("Submitting the form calls onSubmit", () => {
  const onSubmit = jest.fn();
  renderComponent(<AddIngredientsForm />);
  const form = screen.getByTestId("AddIngredientsForm");
  form.onsubmit = onSubmit;
  fireEvent.submit(form);
  expect(onSubmit).toHaveBeenCalledTimes(1);
});

test("Clicking the tilføj button fires the onsubmit event", () => {
  const onSubmit = jest.fn();
  renderComponent(<AddIngredientsForm />);
  const form = screen.getByTestId("AddIngredientsForm");
  form.onsubmit = onSubmit;
  fireEvent.click(screen.getByText(/Tilføj/));
  expect(onSubmit).toHaveBeenCalledTimes(1);
});

test("Clicking the fjern alle button does not fire the onsubmit event, but fires the onclick event of the button", () => {
  const onSubmit = jest.fn();
  const onRemoveAllClick = jest.fn();
  renderComponent(<AddIngredientsForm removeAllHandler={onRemoveAllClick} />);
  const form = screen.getByTestId("AddIngredientsForm");
  form.onsubmit = onSubmit;
  fireEvent.click(screen.getByText(/Fjern alle/));
  expect(onSubmit).toHaveBeenCalledTimes(0);
  expect(onRemoveAllClick).toHaveBeenCalledTimes(1);
});

test("Submitting the form with the same input twice prompts toast to appear - for owned ingredients", async () => {
  const addIngredient = recipeGenerationActions.addOwnedIngredient;
  renderComponent(
    <AddIngredientsForm
      addIngredient={addIngredient}
      ingredientsList={["hello"]}
    />
  );
  render(<ToastContainer position="top-center" />);
  const form = screen.getByTestId("AddIngredientsForm");
  const addIngredientInput = screen.getByTestId("AddIngredientInput");
  userEvent.type(addIngredientInput, "test");
  fireEvent.submit(form);
  userEvent.type(addIngredientInput, "test");
  fireEvent.submit(form);
  expect(
    await screen.findByText(
      /"test" er allerede tilføjet til listen af ejede ingredienser!/
    )
  ).toBeInTheDocument();
});

test("Submitting the form with the same input twice prompts toast to appear - for excluded ingredients", async () => {
  const addIngredient = recipeGenerationActions.addExcludedIngredient;
  renderComponent(
    <AddIngredientsForm
      addIngredient={addIngredient}
      ingredientsList={["hello"]}
    />
  );
  render(<ToastContainer position="top-center" />);
  const form = screen.getByTestId("AddIngredientsForm");
  const addIngredientInput = screen.getByTestId("AddIngredientInput");
  userEvent.type(addIngredientInput, "test");
  fireEvent.submit(form);
  userEvent.type(addIngredientInput, "test");
  fireEvent.submit(form);
  expect(
    await screen.findByText(
      /"test" er allerede tilføjet til listen af ekskluderede ingredienser!/
    )
  ).toBeInTheDocument();
});

test("Submitting the form with an input when there already are 10 ingredients prompts toast to appear", async () => {
  renderComponent(
    <AddIngredientsForm
      ingredientsList={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
    />
  );
  render(<ToastContainer position="top-center" />);
  const form = screen.getByTestId("AddIngredientsForm");
  const addIngredientInput = screen.getByTestId("AddIngredientInput");
  userEvent.type(addIngredientInput, "test");
  fireEvent.submit(form);
  expect(
    await screen.findByText(/Du kan ikke tilføje flere end 10 ingredienser/)
  ).toBeInTheDocument();
});

test("Submitting the owned ingredients form with an input that is already in the excluded ingredients list prompts toast to appear", async () => {
  const ingredient = { text: "hello", id: 1 };
  const mockState = {
    recipeGeneration: {
      excludeList: [ingredient],
    },
  };
  // configureMockStore() returns a function that can be called with the initial state
  const mockStore = configureMockStore()(mockState);
  const addIngredientOwned = recipeGenerationActions.addOwnedIngredient;
  renderComponentWithSpecificStore(
    <AddIngredientsForm
      addIngredient={addIngredientOwned}
      ingredientsList={[]}
    />,
    mockStore
  );
  render(<ToastContainer position="top-center" />);
  const addIngredientInputOwned = screen.getByTestId("AddIngredientInput");
  const addIngredientFormOwned = screen.getByTestId("AddIngredientsForm");
  userEvent.type(addIngredientInputOwned, "hello");
  fireEvent.submit(addIngredientFormOwned); //adding element to owned ingredients

  expect(
    await screen.findByText(
      /"hello" er allerede tilføjet til listen af ekskluderede ingredienser!/
    )
  ).toBeInTheDocument();
});

test("Submitting the owned ingredients form with an input that is already in the excluded ingredients list prompts toast to appear", async () => {
  const ingredient = { text: "hello", id: 1 };
  const mockState = {
    recipeGeneration: {
      excludeList: [ingredient],
      ownedIngredients: [],
    },
  };
  // configureMockStore() returns a function that can be called with the initial state
  const mockStore = configureMockStore()(mockState);
  const addIngredientExcluded = recipeGenerationActions.addExcludedIngredient;
  renderComponentWithSpecificStore(
    <AddIngredientsForm
      addIngredient={addIngredientExcluded}
      ingredientsList={[]}
    />,
    mockStore
  );
  render(<ToastContainer position="top-center" />);
  const addIngredientInputOwned = screen.getByTestId("AddIngredientInput");
  const addIngredientFormOwned = screen.getByTestId("AddIngredientsForm");
  userEvent.type(addIngredientInputOwned, "hello");
  fireEvent.submit(addIngredientFormOwned); //adding element to owned ingredients

  expect(
    await screen.findByText(
      /"hello" er allerede tilføjet til listen af ekskluderede ingredienser!/
    )
  ).toBeInTheDocument();
});

test("Submitting the excluded ingredients form with an input that is already in the owned ingredients list prompts toast to appear", async () => {
  const ingredient = { text: "hello", id: 1 };
  const mockState = {
    recipeGeneration: {
      ownedIngredients: [ingredient],
      excludeList: [],
    },
  };
  // configureMockStore() returns a function that can be called with the initial state
  const mockStore = configureMockStore()(mockState);
  const addIngredientExcluded = recipeGenerationActions.addExcludedIngredient;
  renderComponentWithSpecificStore(
    <AddIngredientsForm
      addIngredient={addIngredientExcluded}
      ingredientsList={[]}
    />,
    mockStore
  );
  render(<ToastContainer position="top-center" />);
  const addIngredientInputExcluded = screen.getByTestId("AddIngredientInput");
  const addIngredientFormExcluded = screen.getByTestId("AddIngredientsForm");
  userEvent.type(addIngredientInputExcluded, "hello");
  fireEvent.submit(addIngredientFormExcluded); //adding element to excluded ingredients

  expect(
    await screen.findByText(
      /"hello" er allerede tilføjet til listen af ejede ingredienser!/
    )
  ).toBeInTheDocument();
});
