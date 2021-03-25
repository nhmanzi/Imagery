import { put } from 'redux-saga/effects';
import * as types from '../../constants';
export default function* showPostArraySaga(action) {
  yield put({ type: types.UPDATE_POST_ARRAY, payload: action.data });
}
