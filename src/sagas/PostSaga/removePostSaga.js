import { put } from 'redux-saga/effects';
import * as types from '../../constants';
export default function* removePostSaga(action) {
  const { id } = action;
  yield put({ type: types.REMOVE_POST, payload: id });
}
