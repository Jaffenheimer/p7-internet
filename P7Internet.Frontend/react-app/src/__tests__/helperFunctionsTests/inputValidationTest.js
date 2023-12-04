import { screen, render } from "@testing-library/react";
import {
  userInputValidation,
  ingredientInputValidation,
} from "../../helperFunctions/inputValidation";
import "@testing-library/jest-dom";
import { ToastContainer } from "react-toastify";

//testing of userInputValidation function:
test("userInputValidation returns true if input is valid", () => {
  const email = "email@email.com";
  const username = "Username";
  const password = "Password123#";
  expect(userInputValidation(username, password, email)).toBe(true);
});

test("if email is invalid userInputValidation returns false and toast appears", async () => {
  render(<ToastContainer position="top-center" />);
  const email = "email";
  const username = "username";
  const password = "Password123";
  expect(userInputValidation(username, password, email)).toBe(false);
  expect(
    await screen.findByText(/Den indtastede email er ugyldig/)
  ).toBeInTheDocument();
});

test("if username is invalid userInputValidation returns false and toast appears", async () => {
  render(<ToastContainer position="top-center" />);
  const email = "email@email.com";
  const username = "username!"; //username cant have special characters
  const password = "Password123";
  expect(userInputValidation(username, password, email)).toBe(false);
  expect(
    await screen.findByText(
      /Brugernavnet er ugyldigt, da det kun må bestå af bogstaver og tal./
    )
  ).toBeInTheDocument();
});

test("if password is invalid userInputValidation returns false and toast appears", async () => {
  render(<ToastContainer position="top-center" />);
  const email = "email@email.com";
  const username = "username";
  const password = "password"; //password: at least 1 numeric digit, one uppercase letter, one lowercase letter, one special character, and min 6 characters
  expect(userInputValidation(username, password, email)).toBe(false);
  expect(
    await screen.findByText(
      /Kodeordet skal bestå af mindst et tal, et stort bogstav, et lille bogstav, et specialtegn og være mindst 6 tegn langt./
    )
  ).toBeInTheDocument();
});

test("if all inputs are invalid userInputValidation returns false and toasts appears", async () => {
  render(<ToastContainer position="top-center" />);
  const email = "email";
  const username = "username!";
  const password = "password";
  expect(userInputValidation(username, password, email)).toBe(false);
  expect(
    await screen.findByText(/Den indtastede email er ugyldig/)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(
      /Brugernavnet er ugyldigt, da det kun må bestå af bogstaver og tal./
    )
  ).toBeInTheDocument();
  expect(
    await screen.findByText(
      /Kodeordet skal bestå af mindst et tal, et stort bogstav, et lille bogstav, et specialtegn og være mindst 6 tegn langt./
    )
  ).toBeInTheDocument();
});

//testing of ingredientInputValidation function:
test("ingredientInputValidation returns true if input is valid", () => {
  const ingredient = "ingredient";
  expect(ingredientInputValidation(ingredient)).toBe(true);
});

test("ingredientInputValidation returns false if input is empty", () => {
  const ingredient = "";
  expect(ingredientInputValidation(ingredient)).toBe(false);
});

test("ingredientInputValidation returns false if input is only whitespace", () => {
  const ingredient = "          ";
  expect(ingredientInputValidation(ingredient)).toBe(false);
});

describe("if input contains invalid char ingredientInputValidation returns false and toast appear", () => {
  test.each([
    ["!ingredient", "!"],
    ["ingredient!", "!"],
    ["<script>killProgram()</script>", "<"],
    ["?!!<><(/%&¤¤#\"'\\", "?"],
    ["  -- }}", "}"],
  ])(
    "when input is %s, the toast complains about the invalid char: %s",
    async (inputIngredient, firstInvalidChar) => {
      render(<ToastContainer position="top-center" />);
      expect(ingredientInputValidation(inputIngredient)).toBe(false);
      expect(
        await screen.findByText(
          `${firstInvalidChar} er et ugyldigt tegn for en ingrediens.`
        )
      ).toBeInTheDocument();
    }
  );
});

test("if input is too long ingredientInputValidation returns false and toast appear", async () => {
  render(<ToastContainer position="top-center" />);
  const ingredient =
    "this ingredient is too long because it is very long which is a bit of an issue because it is too long";
  expect(ingredientInputValidation(ingredient)).toBe(false);
  expect(
    await screen.findByText(
      /Ingrediensen må højst være 50 tegn lang, ikke 101 tegn./
    )
  ).toBeInTheDocument();
});
