import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Card from '../../../../components/Card';
import { getLearners, assignLearner, unassignLearner, changeAvailability } from '../../../../services/mentorsService';
import {
  selectLearners,
  selectAvailability,
  loading,
  fetchingLearners,
  removeLearner,
} from '../../../../slices/mentorSlice'
import { selectCurrentUser } from '../../../../slices/usersSlice'
import Button from '../../../../components/Button'
import Loader from '../../../../components/Loader';
import Modal from '../../../../components/Modal';
import './style.scss';

/* eslint-disable no-shadow */
function Mentor({ getLearners, assignLearner, unassignLearner, isAvailable, changeAvailability, removeLearner, learnersList, loading, fetchingLearners, currentUser }) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [learnerToRemoval, setLearnerToRemoval] = useState()

  useEffect(() => {
    getLearners()
  }, [])

  const unassign = (learner) => {
    setIsModalVisible(false)
    unassignLearner(learner._id)
    removeLearner(learner._id)
  }

  return (
    <div className="mentor">
      {currentUser.isValidated ?
        (<>
          <div className="mentor__header">
            <span className="mentor__header-title">Meus aprendizes</span>
            <Button
              shadow
              small
              error={isAvailable}
              success={!isAvailable}
              onClick={() => changeAvailability()}
            >
              {isAvailable ?
                'Ficar indisponível' : 'Aceitar novos aprendizes'
              }
            </Button>
          </div>
          <div className="mentor__content">
            {learnersList.length ?
              <>
                {fetchingLearners && <Loader big />}
                {learnersList.map(learner =>
                    <Card
                      key={learner._id}
                      title={`${learner.name  } ${  learner.lastname}`}
                      mainContent={learner.email}
                      deleteAction={() => {
                        setLearnerToRemoval(learner)
                        setIsModalVisible(true)
                      }}
                      secondaryContent={`Módulos concluídos: ${learner.completedModules.length}`} />
                )}
                {isModalVisible ?
                  <Modal
                    title={`Desvincular ${learnerToRemoval.name}`}
                    confirmMessage='desvincular'
                    closeMessage='cancelar'
                    onClose={() => {
                      setIsModalVisible(false)
                      setLearnerToRemoval(null)
                    }}
                    onConfirm={() => unassign(learnerToRemoval)}
                  >
                    <p>Que pena que essa relação não deu certo.</p>
                    <p>Você tem certeza que deseja fazer isso?</p>
                  </Modal>
                  :
                  null}
              </>
              :
              <>
                {fetchingLearners && <Loader big />}
                {!fetchingLearners && <h5>Você não possui nenhum aprendiz</h5>}
              </>
            }
          </div>

          <div className="mentor__action">
            <Button
              shadow
              onClick={assignLearner}
            >
              Solicitar aprendiz
            </Button>
            {loading && <Loader> Procurando aprendiz </Loader>}
          </div>
        </>)
        :
        (<span className="mentor__header-title">
          Você ainda não foi validado para ser mentor, assim que validado poderá solicitar um aprendiz.
        </span>)
      }
    </div>
  );
}

Mentor.propTypes = {
  currentUser: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.object
  ]).isRequired,
  isAvailable: PropTypes.bool.isRequired,
  getLearners: PropTypes.func.isRequired,
  assignLearner: PropTypes.func.isRequired,
  fetchingLearners: PropTypes.bool.isRequired,
  loading:  PropTypes.bool.isRequired,
  learnersList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  changeAvailability: PropTypes.func.isRequired,
  removeLearner: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAvailable: selectAvailability(state),
  learnersList: selectLearners(state),
  loading: loading(state),
  fetchingLearners: fetchingLearners(state),
  currentUser: selectCurrentUser(state)
})

const mapDispatchToProps = dispatch => ({
  getLearners: () => dispatch(getLearners()),
  assignLearner: () => dispatch(assignLearner()),
  removeLearner: learnerID => dispatch(removeLearner(learnerID)),
  unassignLearner: learnerID => dispatch(unassignLearner(learnerID)),
  changeAvailability: () => dispatch(changeAvailability())
})

export default connect(mapStateToProps, mapDispatchToProps)(Mentor);