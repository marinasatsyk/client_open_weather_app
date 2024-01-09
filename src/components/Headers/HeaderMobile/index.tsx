import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { UseBookmarks } from "utils/hook";
import "./index.scss";

interface IHeaderMobile {
  showSearchModal: () => void;
  showSettingsModal: () => void;
}

export default function HeaderMobile(props: IHeaderMobile) {
  const { showSearchModal, showSettingsModal } = props;
  const bookmarks = UseBookmarks();
  const location = useLocation();

  return (
    <header className="header-mobile">
      <nav>
        <div className="top-navigation-mobile">
          <div className="link-icon" onClick={() => showSearchModal()}>
            <FontAwesomeIcon icon={faLocationDot} className="icon icon-m" />
          </div>

          <div>
            <h2>
              {bookmarks && bookmarks.find((bookmark) => bookmark.isActive)
                ? `${
                    bookmarks.find((bookmark) => bookmark.isActive)?.city.name
                  }, ${
                    bookmarks.find((bookmark) => bookmark.isActive)?.city
                      .country
                  }`
                : "Paris, France"}
            </h2>
          </div>

          <div className="link-icon" onClick={() => showSettingsModal()}>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="icon icon-m"
            />
          </div>
        </div>

        <ul className="bottom-nav-mobile">
          <li
            className={
              location.pathname.includes("current") ? "underligne" : ""
            }
          >
            <Link to={"/user/current"}>Today</Link>
          </li>

          <li
            className={
              location.pathname.includes("history") ? "underligne" : ""
            }
          >
            <Link to={"/user/history"}>History</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
