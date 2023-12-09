import { useNavigate } from "react-router-dom";

const UserAdmin =() => {
  const navigate = useNavigate();

  const getUser =( idUser: String) => {
    navigate(`edit/${idUser}`)
  }
  
  
  return (
    <div className="wrap">
      <div className='user-admin'>UserAdmin</div>
      <button onClick={() => getUser("4")}>BTN</button>
    </div>
  )
}

export default UserAdmin;
