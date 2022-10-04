import React from "react";
import { IonTabs, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Login from "./Login/Login";
import Register from "./Register/Register";

const LayoutInfo: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab={`${match.url}/login`} href={`${match.url}/login`}>
          <IonLabel>Login</IonLabel>
        </IonTabButton>
        <IonTabButton
          tab={`${match.url}/registro`}
          href={`${match.url}/registro`}
        >
          <IonLabel>Registro</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonRouterOutlet>
        <Route path={`${match.url}/login`}>
          <Login />
        </Route>
        <Route path={`${match.url}/registro`}>
          <Register />
        </Route>
        <Route exact path={`${match.url}`}>
          <Redirect to={`${match.url}/login`} />
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default LayoutInfo;
