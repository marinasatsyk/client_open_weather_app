//************** */
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import   {FC, useContext, useEffect, useState} from 'react';
import store, { RootState } from '../../store';
import { getUserPending,  stopUserPending,  getUserSuccess,  getUserFail,  logout, setAuth } from "../../store/features/UserSlice";

import AuthComponent from '../AuthComponent';

import UserService from '../../services/UserSevice';
import "./index.scss";
import HeaderConnectionComponent from '../HeaderConnection';



const  MainComponent:FC<{}>  = () =>  {

  const {isLoading, isAuth } = useSelector ((state: RootState) => state.auth)

  useEffect(() => {
    if(localStorage.getItem('token') || sessionStorage.getItem('token')){
       UserService.checkAuth()
    }
  }, [])
  

  if (isLoading === undefined || isAuth === undefined) {
    return <div>Loading...</div>  
  }

  if(isLoading){
    return <div>Loading...</div>
  }

  if(!isAuth){
      return(
        <>
          <HeaderConnectionComponent/>
          <main className='connection-wrap'>
            <AuthComponent/>
          </main>
        </>
        )
  }

  return(
    <div>
      Vous êtes connecté
    </div>
  )

  // return (
  //   <>
  //   <div >
  //     <h1>{isAuth ? `User is authorized ${user.email}` : 'LOGIN'}</h1>
  //     <h1>{user.isActivated ? `Account is activated` : `Account doesn't activate`}</h1>
  //   </div>
  //   <button onClick={() => {logout()}}>Logout</button>
  //   <button onClick={getUsers}>get all users</button> 

  //   {users?.map(user => {
  //     return (<div key={user.email} >{user.email}</div>)
  //   })} 
  //   </>
  // );
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
