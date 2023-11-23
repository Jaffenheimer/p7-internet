import { toast } from "react-toastify";

const MAX_INGREDIENT_LENGTH = 50;

//should happen in backend
//see what this regex accepts at https://jsfiddle.net/ghvj4gy9/
function checkValidEmail(email) {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailResultArray = emailRegex.exec(email);
  return emailResultArray !== null;
}

//THE USERNAME VALIDATION SHOULD HAPPEN IN THE BACKEND
//username: allowed characters are integers and upper/lowercase letters
function checkValidUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const usernameResultArray = usernameRegex.exec(username);
  return usernameResultArray !== null;
}

//THE PASSWORD VALIDATION SHOULD HAPPEN IN THE BACKEND
//password: allowed characters are at least 1 numeric degit, one uppercase, one lowercase
//and between 6 to 20 characters, excluding special characters.
function checkValidPassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; //
  const passwordResultArray = passwordRegex.exec(password);
  return passwordResultArray !== null;
}

export const userInputValidation = (username, password, email) => {
  let hasError = false;
  if (!checkValidPassword(password)) {
    toast.error(
      "Kodeordet skal bestå af mindst et tal, et stort bogstav, et lille bogstav og være mellem 6 og 20 tegn langt uden brug af specielle tegn."
    );
    hasError = true;
  }
  if (!checkValidUsername(username)) {
    toast.error(
      "Brugernavnet er ugyldigt, da det kun må bestå af bogstaver og tal."
      );
      hasError = true;
    }
    if (!checkValidEmail(email)) {
      toast.error("Den indtastede email er ugyldig");
      hasError = true;
    }
  return !hasError;
};

//returns the char that is invalid or null if no invalid chars
function invalidCharInIngredient(ingredient) {
  const validChars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789æøåÆØÅ-%(),. ";
  for (const char of ingredient) {
    if (!validChars.includes(char)) return char;
  }
  return null;
}

export function ingredientInputValidation(ingredient) {
  if (ingredient.trim().length === 0) return false; //if it only contains whitespace
  if (ingredient.length > MAX_INGREDIENT_LENGTH) {
    toast.error(
      `Ingrediensen må højst være ${MAX_INGREDIENT_LENGTH} tegn lang, ikke ${ingredient.length} tegn.`
    );
    return false;
  }
  if (invalidCharInIngredient(ingredient) !== null) {
    const invalidChar = invalidCharInIngredient(ingredient);
    toast.error(`${invalidChar} er et ugyldigt tegn for en ingrediens.`);
    return false;
  }
  return true;
}
