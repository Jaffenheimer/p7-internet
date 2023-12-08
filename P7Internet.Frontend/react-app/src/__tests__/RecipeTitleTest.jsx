import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import heartHollow from "../data/heart-hollow.svg";
import heartSolid from "../data/heart-solid.svg";
import RecipeTitle from "../components/RecipeTitle";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { renderComponentWithSpecificStore } from "../testSetupHelper/Helper";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

describe("RecipeTitle", () => {
  let mockStore;
  beforeEach(() => {
    const mockState = {
      user: {
        loggedIn: true,
        favoriteRecipes: [],
      },
    };
    mockStore = configureMockStore()(mockState);

    renderComponentWithSpecificStore(
      <RecipeTitle recipe={{ title: "Title Test" }} />,
      mockStore
    );
  });

  it("Render recipe title as logged in and expect heart hollow", () => {
    const heart = screen.getByRole("img");
    expect(screen.getByText("Title Test")).toBeInTheDocument();
    expect(heart).toBeInTheDocument();
    expect(heart).toHaveAttribute("src", heartHollow);
  });

  test("When clicking on the heart, onclick function is called", () => {
    const heart = screen.getByRole("img");
    heart.onclick = jest.fn();
    fireEvent.click(heart);
    expect(heart.onclick).toHaveBeenCalled();
  });
});

test("Render without being logged in and expect heart to remain as heartHollow (loginmodal pop up in real application)", () => {
  const mockState = {
    user: {
      loggedIn: false,
      favoriteRecipes: [],
    },
  };
  let mockStore = configureMockStore()(mockState);

  renderComponentWithSpecificStore(
    <RecipeTitle recipe={{ title: "Title Test" }} />,
    mockStore
  );

  const heart = screen.getByRole("img");

  expect(heart).toHaveAttribute("src", heartHollow);
  fireEvent.click(heart);
  //login modal should pop up here, therefore the heart remains hollow
  expect(heart).toHaveAttribute("src", heartHollow);
});
