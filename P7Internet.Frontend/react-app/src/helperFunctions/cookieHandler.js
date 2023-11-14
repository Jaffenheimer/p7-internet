//Function for retriving data from cookies
export const retriveCookie = (retriveValue) => {
  const cookies = document.cookie;
  const cookieArray = cookies.split(";").map((cookie) => cookie.trim());

  const storedToken = cookieArray.find((cookie) =>
    cookie.startsWith(retriveValue)
  );
  const splitToken = storedToken.split("=");
  const storedValue = splitToken.slice(1).join("=");

  return storedValue;
};

//Add cookies when login in
export const addCookies = (userName, userId, sessionToken) => {
  const now = getTime();
  document.cookie = `username=${userName}; expires=${now.toUTCString()} UTC; path=/;`;
  document.cookie = `userid=${userId}; expires=${now.toUTCString()} UTC; path=/;`;
  document.cookie = `sessionToken=${sessionToken}; expires=${now.toUTCString()} UTC; path=/;`;
};

//Deletes cookies when login out
export const deleteCookies = () => {
  document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

function getTime() {
  var now = new Date();
  var time = now.getTime();
  time += 3600 * 1000;
  now.setTime(time);
  return now;
}
