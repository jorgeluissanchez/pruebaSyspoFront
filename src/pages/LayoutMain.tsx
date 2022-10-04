import React from "react";
import { IonTabs, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Contracts from "./Contracts/Contracts";
import Create from "./Create/Create";
import Profile from "./Profile/Profile";

const LayoutMain: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton
          tab={`${match.url}/contratos`}
          href={`${match.url}/contratos`}
        >
          <IonLabel>Contratos</IonLabel>
        </IonTabButton>
        <IonTabButton tab={`${match.url}/crear`} href={`${match.url}/crear`}>
          <IonLabel>Crear</IonLabel>
        </IonTabButton>
        <IonTabButton tab={`${match.url}/perfil`} href={`${match.url}/perfil`}>
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonRouterOutlet>
        <Route
          path={`${match.url}/contratos`}
          render={(props) => <Contracts {...props} />}
        />
        <Route path={`${match.url}/crear`}>
          <Create />
        </Route>
        <Route path={`${match.url}/perfil`}>
          <Profile />
        </Route>

        <Route
          exact
          path={`${match.url}`}
          render={(props) => <Redirect to={`${match.url}/contratos`} />}
        />
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default LayoutMain;
