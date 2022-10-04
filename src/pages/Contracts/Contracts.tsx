import React, { useEffect } from "react";
import { IonTabs, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

import Table from "../../components/Table/Table";

import Contract from "../Contract/Contract";
import jwt from "jwt-decode";

import { Get } from "../../services";
const Contracts: React.FC<RouteComponentProps> = ({ match }) => {
  const [dataList, setDataList] = React.useState<any>([]);
  const [user, setUser] = React.useState<string>("");
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      let decoded: any = jwt(token);
      Get("/usuario/" + decoded.id)
        .then((res) => {
          setUser(res.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    Get("/pdf")
      .then((res) => {
        setDataList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <IonTabs>
      <IonTabBar slot="top">
        <IonTabButton
          tab={`${match.url}/pendientes`}
          href={`${match.url}/pendientes`}
        >
          <IonLabel>Pendientes</IonLabel>
        </IonTabButton>
        <IonTabButton
          tab={`${match.url}/firmados`}
          href={`${match.url}/firmados`}
        >
          <IonLabel>Firmados</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonRouterOutlet>
        <Route
          exact
          path={`${match.url}/pendientes`}
          render={(props) => (
            <Table
              data={dataList}
              state="pendiente"
              user={user}
              title="Contratos Pendientes"
              {...props}
            />
          )}
        />

        <Route
          path={`${match.url}/firmados`}
          render={(props) => (
            <Table
              data={dataList}
              state="firmado"
              user={user}
              title="Contratos Firmados"
              {...props}
            />
          )}
        />
        <Route path={`${match.url}/contrato/:id`}>
          <Contract />
        </Route>
        <Route
          exact
          path={match.url}
          render={() => <Redirect to={`${match.url}/pendientes`} />}
        />
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default Contracts;
