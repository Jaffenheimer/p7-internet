import { store } from "../app/store";
import React from "react";
import { Provider } from "react-redux";

function renderComponent(component) {
  return <Provider store={store}>{component}</Provider>;
} 

export { renderComponent}




