import { takeLatest } from 'redux-saga/effects';
import * as types from './../constants';
import AddPostSaga from './PostSaga/addPostSaga';
import showPostSaga from './PostSaga/showPostSaga';
import removePostSaga from './PostSaga/removePostSaga';
import updatePostSaga from './PostSaga/updatePostSaga';
import updatePostArraySaga from './PostSaga/updatePostArray';
export default function* rootsaga() {
  yield takeLatest(types.ADD_POST_REQUEST, AddPostSaga);
  yield takeLatest(types.SHOW_POST_REQUEST, showPostSaga);
  yield takeLatest(types.UPDATE_POST_REQUEST, updatePostSaga);
  yield takeLatest(types.UPDATE_POST_ARRAY_REQUEST, updatePostArraySaga);
  yield takeLatest(types.REMOVE_POST_REQUEST, removePostSaga);
}
