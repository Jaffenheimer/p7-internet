import React, { useState } from 'react'
import avatarIcon from "../data/profile.svg";
import leftArrow from "../data/leftArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../features/userSlice";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import toast from 'react-hot-toast';

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
    const validUser = users.filter( user => user.username === username && user.password === password)
    
    if(validUser.length === 1){
        dispatch(userActions.loginUser(validUser)) //the user is now logged in on redux
        dispatch(pageActions.goToPage(Pages.frontPage)) //goto start page again
    }
    // skal der håndteres hvis validUser.length > 1?
    else{
        alert("Kodeordet eller brugernavnet er indtastet forkert") //substitute alert med toast.error, når toast fungerer
        setUsername('')
        setPassword('')
    }
  }

  //username: allowed characters are integers and upper/lowercase letters
  function checkValidUsername(){
		const usernameRegex = /^[a-zA-Z0-9]+$/; 
		const isValidUsername = usernameRegex.exec(username);
		if (isValidUsername === null)		return false
    else														return true
  }
  
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

    //Substitute linjerne med alert til toast.error, når toast virker
    if(existsUser.length > 0)                   alert("Brugernavnet er allerede taget.") 
    else if (checkValidUsername() === false)	 	alert("Brugernavnet er invalid, da det kun må bestå af bogstaver og tal.")
    else if (checkValidPassword() === false)		alert("Kodeordet skal bestå af mindst et tal, et stort bogstav, et lille bogstav og være mellem 6 og 20 characters langt uden brug af specielle characters.")
    
    else{
        dispatch(userActions.addUser([username, password, []]))
        setCreatingAccount(false)
        document.getElementById("checkbox").checked = false
        setUsername('')
        setPassword('')
        alert("Din bruger er nu tilføjet til databasen!") //substitute alert med toast.error, når toast fungerer
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
            <form className='LoginForm' onSubmit={handleSubmit}>
							<img src={leftArrow} alt="Back Arrow" id='backarrow' onClick={handleBackArrow}/>
                <div className='imgcontainer'>
                    <img src={avatarIcon} alt='Avatar' className='avatar'/>
                    <h3> Login/Tilføj Bruger
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