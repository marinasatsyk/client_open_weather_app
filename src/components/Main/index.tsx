//************** */
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import   {FC, useContext, useEffect, useState} from 'react';
import store, { RootState } from '../../store';
import { getUserPending,  stopUserPending,  getUserSuccess,  getUserFail,  logout, setAuth } from "../../store/features/UserSlice";

import LoginForm from '../LoginForm';
import { SearchCityComponent } from '../SearchCity';

import { IUser } from '../../models/IUser';
import UserService from '../../services/UserSevice';
// import MainComponent from './components/Main';
// import { useSelector } from 'react-redux';

import './App.css';

interface someInfo {
    first: string
    second: string
}

function MainComponent(props: someInfo | null) {

  const {user, isLoading, isAuth } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if(localStorage.getItem('token') || sessionStorage.getItem('token')){
       UserService.checkAuth()
    }
  }, [])
  
if(isLoading){
  return <div>Loading</div>
}

  if(!isAuth){
  return(
    
     <>
    <LoginForm/>
    </>
    )
}


  return (
    <>
    <div >
      <h1>{isAuth ? `User is authorized ${user.email}` : 'LOGIN'}</h1>
      <h1>{user.isActivated ? `Account is activated` : `Account doesn't activate`}</h1>
    </div>
    <button onClick={() => {logout()}}>Logout</button>
    {/* <button onClick={getUsers}>get all users</button> */}

    {/* {users?.map(user => {
      return (<div key={user.email} >{user.email}</div>)
    })} */}
    </>
  );
}

MainComponent.propTypes = {}

export default MainComponent


  // const [users, setUsers] = useState<IUser[]>();

  // <button onClick={getUsers}>get all users</button> 
 
    // <MainComponent/>
// <>
    // <main>
    //   <SearchCityComponent />
    // </main>
    // </>
    //TO RESTORE
/* For admin
async function getUsers(){
  try{
    const response = await UserService.fetchUsers();
    setUsers(response.data)
  }catch(er){
    console.log(er)
  }
}*/
