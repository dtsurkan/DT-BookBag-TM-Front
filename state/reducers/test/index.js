const initialState = {
  test: "qwertyuio",
};
export const SET_TEST_TEXT = "SET_TEST_TEXT";
export const setTestName = (payload) => ({
  type: SET_TEST_TEXT,
  payload,
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TEST_TEXT:
      return { ...state, test: payload };
    default:
      return state;
  }
};
