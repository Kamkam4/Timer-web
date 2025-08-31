import React, { useEffect, useRef, type ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';
import { FiX } from 'react-icons/fi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  // useEffect, რომელიც ამატებს "Escape" ღილაკზე დაჭერით დახურვის ფუნქციონალს
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="modal-fade"
      unmountOnExit
      nodeRef={modalRef}
    >
      <div className="modal-wrapper" ref={modalRef}>
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-content">
          <button className="modal-close-btn" onClick={onClose}>
            <FiX size={24} />
          </button>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;