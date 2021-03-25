import { put } from 'redux-saga/effects';
import * as types from '../../constants';
export default function* showPostSaga(action) {
  yield put({ type: types.SHOW_POST });
}
