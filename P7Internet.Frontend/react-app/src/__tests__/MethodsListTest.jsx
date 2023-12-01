import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import MethodsList from "../components/MethodsList";

test("Methodslist renders the expected methods defined as parameter", () => {
  renderComponent(<MethodsList methods={["test1", "test2", "test3"]} />);
  expect(screen.getByText("Metode:")).toBeInTheDocument();
  expect(screen.getByText("test1")).toBeInTheDocument();
  expect(screen.getByText("test2")).toBeInTheDocument();
  expect(screen.getByText("test3")).toBeInTheDocument();
});
