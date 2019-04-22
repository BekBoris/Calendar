export const addToEventList = (task, date) => {
  return {
      type: "ADD_TASK",
      payload: {
        task:  task,
        date: date
      }
  };
};
