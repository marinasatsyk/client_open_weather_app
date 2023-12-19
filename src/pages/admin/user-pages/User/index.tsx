import { Bookmark } from "common/interfaces/auth";
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

  const getUser = () => {
    navigate(`edit`);
  };

  return (
    <div className="wrap">
      <div className="user-admin">UserAdmin</div>
      <button onClick={() => getUser()}>Edit User</button>
      {params.uid &&
        users.map(
          (user) =>
            user._id === params.uid && (
              <section key={user._id}>
                <h1>First Name: {user.firstName}</h1>
                <div>Last Name: {user.lastName}</div>
                <div>User ID{user._id}</div>
                <div>Account activated: {user.isActivated ? "Yes" : "No"}</div>
                <div>Account activation link: {user.activationLink}</div>
                <div>Created DateTime: {user.createdDateTime}</div>
                <div>Role: {user.role}</div>
                <section className="user-bookmarks">
                  <h3>Bookmarks</h3>
                  <BookmarksComponent bookmarks={user.bookmarks} />
                </section>
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
