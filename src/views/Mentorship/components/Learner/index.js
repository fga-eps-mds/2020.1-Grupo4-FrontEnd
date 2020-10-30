import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loading, fetchingMentor, selectMentor, selectMentorRequest }  from '../../../../slices/learnerSlice';
import { assignMentor, cancelMentorRequest, unassignMentor, getMentor  } from '../../../../services/learnersService';
import Card from '../../../../components/Card';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import Loader from '../../../../components/Loader';
import { toggleModalVisible } from '../../../../slices/modalSlice';

/* eslint-disable no-shadow */
function Learner({ loading, fetchingMentor, mentor, getMentor, assignMentor, unassignMentor, mentorRequest, cancelMentorRequest, toggleModalVisible }) {
  useEffect(() => {
    getMentor()
  }, []);

  const unassign = () => {
    toggleModalVisible()
    unassignMentor()
  };

  return (
    <div className="learner">
      <div className="learner__content">
        {mentor ? (
        <>
          {fetchingMentor && <Loader big />}
          <Card
            title='Seu Mentor'
            mainContent={`${mentor?.name} ${mentor?.lastname}`}
            secondaryContent={mentor?.email}
            deleteActionMessage='Desvincular'
            deleteAction={() => {
              toggleModalVisible()
            }}
          />
          <Modal
            title={`Desvincular ${mentor.name}`}
            confirmMessage='desvincular'
            closeMessage='cancelar'
            onClose={() => toggleModalVisible()}
            onConfirm={() => unassign()}
          >
            <p>Que pena que essa relação não deu certo.</p>
            <p>Ao se desvincular de um monitor não podemos garantir que haverá outro monitor disponível.</p>
            <p>Você tem certeza que deseja fazer isso?</p>
          </Modal>
        </>
        ) : (
          <>
            {fetchingMentor && <Loader big />}
            {!fetchingMentor && <h5>Você não tem um mentor</h5>}
            {mentorRequest && <p>Será designado á você um mentor(a) assim que houver um disponível</p>}
            {mentorRequest ?
              <Button onClick={() => cancelMentorRequest()} shadow error>Cancelar solicitação</Button>
              :
              <Button onClick={() => assignMentor()} shadow disabled={mentorRequest}>
                Solicitar mentor
              </Button>
            }
            {loading && <Loader>Procurando mentor</Loader>}
          </>
        )}
      </div>
    </div>
  );
}

Learner.propTypes = {
  fetchingMentor: PropTypes.bool.isRequired,
  mentor: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getMentor: PropTypes.func.isRequired,
  assignMentor: PropTypes.func.isRequired,
  unassignMentor: PropTypes.func.isRequired,
  cancelMentorRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  mentorRequest: PropTypes.func.isRequired,
  toggleModalVisible: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: loading(state),
  fetchingMentor: fetchingMentor(state),
  mentor: selectMentor(state),
  mentorRequest: selectMentorRequest(state)
});

const mapDispatchToProps = (dispatch) => ({
  getMentor: () => dispatch(getMentor()),
  assignMentor: () => dispatch(assignMentor()),
  cancelMentorRequest: () => dispatch(cancelMentorRequest()),
  unassignMentor: () => dispatch(unassignMentor()),
  toggleModalVisible: () => dispatch(toggleModalVisible())
});

export default connect(mapStateToProps, mapDispatchToProps)(Learner);
