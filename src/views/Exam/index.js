import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, useRouteMatch, useHistory } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  selectTotalAnswers,
  selectQuestionsList,
} from '../../slices/tutorialSlice';
import { getProgress as getProgressImport } from '../../services/tutorialServices';
import { validateMentor as validateMentorImport } from '../../services/mentorsService';
import { selectValidationAttempts } from '../../slices/mentorSlice';
import { toggleModalVisible as toggleModalVisibleImport } from '../../slices/modalSlice';
import { selectCurrentUser } from '../../slices/usersSlice';
import ActivitiesList from '../Tutorial/components/ActivitiesList';
import ExamQuestion from './components/ExamQuestion';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import ExamRules from './components/ExamRules';
import './style.scss';
import MotionDiv from '../../UI/animation/MotionDiv';
import RouteTransition from '../../UI/animation/RouteTransition.jsx'; // eslint-disable-line import/extensions

/* eslint-disable no-shadow */
function Exam({
  validateMentor,
  currentUser,
  attempts,
  getProgress,
  totalAnswers,
  questionsList,
  toggleModalVisible,
  ...rest  // eslint-disable-line no-unused-vars
}) {
  const match = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    // console.log("EXAM: ", history)
    getProgress({ exam: 'true' });
  }, [attempts, getProgress]);

  return (
    <div className="exam">
      <div className="exam__header">
        <div>
          <h1>Avaliação</h1>
          <p>
            Conclua com mais de 70% de acertos para ser validado como mentor
          </p>
        </div>
        <div className="exam__header--progress">
          {attempts > 0 && !currentUser.isValidated && (
            <>
              <span>
                {totalAnswers}/{questionsList.length} questões respondidas
              </span>
              <Button
                disabled={
                  totalAnswers < questionsList.length || currentUser.isValidated
                }
                onClick={() => {
                  toggleModalVisible();
                }}
                shadow
              >
                Finalizar avaliação
              </Button>
            </>
          )}
          {attempts === 0 && !currentUser.isValidated && (
            <span className="emphasis failure">Não Concluída</span>
          )}
          {currentUser.isValidated && (
            <>
              <span className="emphasis">Concluída</span>
              <p>Você foi validado como mentor</p>
            </>
          )}
        </div>
      </div>
      <MotionDiv className="exam__body">
        {attempts > 0 && !currentUser.isValidated && <ActivitiesList exam />}
        <div className="custom-animation">
          <AnimatePresence exitBeforeEnter inital={false}>
            <Switch location={history.location} key={history.location.pathname}>
              <RouteTransition exact path={match.path}>
                <ExamRules />
              </RouteTransition>
              <RouteTransition
                path={`${match.path}/atividades/:activityNumber`}
              >
                <ExamQuestion />
              </RouteTransition>
            </Switch>
          </AnimatePresence>
        </div>
      </MotionDiv>
      <Modal
        title="Finalizar e enviar?"
        confirmMessage="sim"
        closeMessage="cancelar"
        onClose={() => toggleModalVisible()}
        onConfirm={() => {
          validateMentor();
          toggleModalVisible();
          history.push('/avaliacao');
        }}
      >
        <p>
          Ao confirmar, suas respostas serão verificadas e, caso tenha mais de
          70% de acertos, você será validado!
        </p>
        <p>
          Você ainda possui {attempts}{' '}
          {attempts > 1 ? 'tentativas.' : 'tentativa.'}
        </p>
      </Modal>
    </div>
  );
}

Exam.defaultProps = {
  questionsList: [],
};

Exam.propTypes = {
  currentUser: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object])
    .isRequired,
  validateMentor: PropTypes.func.isRequired,
  attempts: PropTypes.number.isRequired,
  getProgress: PropTypes.func.isRequired,
  totalAnswers: PropTypes.number.isRequired,
  questionsList: PropTypes.arrayOf(PropTypes.object),
  toggleModalVisible: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  totalAnswers: selectTotalAnswers(state),
  questionsList: selectQuestionsList(state),
  attempts: selectValidationAttempts(state),
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleModalVisible: () => dispatch(toggleModalVisibleImport()),
  getProgress: (query) => dispatch(getProgressImport(query)),
  validateMentor: () => dispatch(validateMentorImport()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Exam);
