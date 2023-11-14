import { cleanup, fireEvent, screen  } from "@testing-library/react";
import '@testing-library/jest-dom'
import React from "react";
import {renderComponent} from "../testSetupHelper/Helper.jsx";
import SelectArrows from "../components/SelectArrows";
import RecipeTitle from "../components/RecipeTitle";
import SelectRecipeButton from "../components/SelectRecipeButton";

afterEach(cleanup)

test("Check Images in RecipeTitle and SelectArrows renders properly ", () => {
	renderComponent(<RecipeTitle />);
	renderComponent(<SelectArrows />);
	const images = screen.getAllByRole('img');

	expect(images[0]).toHaveAttribute('src', 'heart-hollow.svg');
	expect(images[1]).toHaveAttribute('src', 'leftArrow.svg');
	expect(images[2]).toHaveAttribute('src', 'rightArrow.svg');
})

test("Test Recipe Button exist by text and test if button is clickable", () => {
	renderComponent(<SelectRecipeButton />);
	const button = screen.getByText('Vælg opskrift');
	expect(button).toBeInTheDocument()
	fireEvent.click(button);
})