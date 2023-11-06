import { cleanup, fireEvent, screen  } from "@testing-library/react";
import '@testing-library/jest-dom'
import React from "react";
import {renderComponent} from "../testSetupHelper/Helper.jsx";
import AddIngredientsForm from "../components/AddIngredientsForm.jsx";

afterEach(cleanup)
// beforeEach(() => {
//     renderComponent(<AddIngredientsForm />);
//     });

test("noerror", () => {
    expect(true).toBe(true);
  });
