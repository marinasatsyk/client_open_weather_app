import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Bookmark } from "common/interfaces/auth";

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
            <div className="bookmark-city">
              ID City: {`${bookmark.city._id}`}
            </div>
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

export default BookmarksComponent;
