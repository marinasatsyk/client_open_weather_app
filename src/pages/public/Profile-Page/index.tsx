import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UseAppSelector } from "utils/hook";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "store/thunks/auth";
import { deleteUser } from "store/thunks/user";
import auth from "store/slice/auth";
import BookmarksComponent from "pages/admin/BookmarksComponent";

import "./index.scss";
const ProfileComponent = () => {
  const { user, isLoading } = UseAppSelector((state) => state.auth);
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const [actionError, setActionError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserDashboard();
  }, []);

  const editUser = () => {
    navigate(`edit`);
  };

  const getUserDashboard = async () => {
    console.log("we start get user");
    try {
      await dispatch<any>(getUser());
    } catch (err: any) {
      setActionError(err);
    }
  };

  const onHandleDelete = async (e: { preventDefault: () => void }) => {
    const data = {
      userId: user.id,
    };
    try {
      const deletedStatus = await dispatch<any>(deleteUser(data));

      if (deleteUser.fulfilled.match(deletedStatus)) {
        setIsAccountDeleted(true);
        setTimeout(() => {
          setIsAccountDeleted(false);
        }, 3000);
        setTimeout(() => {
          sessionStorage.clear();
          localStorage.clear();
          navigate("/connection");
        }, 2000);
      } else if (deleteUser.rejected.match(deletedStatus)) {
        const error = (deletedStatus.payload as { error: string }).error;
        console.error("Erreur lors de la mise à jour", error);
        //@ts-ignore
        setActionError(error.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-profil-component">
      <h1>User Information</h1>
      <section className="user-section">
        <div
          className={`success delete ${
            isAccountDeleted ? "visible" : "hidden"
          }`}
        >
          Account deleted successfully
        </div>
        <div
          className={`success modify ${
            isAccountDeleted ? "visible" : "hidden"
          }`}
        >
          Account modified successfully
        </div>
        {actionError && <div className="error">{actionError}</div>}
        <h3 className="wrap-item-user-info">
          <span className="description-user">First Name:</span>

          <span className="content transform">{user.firstName}</span>
        </h3>
        <div className="wrap-item-user-info">
          <span className="description-user">Last Name:</span>
          <span className="content transform">{user.lastName}</span>
        </div>
        <div className="wrap-item-user-info">
          <span className="description-user">Email</span>
          <span className="content"> {user.email}</span>
        </div>
        <div className="btn-wrap-user">
          <button className="modify">
            <Link to={"/user/profile/edit"}>Edit User</Link>
          </button>

          <button className="delete" onClick={(e) => onHandleDelete(e)}>
            Delete User
          </button>
        </div>
      </section>
    </div>
  );
};

ProfileComponent.propTypes = {};

export default ProfileComponent;
