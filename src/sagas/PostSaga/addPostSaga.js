import { put } from 'redux-saga/effects';
import * as types from '../../constants';
export default function* AddPostSaga(action) {
  console.warn('nahagezwwwweeee', action.data);
  const { data } = action;

  yield put({ type: types.ADD_POST, payload: { ...data } });
}
