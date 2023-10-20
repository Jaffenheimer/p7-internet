import React, { useState } from 'react'
import avatarIcon from "../data/img_avatar2.png";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../features/userSlice";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import toast from 'react-hot-toast';

//HUSK AT TILFØJE PROFILE ICON TILBAGE NÅR LOGGED IN CONTAINERRIGHT

const LoginPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [creatingAccount, setCreatingAccount] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChangeUsername = (event) => setUsername(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleChangeCheckbox = ()      => setCreatingAccount(!creatingAccount);

  function handleLogin(){
    const validUser = users.filter(
        (user) => user.username === username && user.password === password
    )
    
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
  
  function checkValidUsername(){
    return true
  }
  
  function checkValidPassword(){
    return true
  }

  function handleCreateAccount(){
    const existsUser = users.filter(
        (user) => user.username === username
    )
    
    //Substitute linjerne med alert til toast.error, når toast virker
    if(existsUser.length > 0)                   alert("Brugernavnet er allerede taget.") 
    else if (checkValidUsername() == false)     alert("Brugernavnet er invalid.")
    else if (checkValidPassword() == false)     alert("Kodeordet er invalid.")
    
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

  return (
    <div className='App'>
        <div className='LoginPage'>
            <form className='LoginForm' onSubmit={handleSubmit}>
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