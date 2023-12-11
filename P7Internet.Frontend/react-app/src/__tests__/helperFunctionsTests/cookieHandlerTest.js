import {
  addCookies,
  deleteCookies,
  retrieveCookie,
} from "../../helperFunctions/cookieHandler";

test("Does retrieveCookie retrieve the cookie correctly", () => {
  const testUsername = "username";
  document.cookie = `username=${testUsername};`;
  const retrievedUsername = retrieveCookie("username=");
  expect(retrievedUsername).toBe("username");

  //Deleting cookie
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
});

test("Can Cookies be added", () => {
  const testUsername = "username";
  const testUserId = "userid";
  const testUserSessionToken = "sessiontoken";

  addCookies(testUsername, testUserId, testUserSessionToken);

  const retrievedUsername = retrieveCookie("username=");
  const retrievedUserId = retrieveCookie("userid=");
  const retrievedUserSessionToken = retrieveCookie("sessionToken=");

  expect(retrievedUsername).toBe("username");
  expect(retrievedUserId).toBe("userid");
  expect(retrievedUserSessionToken).toBe("sessiontoken");

  //Deleting cookies
  deleteCookies();
});
