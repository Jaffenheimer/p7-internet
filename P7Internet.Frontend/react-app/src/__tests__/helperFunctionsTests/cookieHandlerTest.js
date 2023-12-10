import {
  addCookies,
  deleteCookies,
  retrieveCookie,
} from "../../helperFunctions/cookieHandler";

test("Does retrieveCookie retrive the cookie correctly", () => {
  const testUsername = "username";
  document.cookie = `username=${testUsername};`;
  const retrivedUsername = retrieveCookie("username=");
  expect(retrivedUsername).toBe("username");

  //Deleting cookie
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
});

test("Can Cookies be added", () => {
  const testUsername = "username";
  const testUserId = "userid";
  const testUserSessionToken = "sessiontoken";

  addCookies(testUsername, testUserId, testUserSessionToken);

  const retrivedUsername = retrieveCookie("username=");
  const retrivedUserId = retrieveCookie("userid=");
  const retrivedUserSessionToken = retrieveCookie("sessionToken=");

  expect(retrivedUsername).toBe("username");
  expect(retrivedUserId).toBe("userid");
  expect(retrivedUserSessionToken).toBe("sessiontoken");

  //Deleting cookies
  deleteCookies();
});
