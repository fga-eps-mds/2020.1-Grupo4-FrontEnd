import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { selectQuestionsList, selectCurrentModule, selectQuestionsResults } from '../../../../slices/tutorialSlice';
import { getQuestions, getProgress } from '../../../../services/tutorialServices';
import './style.scss';

function ActivitiesList({ questionsList, questionsResults, currentModule, getQuestions, getProgress }) {
  const match = useRouteMatch();

  useEffect(() => {
    getQuestions(currentModule);
  }, [currentModule]);

  useEffect(() => {
    getProgress(currentModule)
  }, [questionsList]);

  const result = activity => questionsResults.find(result => result.question === activity._id)?.isCorrect

  return (
    <div className="activities-list">
      <div className="activities-list__header">
        <div>
          <h3>Forum</h3>
          <p>
            Modulo <b>{currentModule}</b>
          </p>
        </div>
      </div>
      <div className="activities-list__list">
        {questionsList.map(activity => (
          <p key={activity._id}
            className={`
            activities-list__list-item
            ${result(activity) === false ? 'wrong':''}
            ${result(activity) ? 'correct':''}
            `}
          >
            <Link to={`${match.path}/atividades/${activity.number}`}>Atividade {activity.number}</Link>
          </p>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  questionsList: selectQuestionsList(state),
  currentModule: selectCurrentModule(state),
  questionsResults: selectQuestionsResults(state),
});

const mapDispatchToProps = dispatch => ({
  getQuestions: moduleNumber => dispatch(getQuestions(moduleNumber)),
  getProgress: questions => dispatch(getProgress(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesList);
