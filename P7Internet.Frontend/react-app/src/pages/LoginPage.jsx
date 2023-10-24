import React, { useState } from 'react'
import avatarIcon from "../data/profile.svg";
import leftArrow from "../data/leftArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../features/userSlice";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [creatingAccount, setCreatingAccount] = useState(false)

  const handleChangeUsername = (event) => setUsername(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleChangeCheckbox = ()      => setCreatingAccount(!creatingAccount);

  function handleLogin(){
		//Find users that matches the username and password typed. 
    const validUser = users.filter( user => user.username === username && user.password === password)
    
    if(validUser.length === 1){ //if the user exists
        dispatch(userActions.loginUser(validUser)) //the user is now logged in on redux
        dispatch(pageActions.goToPage(Pages.frontPage)) //goto start page again
    }
    else{
			  toast.error("Kodeordet eller brugernavnet er indtastet forkert")
        setUsername('')
        setPassword('')
    }
  }

  //THE USERNAME VALIDATION SHOULD HAPPEN IN THE BACKEND
  //username: allowed characters are integers and upper/lowercase letters
  function checkValidUsername(){
		const usernameRegex = /^[a-zA-Z0-9]+$/; 
		const isValidUsername = usernameRegex.exec(username);
		if (isValidUsername === null)		return false
    else														return true
  }

	//THE PASSWORD VALIDATION SHOULD HAPPEN IN THE BACKEND
	//password: allowed characters are at least 1 numeric degit, one uppercase, one lowercase
	//and between 6 to 20 characters, excluding special characters.
  function checkValidPassword(){
		const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/ //
		const isValidPassword = passwordRegex.exec(password)
		if (isValidPassword === null)		return false
		else														return true
  }

  function handleCreateAccount(){
    const existsUser = users.filter( user => user.username === username )

    if(existsUser.length > 0)                   toast.error("Brugernavnet er allerede taget.") 
    else if (checkValidUsername() === false)	 	toast.error("Brugernavnet er ugyldigt, da det kun må bestå af bogstaver og tal.")
    else if (checkValidPassword() === false)		toast.error("Kodeordet skal bestå af mindst et tal, et stort bogstav, et lille bogstav og være mellem 6 og 20 tegn langt uden brug af specielle tegn.")
    
    else{
        dispatch(userActions.addUser([username, password, []]))
        setCreatingAccount(false)
        document.getElementById("checkbox").checked = false
        setUsername('')
        setPassword('')
        toast.success("Din bruger er nu tilføjet til databasen!")
        toast.success("Indsæt nu dine oplysninger for at logge ind.")
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if(!creatingAccount)    handleLogin()
    else                    handleCreateAccount()
  }

	function handleBackArrow(event) {
		event.preventDefault()
		dispatch(pageActions.goToPage(Pages.frontPage)) //goto start page again
	}

  return (
    <div className='App'>
        <div className='LoginPage'>
					<div>
        		<Toaster />
      		</div>
            <form className='LoginForm' onSubmit={handleSubmit}>
							<img src={leftArrow} alt="Back Arrow" id='backarrow' onClick={handleBackArrow}/>
                <div className='imgcontainer'>
                    <img src={avatarIcon} alt='Avatar' className='avatar'/>
                    <h3> Login/Opret Bruger
                        <label className="switch">
                            <input type="checkbox" id="checkbox" value={creatingAccount} onChange={handleChangeCheckbox}/>
                            <span className="slider round"/>
                        </label>
                    </h3>
                </div>

                <div className='container'>
                    <label><b>Brugernavn</b></label>
                    <input type="text" placeholder='Indtast brugernavn' 
                    value={username} onChange={handleChangeUsername}
                    required/>
                    
                    <label><b>Kodeord</b></label>
                    <input type="password" placeholder='Indtast kodeordet' 
                    value={password} onChange={handleChangePassword}
                    required/>
                    
                    <button type="submit">{!creatingAccount ?  "Login" : "Tilføj Bruger"}</button>
                    {!creatingAccount ? <>
                        <label>Husk mig: <input type="checkbox"/>  </label>
                        <a href="#">Glemt kodeord?</a>
                    </> : ""
                    }
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage
