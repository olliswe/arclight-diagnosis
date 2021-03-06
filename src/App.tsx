import React, { useEffect, useContext, Fragment } from "react";
import {
  UserContext,
  withUserContext,
  UserContextProps,
} from "./context/userContext";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import Login from "./pages/Login";
import { API_URL, API_ROUTES } from "./constants";
import axios from "axios";
import { ROUTES } from "./constants";
import index from "./components/withAuthNavigation";
import NewCases from "./pages/NewCases";
import ReopenedCases from "./pages/ReOpenedCases";
import ArchivedCases from "./pages/ArchivedCases";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import ViewCase from "./pages/ViewCase";
import { compose } from "recompose";
import {
  AlertContext,
  AlertContextProps,
  withAlertContext,
} from "./context/alertContext";
import Alert from "./components/Alert";
import LoadingDiv from "./components/LoadingDiv";

const App: React.FC = () => {
  let userContext: UserContextProps = useContext(UserContext);
  let alertContext: AlertContextProps = useContext(AlertContext);

  const client = new ApolloClient({
    uri: API_URL + "/graphql/", // your GraphQL Server
    request: (operation) => {
      operation.setContext({
        headers: {
          authorization: "Token " + userContext.state.token,
        },
      });
    },
  });

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!!token) {
      let headers = { Authorization: "Token " + token };
      axios
        .get(API_URL + API_ROUTES.CURRENT_USER, { headers: headers })
        .then((res) => {
          console.log("user can be logged in!");
          token &&
            userContext.dispatch({
              type: "login",
              payload: {
                user: { email: res.data.email, id: res.data.id },
                token: token,
              },
            });
        })
        .catch((error) => {
          alert("An error occurred, please try again!");
          userContext.dispatch({ type: "loaded" });
        });
    } else {
      userContext.dispatch({ type: "loaded" });
    }
  }, []);

  return userContext.state.loading ? (
    <LoadingDiv height={"90vh"} />
  ) : (
    <ApolloProvider client={client}>
      {alertContext.state.message && <Alert />}
      <BrowserRouter>
        <Switch>
          <LoginRoute path={ROUTES.LOGIN} component={Login} exact />
          <Route path="/">
            <AuthApp />
          </Route>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

const AuthApp = index((props: any) => {
  let userContext: UserContextProps = React.useContext(UserContext);

  if (!userContext.state.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <Route exact path={ROUTES.NEW_CASES}>
        <NewCases />
      </Route>
      <Route exact path={ROUTES.REOPENED_CASES}>
        <ReopenedCases />
      </Route>
      <Route exact path={ROUTES.ARCHIVED_CASES}>
        <ArchivedCases />
      </Route>
      <Route exact path={ROUTES.VIEW_CASE}>
        <ViewCase />
      </Route>
    </Fragment>
  );
});

export default compose(withAlertContext, withUserContext)(App);

const LoginRoute: React.FC<any> = ({ component: ChildComponent, ...rest }) => {
  let userContext: UserContextProps = useContext(UserContext);

  return (
    <Route {...rest}>
      {(props: any) => {
        if (!userContext.state.isAuthenticated) {
          return <ChildComponent {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    </Route>
  );
};

interface Props {
  component: React.FC;
}
