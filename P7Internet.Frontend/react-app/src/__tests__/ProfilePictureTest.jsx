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
  expect(screen.getByText("Historik")).toBeInTheDocument();
  expect(screen.getByText("Indstillinger")).toBeInTheDocument();
  expect(screen.getByText("Log ud")).toBeInTheDocument();
});

test("Profile Picture image is clickable and favoritter is clickable, then ensure that the dropdown menu is hidden afterwards", () => {
  renderComponent(<ProfilePicture openFavoritesModal={() => {}} />);
  fireEvent.click(screen.getByRole("img"));
  expect(screen.getByText("Favoritter")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Favoritter"));
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.queryByText("Favoritter")).not.toBeInTheDocument();
});

test("Profile Picture image is clickable and historik is clickable, then ensure that the dropdown menu is hidden afterwards", () => {
  renderComponent(<ProfilePicture openFavoritesModal={() => {}} />);
  fireEvent.click(screen.getByRole("img"));
  expect(screen.getByText("Historik")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Historik"));
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.queryByText("Historik")).not.toBeInTheDocument();
});

test("Profile Picture image is clickable and settings is clickable, then ensure that the dropdown menu is hidden afterwards", () => {
  renderComponent(<ProfilePicture openFavoritesModal={() => {}} />);
  fireEvent.click(screen.getByRole("img"));
  expect(screen.getByText("Indstillinger")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Indstillinger"));
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.queryByText("Indstillinger")).not.toBeInTheDocument();
});
