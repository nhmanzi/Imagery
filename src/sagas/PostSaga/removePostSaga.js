import { put, delay } from 'redux-saga/effects';
import * as types from '../../constants';
export default function* removePostSaga(action) {
  const { payload } = action;
  yield put({ type: types.REMOVE_POST, payload });
}
