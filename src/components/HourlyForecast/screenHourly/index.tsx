import { UseAppSelector } from "utils/hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { format } from 'date-fns';
import './index.scss';
import { useState } from "react";




function ScreenHourlyForecastComponent() {
  const [elementActif, setElementActif] = useState<number>(1);

  const handleClickMenuActive = (index:number) => {
    
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

  return(
    <div className="wrap-screen-container">
      <div className="side-menu">
        <div className={`temp icon-container ${elementActif === 1 ? 'active-icon' : ''}`} title="temp">
          <FontAwesomeIcon   icon={icon({name: 'temperature-high', style:'solid'}) } />
        </div>
        <div className={`precipitation icon-container ${elementActif === 2 ? 'active-icon' : ''}`} title="precipitation">
          <FontAwesomeIcon   icon={icon({name: 'cloud-showers-heavy', style:'solid'}) } />
        </div>
        <div className={`wind icon-container ${elementActif === 3 ? 'active-icon' : ''}`} title="wind">
        <FontAwesomeIcon icon={icon({name: 'wind', style:'solid'})}/>
        </div>
        <div className={`pressure icon-container ${elementActif === 4 ? 'active-icon' : ''}`} title="pressure">
          <FontAwesomeIcon icon={icon({name: "arrows-down-to-line", style: "solid"})}/> 
        </div>
        <div className={`humidity icon-container ${elementActif === 5 ? 'active-icon' : ''}`} title="humidity">
          <FontAwesomeIcon icon={icon({name: "droplet", style: "solid"})}/> 
        </div>
        <div className={`visibility icon-container ${elementActif === 6 ? 'active-icon' : ''}`} title="visibility">
          <FontAwesomeIcon icon={icon({name: 'eye', style:'solid'})}/>
        </div>
        <div className={`quality icon-container ${elementActif === 7 ? 'active-icon' : ''}`} title="quality">AQI</div>
        <div className={`felt icon-container ${elementActif === 8 ? 'active-icon' : ''}`} title="felt">
          <FontAwesomeIcon icon={icon({name: 'user-pen', style:'solid'})} />
        </div>
      </div>
      <div className="main-container-screen-hourly">
        <h2>Hourly Forecast</h2>
        <div className="chart-container">
          Chart
        </div>
      </div>
    </div>
  )
}

export default ScreenHourlyForecastComponent