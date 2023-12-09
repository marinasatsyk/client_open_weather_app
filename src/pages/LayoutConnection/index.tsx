import HeaderConnectionComponent from '../../components/Headers/HeaderConnection';
import { Outlet } from 'react-router-dom';
import "./index.scss";


const  LayoutConnection  = () =>  {
      return(
        <>
          <HeaderConnectionComponent/>
          <main className='connection-wrap'>
            <Outlet />
          </main>
        </>
        )
}
export default LayoutConnection




  

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
