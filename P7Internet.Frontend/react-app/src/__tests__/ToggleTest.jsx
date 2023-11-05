import { cleanup, fireEvent, getByRole, screen  } from "@testing-library/react";
import '@testing-library/jest-dom'
import React from "react";
import {renderComponent} from "../testSetupHelper/Helper.jsx";
import RadiusSlider from "../components/RadiusSlider";
import RecipeSelection from "../pages/RecipeSelection";

afterEach(cleanup)

test("testing elements in the store selection in recipe selection component", () => {
	renderComponent(<RecipeSelection />);
	expect(screen.getByText(/Mulige Butikker:/)).toBeInTheDocument()
})

test("testing elements in store selection is initialized as expected in recipe selection component", () => {
	renderComponent(<RecipeSelection />);
	expect(screen.getByText("Bilka"))
	expect(screen.getByText("Rema 1000"))
	expect(screen.getByText("Netto"))
	expect(screen.getByText("Føtex"))
	expect(screen.getByText("Kvickly"))
	expect(screen.getByText("Fakta"))
	expect(screen.getByText("Lidl"))
})

test("testing slider and text exists in radius slider component", () => {
	renderComponent(<RadiusSlider />);
	const slider = screen.getByRole('slider')
	expect(slider).toBeInTheDocument()
	expect(screen.getByText(/Radius: 100 m/)).toBeInTheDocument()
})

test("testing slider value changes properly in radius slider component", () => {
	renderComponent(<RadiusSlider />);
	const slider = screen.getByRole('slider')
	expect(slider).toBeInTheDocument()
	fireEvent.change(slider, {target: {value: 25}})
	expect(slider).toHaveValue("25")
	expect(screen.getByText(/Radius: 900 m/)).toBeInTheDocument()
})

