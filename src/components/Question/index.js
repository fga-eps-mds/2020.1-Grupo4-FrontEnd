import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  selectQuestion,
  selectQuestionsResults,
  isLoading
} from '../../slices/tutorialSlice';
import {
  answerQuestion,
  getProgress,
} from '../../services/tutorialServices';
import Button from '../Button';
import Loader from '../Loader'
import MotionDiv from '../../UI/animation/MotionDiv';
import './style.scss';

/* eslint-disable no-shadow */
function Question({
  question,
  questionResults,
  answerQuestion,
  getProgress,
  onAnswer,
  showResult = true,
  isLoading,
  children
}) {
  const result = useMemo(
    () => questionResults.find((result) => result.question === question._id),
    [questionResults]
  );

  const { handleSubmit, register, errors, clearErrors, watch } = useForm({
    defaultValues: {
      alternative: result?.alternative,
    },
  });

  const previousAlternative = useMemo(() =>
    watch('alternative') === result?.alternative
  , [watch('alternative'), result])

  const onSubmit = async (alternative) => {
    const response = await answerQuestion({
      ...alternative,
      question: question._id,
    });
    if (response.payload.isCorrect === true) {
      getProgress();
    }
  };

  const descriptionText = useMemo(() => question.description
    .split('\n')
    .map((word, i) => <p key={i}>{word}</p> // eslint-disable-line react/no-array-index-key
  ), [question])

  const questionAlternatives = useMemo(() =>
    Object.keys(question.alternatives).map((item) =>
      <div className="question__alternatives--item" key={item}>
        <label htmlFor="alternative">
          <input
            name="alternative"
            value={item}
            type="radio"
            onChange={() => clearErrors('alternative')}
            ref={register({ required: "Escolha uma alternativa" })}
          />
          <span>{question.alternatives[item]}</span>
        </label>
      </div>
  ), [question])

  return (
    <div className="question">
      <div className="question__description">{descriptionText}</div>
      <div className="question__alternatives">
        {result?.isCorrect && showResult ? (
          <MotionDiv className="question__result"
            transition={{
              type: 'tween',
              ease: 'easeIn',
              duration: 0.5,
            }}
            variants={{
              initial: {
                opacity: 0,
                // scale: 0.6,
              },
              in: {
                opacity: 1,
                // scale: 1,
              },
              out: {
                opacity: 0,
                // scale: 0.6,
              },
            }}
          >
            <h2>CORRETO!</h2>
            <p>{question.alternatives[result.alternative]}</p>
          </MotionDiv>
        ) : (
          <>
            <form id="question" onSubmit={handleSubmit(onSubmit)}>
              {questionAlternatives}

              <div className="question__alternatives--error">
                {result?.isCorrect === false && showResult && !isLoading ? 'Resposta errada, tente novamente!' : null}
              </div>

              {errors.alternative &&
                <div className="question__alternatives--error">
                  {errors.alternative.message}
                </div>
              }
            </form>
          </>
        )}
      </div>
      <div className="question__buttons">
        {/* <div className="question__buttons--navigation">
          {children}
        </div> */}
        {(!result?.isCorrect || !showResult) && (
          <Button
            form="question"
            type="submit"
            disabled={previousAlternative || isLoading}
            onClick={() => onAnswer ? onAnswer() : console.log("NULL")}
            shadow
          >
            Responder
          </Button>
        )}
        {result?.isCorrect && showResult && 
          children
        }
        {isLoading && showResult && <div className="loading"><Loader> Verificando... </Loader></div>}
      </div>
    </div>
  );
}

Question.defaultProps = {
  questionResults: [],
  showGoBack: true,
  showResult: true
};

Question.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    alternatives: PropTypes.oneOfType([PropTypes.object]).isRequired,
  }).isRequired,
  questionResults: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  answerQuestion: PropTypes.func.isRequired,
  getProgress: PropTypes.func.isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  showGoBack: PropTypes.bool,
  showResult: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, props) => ({
  question: selectQuestion(state, props),
  questionResults: selectQuestionsResults(state),
  isLoading: isLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
  answerQuestion: (answerData) => dispatch(answerQuestion(answerData)),
  getProgress: (questions) => dispatch(getProgress(questions)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Question)
);
