import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import heartHollow from "../data/heart-hollow.svg";
import heartSolid from "../data/heart-solid.svg";
import RecipeTitle from "../components/RecipeTitle";
import { setupStore } from "../app/store"
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

afterEach(cleanup);

describe("RecipeTitle", () => {
  let mockStore;
  beforeEach(() => {
    const mockState = {
      user: {
        loggedInUser: {
          id: "23haihfsk",
          email: "admin@admin.com",
          username: "admin",
          password: "admin",
          heartedRecipes: [],
        }
      }
    }
    mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <RecipeTitle title="Title Test" />
      </Provider>
    );
  });

  it("Render recipe title and expect heart hollow", () => {
    const heart = screen.getByRole("img");
  
    expect(screen.getByText("Title Test")).toBeInTheDocument()
    expect(heart).toBeInTheDocument();
    expect(heart).toHaveAttribute('src', heartHollow)
  });
  
  it("Render recipe title as logged in and expect heart solid", async () => {
    const heart = screen.getByRole("img");
    expect(heart).toBeInTheDocument();
    fireEvent.click(heart);
    await expect(heart).toHaveAttribute('src', heartSolid)
  });
});



  
  