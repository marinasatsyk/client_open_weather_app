import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

// import "./index.scss";
import { Link, useNavigate } from 'react-router-dom';

interface iHeaderScrin {
  isShowSideMenu: boolean;
  toggleSideMenu: () => void;
}


function HeaderAdmin({isShowSideMenu, toggleSideMenu}: iHeaderScrin) {
  const navigate = useNavigate();

  const handleLogout = () => {
      console.log("logout")
      sessionStorage.clear();
      localStorage.clear();
      navigate("/connection")
  }
  return (
    <header className='header-screen'>
       <div className="wrap-icons-screen-header">
          <FontAwesomeIcon  
          icon={icon({name:'bars', style:'solid'})} 
          className="icon" onClick={toggleSideMenu}
          title='sidebar'
          />
          
          <Link to="dashboard">
            <FontAwesomeIcon  
              icon={icon({name:'house', style:'solid'})} 
              className="icon"
              title='home'
            />
          </Link>
       </div>

      <div className="wrap-header">
        <h1>Admin</h1>
      </div>
      <div className="icons-menu">
          <FontAwesomeIcon  
            icon={icon({name:'circle-user', style:'solid'})} 
            className="icon"
            title='profile'
          />
          
          <FontAwesomeIcon 
            onClick={() => handleLogout()}  
            icon={icon({name:'person-walking-arrow-right', style:'solid'})} 
            className="icon"
            title='logout'
          />
      </div>
    </header>
  )
}


export default  HeaderAdmin;