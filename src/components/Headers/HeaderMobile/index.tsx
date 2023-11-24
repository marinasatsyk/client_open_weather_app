import {FC,  useState, ChangeEvent, useEffect, MouseEvent} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{faLocationDot, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import "./index.scss";
import { Link } from 'react-router-dom';

interface IHeaderMobile {
  city: string
}

export default function HeaderMobile(props:IHeaderMobile) {
  const {city} = props;
  const [elementActif, setElementActif] = useState<number | null>(null);
  const [isModal, setIsModal] = useState(false);

  const handleClick = (index:number) => {
    
    setElementActif(index);

    switch (index) {
      case 1:
        // Comportement pour Élément 1
        console.log('Cliqué sur Élément 1');
        break;
      case 2:
        // Comportement pour Élément 2
        console.log('Cliqué sur Élément 2');
        break;
      case 3:
        // Comportement pour Élément 3
        console.log('Cliqué sur Élément 3');
        break;
      default:
        break;
    }
  }

  const showModal = () => {
    setIsModal(!isModal)
  }


  

  return (
    <header className="header-mobile">
      <nav >
        <div className="top-navigation-mobile">
          
          {/* <Link to={'/user/search-city'}> */}
            <div className='link-icon' onClick={() => showModal()}>
              <FontAwesomeIcon icon={faLocationDot} className="icon icon-m"/>
            </div>
          {/* </Link> */}

          <div>
            <h2>{city}</h2>
          </div>

          <div className='link-icon'>
            <FontAwesomeIcon icon={faEllipsisVertical} className="icon icon-m"/>
          </div>

        </div>

        <ul className="bottom-nav-mobile">
          <li onClick={() => handleClick(1)} className={elementActif === 1 ? 'underligne' : ''}>Today</li>
          <li onClick={() => handleClick(2)} className={elementActif === 2 ? 'underligne' : ''}>Forecast</li>
          <li onClick={() => handleClick(3)}className={elementActif === 3 ? 'underligne' : ''}>History</li>
        </ul>
      </nav>
      
    </header>
  
  )
}
