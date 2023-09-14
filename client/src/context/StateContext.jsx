import { createContext, useContext, useReducer } from "react";
import reducer, { initialState } from "./StateReducers";

export const StateContext = createContext();



export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateProvider = () => useContext(StateContext);
