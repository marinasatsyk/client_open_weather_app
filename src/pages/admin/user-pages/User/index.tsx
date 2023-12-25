import { Bookmark } from "common/interfaces/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useNavigate,
  useSearchParams,
  useParams,
  Link,
} from "react-router-dom";
import { deleteUserAdmin, getAllUsers, getUserAdmin } from "store/thunks/admin";
import { UseAppSelector } from "utils/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import "./index.scss";
import { IUserId } from "common/interfaces/current";

const UserAdmin = () => {
  const { adminUser, error, stateRes } = UseAppSelector((state) => state.admin);

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

  const onHandleDelete = (e: { preventDefault: () => void }) => {
    if (params.uid && params.uid !== "") {
      const data = {
        userId: params.uid,
      };
      dispatch<any>(deleteUserAdmin(data));

      if (!error.message && stateRes.success) {
        console.log("user deleted");
        // navigate(`/admin/dashboard`);
      }
    }
  };

  return (
    <div className="wrap-user-admin-container">
      <h1>User Information</h1>
      <section className="user-section">
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
          <button className="modify" onClick={() => getUser()}>
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

interface BookmarksComponentProps {
  bookmarks: Bookmark[];
}

const BookmarksComponent: React.FC<BookmarksComponentProps> = (props) => {
  const { bookmarks } = props;
  console.log(bookmarks);
  return (
    <>
      {bookmarks.length > 0 &&
        bookmarks.map((bookmark, index) => (
          <article key={index} className="wrap-bookmark">
            <div className="bookmark-city">ID City: {`${bookmark.city}`}</div>
            {bookmark.isFollowHistory && (
              <span className="history-mark" title="user follow history data">
                <FontAwesomeIcon
                  icon={icon({ name: "helicopter-symbol", style: "solid" })}
                />
              </span>
            )}
            {bookmark.isActive && (
              <span className="active-mark" title="current active city">
                <FontAwesomeIcon icon={icon({ name: "a", style: "solid" })} />
              </span>
            )}
          </article>
        ))}
    </>
  );
};

export default UserAdmin;
