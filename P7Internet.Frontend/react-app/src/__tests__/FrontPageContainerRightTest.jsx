import { cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { FrontPageContainerRight } from "../components";
import { renderComponent } from "../testSetupHelper/Helper";

afterEach(cleanup);

describe("FrontPageContainerRight", () => {
  beforeEach(() => {
    renderComponent(<FrontPageContainerRight />);
  });
  it("checks if FrontPageContainerRight is rendered", () => {
    expect(screen.getByTestId("FrontPageContainerRight")).toBeInTheDocument();
  });
  it("checks if the number of persons field is rendered", () => {
    expect(screen.getByTestId("NumberOfPersonsField")).toBeInTheDocument();
  });
  it("checks if dietary restrictions is rendered", () => {
    expect(screen.getByTestId("DietaryRestrictions")).toBeInTheDocument();
  });
  it("checks if allergens is rendered", () => {
    expect(screen.getByTestId("Allergens")).toBeInTheDocument();
  });
  it("checks if exclude list is rendered", () => {
    expect(screen.getByTestId("ExcludeList")).toBeInTheDocument();
  });
  it("checks if the header is rendered", () => {
    expect(screen.getByText(/Personer/)).toBeInTheDocument();
  });
});