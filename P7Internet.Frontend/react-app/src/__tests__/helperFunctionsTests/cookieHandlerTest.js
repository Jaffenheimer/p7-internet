import {
  addCookies,
  deleteCookies,
  retriveCookie,
} from "../../helperFunctions/cookieHandler";

test("Does retriveCookie retrive the cookie correctly", () => {
  const testUsername = "username";
  document.cookie = `username=${testUsername};`;
  const retrivedUsername = retriveCookie("username=");
  expect(retrivedUsername).toBe("username");

  //Deleting cookie
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
});

test("Can Cookies be added", () => {
  const testUsername = "username";
  const testUserId = "userid";
  const testUserSessionToken = "sessiontoken";

  addCookies(testUsername, testUserId, testUserSessionToken);

  const retrivedUsername = retriveCookie("username=");
  const retrivedUserId = retriveCookie("userid=");
  const retrivedUserSessionToken = retriveCookie("sessionToken=");

  expect(retrivedUsername).toBe("username");
  expect(retrivedUserId).toBe("userid");
  expect(retrivedUserSessionToken).toBe("sessiontoken");

  //Deleting cookies
  deleteCookies();
});
