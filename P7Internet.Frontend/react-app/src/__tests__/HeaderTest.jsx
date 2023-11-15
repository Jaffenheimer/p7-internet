import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import Header from "../components/Header";

import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";

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