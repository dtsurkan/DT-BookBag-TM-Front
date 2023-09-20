import { combineReducers } from "redux";
import testReducer from "./test";
const appReducer = combineReducers({
  testReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
