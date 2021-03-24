import { put, delay } from 'redux-saga/effects';
import * as types from '../../constants';
export default function* updatePostSaga(action) {
  const { payload } = action;
  yield put({ type: types.UPDATE_POST, payload });
}
