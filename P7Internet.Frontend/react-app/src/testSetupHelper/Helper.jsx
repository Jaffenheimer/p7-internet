import { store } from "../app/store";
import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

function renderComponent(component) {
  render(<Provider store={store}>{component}</Provider>);
} 

export { renderComponent}




