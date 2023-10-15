import React, {FC, useContext, useState} from 'react'
import { Context } from '..';
import {observer} from 'mobx-react-lite';


const  LoginForm: FC = () =>  {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    const {store} = useContext(Context)

  return (
    <div>
        <input 
        value={email}
        onChange={e=> setEmail(e.target.value)} 
        type="text" 
        placeholder='Email'
        />
        <input 
        value={password}
        onChange={e=> setPassword(e.target.value)} 
        type="password" 
        placeholder='Password'
        />
        <input 
        value={firstName}
        onChange={e=> setFirstName(e.target.value)} 
        type="text" 
        placeholder='First Name'
        />
        <input 
        value={lastName}
        onChange={e=> setLastName(e.target.value)} 
        type="text" 
        placeholder='Last Name'
        />

        <button onClick={() =>  store.login(email, password)}>Login</button>
        <button onClick={() =>  store.registration(email, password, firstName, lastName)}>Register</button>
    </div>
  )
}

export default observer(LoginForm)