import * as types from '../../constants';

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

    case types.REMOVE_POST:
      savePost([...state.posts.filter((e) => e.id !== payload)]);
      return {
        ...state,
        posts: [...state.posts.filter((e) => e.id !== payload)]
      };

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
