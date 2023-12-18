import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { getAllUsers } from "store/thunks/admin";
import { UseAppSelector } from "utils/hook";

const UserAdmin = () => {
  const { adminUser, users } = UseAppSelector((state) => state.admin);
  const { user } = UseAppSelector((state) => state.auth);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(params);
  useEffect(() => {
    //@ts-ignore
    if (user.role === "root") {
      //@ts-ignore
      dispatch(getAllUsers());
    }
    setTimeout(() => {}, 500);
  }, []);

  const getUser = (idUser: String) => {
    navigate(`edit/${idUser}`);
  };

  return (
    <div className="wrap">
      <div className="user-admin">UserAdmin</div>
      <button onClick={() => getUser("4")}>BTN</button>
      {params.uid &&
        users.map(
          (user) =>
            user._id === params.uid && (
              <React.Fragment key={user._id}>
                <h1>{user.firstName}</h1>
                <div>{user.lastName}</div>
              </React.Fragment>
            )
        )}
    </div>
  );
};

export default UserAdmin;
