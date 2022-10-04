import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonGrid,
  IonRow,
  useIonAlert,
  IonCol,
  IonTitle,
  IonImg,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import TextInput from "../../components/TextInput/TextInput";
import { Formik } from "formik";
import { Log } from "../../services";
import { useHistory } from "react-router-dom";

import validationSchema from "./validationSchema";
const Login: React.FC = () => {
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Formik
          initialValues={{
            user: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            Log(values)
              .then((res) => {
                const { access_token } = res;
                localStorage.setItem("jwt", access_token);
                presentAlert({
                  header: "Acceso exitoso",
                  message: res.message,
                  buttons: ["OK"],
                });
                history.push("/home");
                window.location.reload();
              })
              .catch((err) => {
                presentAlert({
                  header: "Error",
                  message: err.message,
                  buttons: ["OK"],
                });
              });
          }}
        >
          {(formikProps) => (
            <form onSubmit={formikProps.handleSubmit}>
              <IonGrid>
                <IonRow
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IonRow
                    style={{
                      width: "500px",
                    }}
                  >
                    <IonCol size="12">
                      <IonImg src="https://syspotec.com/wp-content/uploads/2022/06/logo_final22.png" />
                    </IonCol>
                    <IonCol size="12">
                      <TextInput
                        label="Usuario"
                        idName="user"
                        type="text"
                        placeholder="Ingrese su usuario"
                      />
                    </IonCol>
                    <IonCol size="12">
                      <TextInput
                        label="Contraseña"
                        type="password"
                        idName="password"
                        placeholder="Ingrese su contraseña"
                      />
                    </IonCol>
                    <IonCol size="12">
                      <IonButton expand="block" type="submit">
                        Ingresar
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonRow>
              </IonGrid>
            </form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default Login;
