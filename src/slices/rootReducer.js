import { combineReducers } from "redux" // eslint-disable-line import/no-extraneous-dependencies
import { persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import tutorialReducer from './tutorialSlice'
import userReducer from './usersSlice'
import mentorReducer from './mentorSlice'
import learnerReducer from './learnerSlice'
import certificateReducer from './certificateSlice'
import modalReducer from './modalSlice'

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['user', 'tutorial', 'mentor', 'learner', 'certificate']
}

const appReducer = combineReducers({
  user: userReducer,
  tutorial: tutorialReducer,
  mentor: mentorReducer,
  learner: learnerReducer,
  certificate: certificateReducer,
  modal: modalReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'users/logout/fulfilled') {
      storageSession.removeItem('persist:root')
      state = undefined;
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer)