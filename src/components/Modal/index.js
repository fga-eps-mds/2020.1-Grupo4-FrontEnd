import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Button from '../Button';
import { selectModalHidden } from '../../slices/modalSlice'
import './style.scss'

function Modal({ id='modal', onClose = () => {}, onConfirm = () => {}, title, closeMessage, confirmMessage, children, hidden, ...otherProps }) {

  const handleOutsideClick = event => {
    if (event.target.id === id) onClose()
  }

  return (
    hidden
    ? null
    :
    <div id={id} className="custom-modal" onClick={handleOutsideClick} {...otherProps}>
      <div className="custom-modal__container">
        <div className="content">
          <h2 className="content--title">{title}</h2>
          <span>{children}</span>
        </div>
        <div className="buttons">
          <Button onClick={onClose} inverted shadow>{closeMessage}</Button>
          {confirmMessage ? <Button onClick={onConfirm} inverted shadow>{confirmMessage}</Button> : null}
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  onConfirm: false,
  confirmMessage: "",
  id: "modal"
};

Modal.propTypes = {
  id: PropTypes.string,
  hidden: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  closeMessage: PropTypes.string.isRequired,
  onClose: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
  confirmMessage: PropTypes.string,
  onConfirm: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

const mapStateToProps = state => ({
  hidden: selectModalHidden(state)
});

export default connect(mapStateToProps)(Modal);
