// import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
// import React from "react";
// import userEvent from "@testing-library/user-event";
// import Pages from "../objects/Pages"
// import { useDispatch, useSelector } from "react-redux";
// import ProfilePicture from "../components/ProfilePicture";

test("", () => {})
// jest.mock("react-redux");

// const initialState = {
//     page: Pages.frontPage,
//     loginModalShown: false,
// 		favoritesModalShown: false,
// };

// describe("ProfilePicture", () => {
//   const dispatch = jest.fn();

//   beforeEach(() => {
//     useSelector.mockImplementation(() => initialState);
//     useDispatch.mockImplementation(() => dispatch);
//   });

//   afterEach(() => {
//     jest.clearAllMocks()
//   });

//   it("Renders the image of the profile", () => {
//     render(<ProfilePicture />);
//     const profileImage = screen.getByRole("img");
//     expect(profileImage).toBeInTheDocument();
//   });

//   it("Check all expected options are in the dropdown menu", () => {
//     render(<ProfilePicture />);
//     const profileImage = screen.getByRole("img");
//     userEvent.click(profileImage);
//     expect(screen.getByText("Favoritter")).toBeInTheDocument();
//     expect(screen.getByText("Indstillinger")).toBeInTheDocument();
//     expect(screen.getByText("Log ud")).toBeInTheDocument();
//   });

//   it("Open Login Modal and favoritter and dont expect redux dispatch", () => {
//     render(<ProfilePicture openFavoritesModal={() => {initialState.favoritesModalShown = true}}/>);
//     const profileImage = screen.getByRole("img");
//     userEvent.click(profileImage);
//     userEvent.click(screen.getByText("Favoritter"));
//     expect(useDispatch).toHaveBeenCalled();
//     expect(dispatch).toHaveBeenCalledTimes(0);
//     expect(initialState.favoritesModalShown).toBe(true)
//   });

//   it("Open Login Modal and log out and expect redux dispatch", () => {
//     render(<ProfilePicture openFavoritesModal={() => {}}/>);
//     const profileImage = screen.getByRole("img");
//     userEvent.click(profileImage);
//     userEvent.click(screen.getByText("Log ud"));
//     expect(useDispatch).toHaveBeenCalled();
//     expect(dispatch).toHaveBeenCalledTimes(1);
//   });
// });

