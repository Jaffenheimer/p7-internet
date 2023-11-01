import { act, cleanup, fireEvent, getAllByRole, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import React from "react";
import {renderComponent} from "../testSetupHelper/Helper.jsx";
import NumPersonsField from "../components/NumPersonsField.jsx";
import { Provider } from "react";
import { store } from "../app/store";
import { useDispatch, useStore } from "react-redux";
import { ToastContainer } from "react-toastify";


afterEach(cleanup)
beforeEach(() => {
    renderComponent(<NumPersonsField />);

    });


test("Renders the input field as well as the plus and minus button", () => {
    const minus = screen.getByText(/-/);
    const plus = screen.getByText(/\+/);
    const inputField = screen.getByTestId('InputNumPersonsField')

    expect(minus).toBeInTheDocument();
    expect(plus).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
  });

test("default value of the input field is 4", () => {
    const inputField = screen.getByTestId('InputNumPersonsField')
    expect(inputField.value).toBe('4');
  });

test("Clicking the plus button increases the value of the input field", () => {
    const inputField = screen.getByTestId('InputNumPersonsField')
    const plus = screen.getByText(/\+/);
    expect(inputField.value).toBe('4');
    fireEvent.click(plus);
    expect(inputField.value).toBe('5');
  });

test("Clicking the minus button decreases the value of the input field", () => {
    const inputField = screen.getByTestId('InputNumPersonsField')
    const minus = screen.getByText(/-/);
    expect(inputField.value).toBe('4');
    fireEvent.click(minus);
    expect(inputField.value).toBe('3');
  });

test("Clicking the minus button when the value is 1 does not decrease the value of the input field", async () => {
    render(<ToastContainer 
        position="top-center"/>)
    const inputField = screen.getByTestId('InputNumPersonsField')
    const minus = screen.getByText(/-/);
    expect(inputField.value).toBe('4');
    fireEvent.click(minus);
    fireEvent.click(minus);
    fireEvent.click(minus);
    expect(inputField.value).toBe('1');
    fireEvent.click(minus);
    expect(await screen.findByText(/minimum er 1/)).toBeInTheDocument();
    expect(inputField.value).toBe('1');
  });

test("Clicking the plus button when the value is 10 does not increase the value of the input field", async () => {
    render(<ToastContainer 
        position="top-center"/>)
    const inputField = screen.getByTestId('InputNumPersonsField')
    const plus = screen.getByText(/\+/);
    expect(inputField.value).toBe('4');
    fireEvent.click(plus);
    fireEvent.click(plus);
    fireEvent.click(plus);
    fireEvent.click(plus);
    fireEvent.click(plus);
    fireEvent.click(plus);
    expect(inputField.value).toBe('10');
    fireEvent.click(plus);
    expect(await screen.findByText(/maximum er 1/)).toBeInTheDocument();
    expect(inputField.value).toBe('10');
    });

