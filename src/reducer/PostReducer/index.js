import * as types from '../../constants';
import { v4 as uuidv4 } from 'uuid';
import cookie from 'js-cookie';
const initialState = {
  id: uuidv4(),
  name: 'LOLO',
  src: 'HhHhH',
  username: 'kingalo',
  role: 'UX designer'
};

const PostReducer = (state = { posts: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SHOW_POST:
      return state;
    case types.ADD_POST:
      savePost([...state.posts, payload]);
      return { ...state, posts: [...state.posts, payload] };
    case types.UPDATE_POST_ARRAY:
      const { source, destination } = payload;
      state.posts.splice(destination, 0, state.posts.splice(source, 1)[0]);
      savePost([...state.posts]);
      return { ...state };

    case 'REMOVE_IMG':
    // return state.filter((e) => e.id != payload.id);
    default:
      return state;
  }
};

export default PostReducer;

export function getPost() {
  return (
    localStorage.getItem('thePost') &&
    JSON.parse(localStorage.getItem('thePost'))
  );
}

export function savePost(posts) {
  return localStorage.setItem('thePost', JSON.stringify(posts));
}
