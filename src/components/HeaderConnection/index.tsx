import LogoImg from '../../assets/images/logo-app.png';
import   {FC} from 'react';
import './index.scss';


const  HeaderConnectionComponent:FC = () => {
  return (
    <>
    <header>
      <div className="wrap-header">
        <h2 className='header-block-one'>Weather</h2>
        <div className='header-block-two'>Forecast</div>
        <div className="header-block-three">
          <div className='empty flex'></div>
          <div className='third-logo flex'>& history </div>
        </div>
      </div>
      <div className="header-block-four">
          <div className="wrap-img-logo flex">
            <img src={LogoImg} alt="logo " className='logo-app-img'/>
          </div>
          {/* <div className='empty flex'></div> */}
        </div>
    </header>
    </>
  )
}

export default HeaderConnectionComponent
