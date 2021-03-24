import { put, delay } from 'redux-saga/effects';
import * as types from '../../constants';
export default function* showPostSaga(action) {
  console.warn('nahagezwwwweeee');
  yield put({ type: types.SHOW_POST });
}
