import React from 'react';
import  {createPortal} from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import './index.scss';

interface ModalProps {
  isModalOpened: boolean;
  hide: () => void;
  children?: React.ReactNode;
}

export const CommonModalComponent: React.FC<ModalProps> = ({
  isModalOpened,
  hide,
  children,
}) =>
  isModalOpened
    ?createPortal(
        <>
          <div className="modal-container">
          < div className='main'>
                <FontAwesomeIcon 
                className='close-modal-icon' 
                title='close modal search' 
                aria-description='close button modal searche' 
                icon={icon({name: 'circle-xmark', style: 'regular'})  } 
                onClick={()=>hide()}
                /> 
            {children}
           </div>
          </div>
        </>,
        document.body
      )
    : null;
