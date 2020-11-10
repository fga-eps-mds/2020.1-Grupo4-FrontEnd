import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { generateCertificate } from '../../../../services/certificatesServices';
import { selectTotalProgress } from '../../../../slices/tutorialSlice';
import Modal from '../../../../components/Modal';
import { toggleModalVisible } from '../../../../slices/modalSlice';
import Question from '../../../../components/Question';
import './style.scss';

/* eslint-disable no-shadow */
function TutorialActivity({ history, totalProgress, toggleModalVisible, generateCertificate }) {

  useEffect(() => {
    if (totalProgress === 100) {
      generateCertificate().then(() => toggleModalVisible());
    }
  }, [totalProgress]);

  return (
    <div className="learner-activity">
      <Question showResult />

      <Modal
        title="Curso concluído"
        confirmMessage="visualizar"
        closeMessage="cancelar"
        onClose={() => {
          toggleModalVisible();
        }}
        onConfirm={() => history.push(`/certificados`)}
      >
        <p>Parabéns, você concluiu o tutorial.</p>
        <p>
          Você poderá acessar o certificado a qualquer momento pela Dashboard.
        </p>
        <p>Clique em visualizar para ver seu certificado</p>
      </Modal>
    </div>
  );
}

TutorialActivity.propTypes = {
  toggleModalVisible: PropTypes.func.isRequired,
  totalProgress: PropTypes.number.isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  generateCertificate: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  totalProgress: selectTotalProgress(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleModalVisible: () => dispatch(toggleModalVisible()),
  generateCertificate: () => dispatch(generateCertificate())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TutorialActivity)
);
