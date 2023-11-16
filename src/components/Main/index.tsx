//************** */
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import   {FC } from 'react';
import  { RootState } from '../../store';

import AuthComponent from '../AuthComponent';

import "./index.scss";
import HeaderConnectionComponent from '../HeaderConnection';
import {  useNavigate } from 'react-router-dom';


// const  MainComponent:FC<{}>  = () =>  {
const  MainComponent:FC  = () =>  {

  const { isAuth } = useSelector ((state: RootState) => state.auth)
      return(
        <>
          <HeaderConnectionComponent/>
          <main className='connection-wrap'>
            <AuthComponent/>
          </main>
        </>
        )
}

export default MainComponent




  

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


// MainComponent.propTypes = {}




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
