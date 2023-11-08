//Function for retriving data from cookies
const retriveCookie = (retriveValue) => {
    const cookies = document.cookie;
    const cookieArray = cookies.split(';').map(cookie => cookie.trim());          
     
    const storedToken = cookieArray.find(cookie => cookie.startsWith(retriveValue));
    const splitToken = storedToken.split('=');
    const storedValue = splitToken.slice(1).join('=');

    return storedValue; 
}

export default retriveCookie