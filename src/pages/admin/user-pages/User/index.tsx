import { Bookmark } from "common/interfaces/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { getAllUsers } from "store/thunks/admin";
import { UseAppSelector } from "utils/hook";
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
      dispatch(getAllUsers());
    }
    setTimeout(() => {}, 500);
  }, []);

  const getUser = () => {
    navigate(`edit`);
  };

  return (
    <div className="wrap-user-admin-container">
      <button onClick={() => getUser()}>Edit User</button>
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
                  <span className="description-user">User ID</span>
                  <span className="content"> {user._id}</span>
                </div>
                <div className="wrap-item-user-info">
                  <div className="mail-part">
                    <span className="description-user">Email</span>
                    <span className="content"> {user.email}</span>
                  </div>
                  <div className="bage">
                    {user.isActivated ? "Confirmed" : "Not confirmed"}
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
                  <BookmarksComponent bookmarks={user.bookmarks} />
                </section>

                <button className="modify">Modify User</button>
                <button className="delete">Delete User</button>
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
          <article key={index}>
            <div className="bookmark-city">ID City: {`${bookmark.city}`}</div>
            <div className="bookmark-city">
              Is User follow his history : {bookmark.isFollowHistory}
            </div>
            <div className="bookmark-city">
              Is this City is active: {bookmark.isActive}
            </div>
          </article>
        ))}
    </>
  );
};

export default UserAdmin;
