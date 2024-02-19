exports.makeValueForSaveChat = ({ payload }) => {
  if (Array.isArray(payload)) {
    const updatedValue = [];
    return payload.map((ele) => {
      ele.message = { ...ele.message, date: Date.now() };
      updatedValue.unshift(ele);
      return ele;
    });
  } else {
    payload.message = { ...payload.message, date: Date.now() };
    return payload;
  }
};
