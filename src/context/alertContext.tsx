import React, { createContext, Dispatch } from "react";

const AlertContext = createContext<AlertContextProps>({} as AlertContextProps);

export type AlertContextState = {
  message: string | null;
  type: "error" | "warning" | "info" | "success" | null;
  vertical: "top" | "bottom" | null;
  horizontal: "center" | "left" | "right" | null;
};

export type AlertContextAction =
  | { type: "removeAlert" }
  | {
      type: "setAlert";
      payload: {
        message: string | null;
        type: "error" | "warning" | "info" | "success" | null;
        vertical: "top" | "bottom" | null;
        horizontal: "center" | "left" | "right" | null;
      };
    };

export type AlertContextProps = {
  state: AlertContextState;
  dispatch: Dispatch<AlertContextAction>;
};

let initialState: AlertContextState = {
  message: null,
  type: null,
  vertical: null,
  horizontal: null,
};

let reducer = (state: AlertContextState, action: AlertContextAction) => {
  switch (action.type) {
    case "removeAlert":
      return {
        message: null,
        type: null,
      };
    case "setAlert":
      return {
        message: action.payload.message,
        type: action.payload.type,
        horizontal: action.payload.horizontal,
        vertical: action.payload.vertical,
      };
  }
};

const AlertContextProvider: React.FC = (props) => {
  // [A]
  // @ts-ignore
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };

  // [B]
  return (
    <AlertContext.Provider value={value}>
      {props.children}
    </AlertContext.Provider>
  );
};

let AlertContextConsumer = AlertContext.Consumer;

const withAlertContext = (WrappedComponent: React.FC) => {
  return function (props: any) {
    return (
      <AlertContextProvider>
        <WrappedComponent {...props} />
      </AlertContextProvider>
    );
  };
};

export {
  AlertContext,
  AlertContextProvider,
  AlertContextConsumer,
  withAlertContext,
};
