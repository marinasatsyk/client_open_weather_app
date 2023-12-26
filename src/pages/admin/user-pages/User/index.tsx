import { Bookmark } from "common/interfaces/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useNavigate,
  useSearchParams,
  useParams,
  Link,
} from "react-router-dom";
import { deleteUserAdmin, getUserAdmin } from "store/thunks/admin";
import { UseAppSelector } from "utils/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import "./index.scss";
import { IUserId } from "common/interfaces/current";
import BookmarksComponent from "../../BookmarksComponent";

const UserAdmin = () => {
  const { adminUser } = UseAppSelector((state) => state.admin);
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const [actionError, setActionError] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(params);

  const getCurrentUser = async (userId: IUserId) => {
    await dispatch<any>(getUserAdmin(userId));
  };

  useEffect(() => {
    if (params.uid && params.uid !== "") {
      let userId: string = params.uid;
      let userIdObject: IUserId = { userId };
      getCurrentUser(userIdObject);
    }
  }, []);

  const getUser = () => {
    navigate(`edit`);
  };

  const onHandleDelete = async (e: { preventDefault: () => void }) => {
    if (params.uid && params.uid !== "") {
      const data = {
        userId: params.uid,
      };
      try {
        const deletedStatus = await dispatch<any>(deleteUserAdmin(data));
        if (deleteUserAdmin.fulfilled.match(deletedStatus)) {
          setIsAccountDeleted(true);
          setTimeout(() => {
            setIsAccountDeleted(false);
          }, 3000);
          setTimeout(() => {
            navigate(`/admin/dashboard`);
          }, 2000);
        } else if (deleteUserAdmin.rejected.match(deletedStatus)) {
          const error = (deletedStatus.payload as { error: string }).error;
          console.error("Erreur lors de la mise à jour", error);
          //@ts-ignore
          setActionError(error.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="wrap-user-admin-container">
      <h1>User Information</h1>
      <section className="user-section">
        <div
          className={`success delete ${
            isAccountDeleted ? "visible" : "hidden"
          }`}
        >
          Account deleted successfully
        </div>
        {actionError && <div className="error">{actionError}</div>}
        <h3 className="wrap-item-user-info">
          <span className="description-user">First Name:</span>

          <span className="content transform">{adminUser.firstName}</span>
        </h3>
        <div className="wrap-item-user-info">
          <span className="description-user">Last Name:</span>
          <span className="content transform">{adminUser.lastName}</span>
        </div>
        <div className="wrap-item-user-info">
          <span className="description-user">Email</span>
          <span className="content"> {adminUser.email}</span>
          <div className="bage">
            {adminUser.isActivated ? (
              <span>Activated</span>
            ) : (
              <span>Not activated</span>
            )}
          </div>
        </div>
        <div className="wrap-item-user-info">
          <span className="description-user">Account activation link:</span>
          <span className="content">{adminUser.activationLink}</span>
        </div>
        <div className="wrap-item-user-info">
          <span className="description-user">Created DateTime:</span>
          <span className="content"> {adminUser.createdDateTime}</span>
        </div>

        <div className="wrap-item-user-info">
          <span className="description-user">Role:</span>
          <span className="content">{adminUser.role}</span>
        </div>
        <section className="user-bookmarks">
          <h3>Bookmarks</h3>
          {adminUser.bookmarks.length ? (
            <BookmarksComponent bookmarks={adminUser.bookmarks} />
          ) : (
            <div>No bookmarks</div>
          )}
        </section>

        <div className="btn-wrap-user">
          <button className="modify">
            <Link to={"edit"}>Edit User</Link>
          </button>
          {/* <button
                    className="disconnect"
                     onClick={(e) => onDisconnect(e)}
                  >
                    Disconnect
                  </button> */}
          {/* <button
                    className="blackList"
                     onClick={(e) => onDisconnect(e)}
                  >
                    BlackList
                  </button> */}
          <button className="delete" onClick={(e) => onHandleDelete(e)}>
            Delete User
          </button>
        </div>
      </section>
    </div>
  );
};

export default UserAdmin;
