import { cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import {
  renderComponent,
  renderComponentWithSpecificStore,
} from "../testSetupHelper/Helper.jsx";
import configureMockStore from "redux-mock-store";
import HistoryModalContainer from "../components/HistoryModalContainer.jsx";

afterEach(cleanup);

test("Renders the HistoryModalContainer", () => {
  renderComponent(<HistoryModalContainer />);
  expect(screen.getByTestId("HistoryModalContainer")).toBeInTheDocument();
});

test("Renders button for each recipe in history", () => {
  const mockState = {
    user: {
      recipesInHistory: [{ title: "1" }, { title: "2" }],
      loggedIn: true,
    },
    recipe: {
      recipes: [],
    },
  };
  // configureMockStore() returns a function that can be called with the initial state
  const mockStore = configureMockStore()(mockState);

  renderComponentWithSpecificStore(<HistoryModalContainer />, mockStore);

  const buttons = screen.getAllByRole("button");
  expect(buttons.length).toBe(2);
  expect(buttons[0].textContent).toBe("1");
  expect(buttons[1].textContent).toBe("2");
});
test("Renders the historyModalContainer with correct text when no recipes are in history", () => {
  const mockState = {
    user: {
      recipesInHistory: [],
      loggedIn: true,
    },
    recipe: {
      recipes: [],
    },
  };
  // configureMockStore() returns a function that can be called with the initial state
  const mockStore = configureMockStore()(mockState);

  renderComponentWithSpecificStore(<HistoryModalContainer />, mockStore);

  const buttons = screen.queryAllByRole("button");
  expect(buttons.length).toBe(0);
  expect(screen.getByText(/Din historik er tom/)).toBeInTheDocument();
});

test("if user is not logged in the there are no recipes in history", () => {
  renderComponent(<HistoryModalContainer />);

  const buttons = screen.queryAllByRole("button");
  expect(buttons.length).toBe(0);
  expect(screen.getByText(/Din historik er tom/)).toBeInTheDocument();
});

test("Selecting a recipe, calls onclick function", () => {
  const mockState = {
    user: {
      recipesInHistory: [{ title: "1" }, { title: "2" }],
      loggedIn: true,
    },
    recipe: {
      recipes: ["1", "2"],
    },
  };
  const mockStore = configureMockStore()(mockState);
  renderComponentWithSpecificStore(<HistoryModalContainer />, mockStore);
  const buttons = screen.getAllByRole("button");
  buttons[0].onclick = jest.fn();
  userEvent.click(buttons[0]);
  expect(buttons[0].onclick).toHaveBeenCalled();
});
