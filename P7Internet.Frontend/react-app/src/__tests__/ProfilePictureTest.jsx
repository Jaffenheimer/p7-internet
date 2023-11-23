import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import ProfilePicture from "../components/ProfilePicture.jsx";

afterEach(cleanup);

test("Profile Picture renders properly", () => {
  renderComponent(<ProfilePicture />);
  expect(screen.getByRole("img")).toBeInTheDocument();
});

test("Profile Picture image is clickable and opens up pop up", () => {
  renderComponent(<ProfilePicture />);
  fireEvent.click(screen.getByRole("img"));
  expect(screen.getByText("Favoritter")).toBeInTheDocument();
  expect(screen.getByText("Indstillinger")).toBeInTheDocument();
  expect(screen.getByText("Log ud")).toBeInTheDocument();
});

test("Profile Picture image is clickable and favoritter is clickable", () => {
  renderComponent(<ProfilePicture openFavoritesModal={() => {}} />);
  fireEvent.click(screen.getByRole("img"));
  fireEvent.click(screen.getByText("Favoritter"));
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.queryByText("Favoritter")).not.toBeInTheDocument();
});

test("Profile Picture image is clickable and settings is clickable", () => {
  renderComponent(<ProfilePicture openFavoritesModal={() => {}} />);
  fireEvent.click(screen.getByRole("img"));
  fireEvent.click(screen.getByText("Indstillinger"));
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.queryByText("Indstillinger")).not.toBeInTheDocument();
});

// test("Profile Picture image is clickable and log out is clickable", () => {
//   renderComponent(<ProfilePicture openFavoritesModal={() => {}} />);
//   fireEvent.click(screen.getByRole("img"));
//   fireEvent.click(screen.getByText("Log ud"));
// });
