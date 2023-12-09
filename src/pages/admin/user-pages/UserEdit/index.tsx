import { useParams } from "react-router-dom"

const UserAmdinEdit = () => {
  let params = useParams();

  const {uid} = params;
  console.log("params", uid)
  return (
    <div className='user-admin-edit'>UserAmdinEdit</div>
  )
}

export default UserAmdinEdit