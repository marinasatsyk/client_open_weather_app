import { Bookmark } from "common/interfaces/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { getAllUsers } from "store/thunks/admin";
import { UseAppSelector } from "utils/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import "./index.scss";
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
      // dispatch(getAllUsers());
    }
    setTimeout(() => {}, 500);
  }, []);

  const getUser = () => {
    navigate(`edit`);
  };

  return (
    <div className="wrap-user-admin-container">
      <h1>User Information</h1>
      {params.uid &&
        users.map(
          (user) =>
            user._id === params.uid && (
              <section key={user._id} className="user-section">
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
                  <div className="bage">
                    {user.isActivated ? (
                      <span>Activated</span>
                    ) : (
                      <span>Not activated</span>
                    )}
                  </div>
                </div>
                <div className="wrap-item-user-info">
                  <span className="description-user">
                    Account activation link:
                  </span>
                  <span className="content">{user.activationLink}</span>
                </div>
                <div className="wrap-item-user-info">
                  <span className="description-user">Created DateTime:</span>
                  <span className="content"> {user.createdDateTime}</span>
                </div>

                <div className="wrap-item-user-info">
                  <span className="description-user">Role:</span>
                  <span className="content">{user.role}</span>
                </div>
                <section className="user-bookmarks">
                  <h3>Bookmarks</h3>
                  {user.bookmarks.length ? (
                    <BookmarksComponent bookmarks={user.bookmarks} />
                  ) : (
                    <div>No bookmarks</div>
                  )}
                </section>

                <div className="btn-wrap-user">
                  <button className="modify" onClick={() => getUser()}>
                    Edit User
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
                  <button className="delete">Delete User</button>
                </div>
              </section>
            )
        )}
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
