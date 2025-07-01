const createStore = (reducer) => {
  let state = [];
  let listeners = [];

  const getState = () => state;
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listener = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  dispatch({ type: "@@INIT" });

  return {
    getState,
    dispatch,
    subscribe,
  };
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.todo];
    default:
      return state;
  }
};

const goals = (state, action) => {
  switch (action.type) {
    case "ADD_GOALS":
      return [...state, action.goal];
    default:
      return state;
  }
};

const app = (state = {}, action) => {
  return {
    todos: todos(state?.todos, action),
    goals: goals(state?.goals, action),
  };
};

const store = createStore(app);

store.subscribe(() => {
  console.log("The new state is : ", store.getState());
});

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "learn redux",
    complete: false,
  },
});
