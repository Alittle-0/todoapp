// Initial state
export const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// Reducer function
export const taskReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TASKS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_TASKS_SUCCESS":
      return { ...state, tasks: action.payload, loading: false };
    case "FETCH_TASKS_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_TASK_SUCCESS":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "TOGGLE_TASK_SUCCESS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id
            ? { ...task, status: action.payload.status }
            : task
        ),
      };
    case "REMOVE_TASK_SUCCESS":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    default:
      return state;
  }
};
