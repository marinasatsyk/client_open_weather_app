import { Outlet } from "react-router-dom";
import "./index.scss";
import { SearchCityComponent } from "components/SearchCity";

// interface IModalProps {
//     show: boolean;
//     component: ReactComponentElement
// }

export default function ModalComponent() {
  return (
   <>


    <div className="modal-conteiner">
        <SearchCityComponent />
    </div> 

  
   </> 
  )
}
