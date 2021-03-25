import * as types from '../../constants';

const theme = (state = { darkMode: false }, action) => {
  switch (action.type) {
    case types.THEME_CHANGER:
      return {
        ...state,
        darkMode: action.payload
      };
    default:
      return state;
  }
};

export default theme;
