import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import Header from "../components/Header";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { renderComponentWithSpecificStore } from "../testSetupHelper/Helper.jsx";

describe("Header component", () => {
  beforeEach(() => {
    renderComponent(<Header />);
  });
  it("Checks if the title is rendered", () => {
    expect(screen.getByText(/Opskriftsgenerator/)).toBeInTheDocument();
  });

  it("Checks if clicking the login button opens the login modal", () => {
    const loginButton = screen.getByText("Log Ind");
    fireEvent.click(loginButton);
    expect(screen.getByLabelText("Login Modal")).toBeInTheDocument();
  });
});

test("checks if profile picture is there when logged in", () => {
  let mockStore;
  const mockState = {
    user: {
      loggedIn: true,
    },
    recipe: {
      recipes: [],
    },
    page: {
      loginModalShown: false,
      favoritesModalShown: false,
    },
  };
  mockStore = configureMockStore()(mockState);
  renderComponentWithSpecificStore(<Header />, mockStore);
  expect(screen.getByTestId("ProfilePicture")).toBeInTheDocument();
});
