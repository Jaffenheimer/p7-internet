// import { cleanup, render, screen, act, fireEvent } from "@testing-library/react";
// import { Provider } from 'react-redux';
import '@testing-library/jest-dom'
// import React from "react";
// import SelectRecipeButton from "../components/SelectRecipeButton";
// import configureMockStore from "redux-mock-store";
// import { ToastContainer } from "react-toastify";

test("", () => {})
// afterEach(cleanup);

// describe("SelectRecipeButton", () => {
//   let mockStore;
//   beforeEach(() => {
//     const mockState = {
//       offers: {
//         stores: [],
//         toggleStateIsRadius: false,
//         radius: "100 m",
//       }
//     }
//     mockStore = configureMockStore()(mockState);

//     render(
//       <Provider store={mockStore}>
//         <SelectRecipeButton />
//       </Provider>
//     );
//   });

//   it("Testing button exists with the expected text", () => {
//     expect(screen.getByRole("button")).toBeInTheDocument();
//     expect(screen.getByText("Vælg opskrift")).toBeInTheDocument();
//   });

//   it("Toast appears when clicking the button", async () => {
//     render(<ToastContainer position="top-center" />);
//     await act(() => fireEvent.click(screen.getByRole("button")));
//     expect(await screen.findByText(/Tilføj mindst 1 butik for at vælge opskriften/)).toBeInTheDocument();
//   });
// });