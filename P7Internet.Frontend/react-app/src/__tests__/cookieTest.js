import retriveCookie from "../helperFunctions/retriveCookie";

test("Does retriveCookie retrive the cookie correctly", () => {
    const testUsername = "username"; 
    document.cookie = `username=${testUsername};`;
    const username = retriveCookie('username='); 
    expect(username).toBe("username");  
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
});