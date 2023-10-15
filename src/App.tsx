import React,  {FC, useContext, useEffect, useState} from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import { Context } from './index';
import {observer} from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserSevice';

const  App : FC  = () =>  {
  const {store}  = useContext(Context);
  const [users, setUsers] = useState<IUser[]>();

  useEffect(() => {
    if(localStorage.getItem('token')){
      store.checkAuth()
    }
  }, [])
  
if(store.isLoading){
  return <div>Loading</div>
}


async function getUsers(){
  try{
    const response = await UserService.fetchUsers();
    setUsers(response.data)
  }catch(er){
    console.log(er)
  }
}

  if(!store.isAuth){
  return(
    <>
    <LoginForm/>
    <button onClick={getUsers}>get all users</button>
    </>

    )
}


  return (
    <>
    <div >
      <h1>{store.isAuth ? `User is authorized ${store.user.email}` : 'LOGIN'}</h1>
      <h1>{store.user.isActivated ? `Account is activated` : `Account doesn't activate`}</h1>
    </div>
    <button onClick={() => {store.logout()}}>Logout</button>
    <button onClick={getUsers}>get all users</button>

    {users?.map(user => {
      return (<div key={user.email} >{user.email}</div>)
    })}
    </>
  );
}

export default observer(App) ;
