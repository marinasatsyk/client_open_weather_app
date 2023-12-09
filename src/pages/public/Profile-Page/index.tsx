import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import { UseAppSelector } from 'utils/hook';



const ProfileComponent = () => {
  const user = UseAppSelector((state) => state.auth);
  return (
    <div className="main-profil-component">
    <Link to={'/user/current'} className="nav-link link">
            <FontAwesomeIcon  icon={icon({name:'share-from-square', style:'solid'})} flip='horizontal' className="icon"/>
            {}
            <div  className="btn-link">My Profile</div>
    </Link>   
      <div>ProfileComponent</div>
    </div>
  )
}

ProfileComponent.propTypes = {}

export default ProfileComponent