import React from 'react'
import avatarIcon from "../data/img_avatar2.png";

const LoginPage = () => {
  function submitAdd(event) {
    event.preventDefault()
  }
  return (
    <div className='App'>
        <div className='LoginPage'>
            <form className='LoginForm' onSubmit={submitAdd}>
                <div className='imgcontainer'>
                    <img src={avatarIcon} alt='Avatar' className='avatar'/>
                </div>

                <div className='container'>
                    <label><b>Brugernavn</b></label>
                    <input type="text" placeholder='Indtast brugernavn' required/>
                    
                    <label><b>Kodeord</b></label>
                    <input type="password" placeholder='Indtast kodeordet' required/>
                    
                    <button type="submit">Login</button>
                    <label>Husk mig: <input type="checkbox"></input></label>
                    <a href="#">Glemt kodeord?</a>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage