import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import heartHollow from "../data/heart-hollow.svg";
import heartSolid from "../data/heart-solid.svg";
import RecipeTitle from "../components/RecipeTitle";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

afterEach(cleanup);

describe("RecipeTitle", () => {
  let mockStore;
  beforeEach(() => {
    const mockState = {
      user: {
        loggedIn: true,
      },
    };
    mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <RecipeTitle title="Title Test" />
      </Provider>
    );
  });

  it("Render recipe title as logged in and expect heart hollow", () => {
    const heart = screen.getByRole("img");
    expect(screen.getByText("Title Test")).toBeInTheDocument();
    expect(heart).toBeInTheDocument();
    expect(heart).toHaveAttribute("src", heartHollow);
  });

  it("Render as logged in and expect heart solid on click", () => {
    const heart = screen.getByRole("img");
    expect(heart).toHaveAttribute("src", heartHollow);
    fireEvent.click(heart);
    expect(heart).toHaveAttribute("src", heartSolid);
  });
});

test("Render without being logged in and expect heart to remain as heartHollow (loginmodal pop up in real application)", () => {
  const mockState = {
    user: {
      loggedIn: false,
    },
  };
  let mockStore = configureMockStore()(mockState);

  render(
    <Provider store={mockStore}>
      <RecipeTitle title="Title Test" />
    </Provider>
  );

  const heart = screen.getByRole("img");

  expect(heart).toHaveAttribute("src", heartHollow);
  fireEvent.click(heart);
  //login modal should pop up here, therefore the heart remains hollow
  expect(heart).toHaveAttribute("src", heartHollow);
});
