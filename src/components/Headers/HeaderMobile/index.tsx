import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { UseBookmarks, UseLogout } from "utils/hook";
import "./index.scss";

interface IHeaderMobile {
  // city: string,
  showSearchModal: () => void;
  showSettingsModal: () => void;
}

export default function HeaderMobile(props: IHeaderMobile) {
  const { showSearchModal, showSettingsModal } = props;
  const [elementActif, setElementActif] = useState<number | null>(null);
  const bookmarks = UseBookmarks();

  // const [activeCity, setIsActiveCity] = useState(
  //     bookmarks && bookmarks.find(bookmark => bookmark.isActive)
  //     ? `${bookmarks.find(bookmark => bookmark.isActive)?.city.name}, ${bookmarks.find(bookmark => bookmark.isActive)?.city.country}`
  //     : 'Paris, France');

  const handleClick = (index: number) => {
    setElementActif(index);

    switch (index) {
      case 1:
        // Comportement pour Élément 1
        console.log("Cliqué sur Élément 1");
        break;
      case 2:
        // Comportement pour Élément 2
        console.log("Cliqué sur Élément 2");
        break;
      case 3:
        // Comportement pour Élément 3
        console.log("Cliqué sur Élément 3");
        break;
      default:
        break;
    }
  };

  return (
    <header className="header-mobile">
      <nav>
        <div className="top-navigation-mobile">
          {/* <Link to={'/user/search-city'}> */}
          <div className="link-icon" onClick={() => showSearchModal()}>
            <FontAwesomeIcon icon={faLocationDot} className="icon icon-m" />
          </div>
          {/* </Link> */}

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
            onClick={() => handleClick(1)}
            className={elementActif === 1 ? "underligne" : ""}
          >
            <Link to={"/user/current"}>Today</Link>
          </li>
          {/* <li
            onClick={() => handleClick(2)}
            className={elementActif === 2 ? "underligne" : ""}
          >
            Forecast
          </li> */}

          <li
            onClick={() => handleClick(3)}
            className={elementActif === 3 ? "underligne" : ""}
          >
            <Link to={"/user/history"}>History</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
