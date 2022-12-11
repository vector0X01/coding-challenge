import clsx from 'clsx';
import React, { useEffect } from 'react';
import CloseIcon from '../../assets/closeIcon.svg';
import './style.css';

const Modal = (props) => {
  const { onClose, title, children, show, filter, handleScroll } = props;
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <div className={clsx('modal', { 'show-modal': show })} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
          <img className="close-icon" src={CloseIcon} alt="close" onClick={onClose} />
        </div>
        {filter ? <div className="modal-filter">{filter()}</div> : null}
        <div className="modal-body" onScroll={handleScroll}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
