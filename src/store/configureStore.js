import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

// returns the Store instance
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(rootReducer,
      applyMiddleware(sagaMiddleware)),
      runSaga: sagaMiddleware.run(rootSaga)
  };
};

export default configureStore;
