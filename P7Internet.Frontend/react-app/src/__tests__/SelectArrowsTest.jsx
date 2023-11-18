import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import React from "react";
import SelectArrows from "../components/SelectArrows";
import configureMockStore from "redux-mock-store";

afterEach(cleanup);

describe("SelectArrows", () => {
  let mockStore;
  beforeEach(() => {
    const mockState = {
      recipe: {
        recipes: [],
        currentRecipeIndex: 0,
      },
    };
    mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <SelectArrows />
      </Provider>
    );
  });

  it("Renders the arrows", () => {
    const arrows = screen.getAllByRole("img");
    expect(arrows[0]).toBeInTheDocument();
    expect(arrows[1]).toBeInTheDocument();
    expect(screen.getByLabelText("SelectArrows")).toBeInTheDocument();
    expect(screen.getByLabelText("SelectArrows")).toHaveAttribute(
      "tabIndex",
      "0"
    );
  });
});
