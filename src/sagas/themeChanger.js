import { put } from 'redux-saga/effects';
import * as types from './../constants';
export default function* ThemechangerSaga(action) {
  const { DarkMode } = action;
  yield put({ type: types.THEME_CHANGER, payload: DarkMode });
}
