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
import { useHistory } from "react-router-dom";
import React from "react";
import TextInput from "../../components/TextInput/TextInput";
import { Formik } from "formik";
import { Reg } from "../../services";

import validationSchema from "./validationSchema";
const Register: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Formik
          initialValues={{
            user: "",
            full_name: "",
            city: "",
            country: "",
            age: "",
            gender: "",
            password: "",
            confirmPassword: "",
            identificationType: "",
            identification: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            Reg("/usuario/registro", values)
              .then((res) => {
                presentAlert({
                  header: "Registro exitoso",
                  buttons: ["OK"],
                });
                history.push("/info/login");
              })
              .catch((err) => {
                presentAlert({
                  header: "Error",
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
                    <IonCol size="6">
                      <TextInput
                        label="Usuario"
                        idName="user"
                        type="text"
                        placeholder="Ingrese su usuario"
                      />
                    </IonCol>
                    <IonCol size="6">
                      <TextInput
                        label="Nombre completo"
                        idName="full_name"
                        type="text"
                        placeholder="Ingrese su nombre completo"
                      />
                    </IonCol>
                    <IonCol size="6">
                      <TextInput
                        label="Ciudad"
                        idName="city"
                        type="text"
                        placeholder="Ingrese su ciudad"
                      />
                    </IonCol>
                    <IonCol size="6">
                      <TextInput
                        label="País"
                        type="text"
                        idName="country"
                        placeholder="Ingrese su país"
                      />
                    </IonCol>
                    <IonCol size="6">
                      <TextInput
                        label="Edad"
                        type="number"
                        idName="age"
                        placeholder="Ingrese su edad"
                      />
                    </IonCol>
                    <IonCol size="6">
                      <TextInput
                        label="Género"
                        type="text"
                        idName="gender"
                        placeholder="Ingrese su género"
                      />
                    </IonCol>
                    <IonCol size="6">
                      <TextInput
                        label="Contraseña"
                        type="password"
                        idName="password"
                        placeholder="Ingrese su contraseña"
                      />
                    </IonCol>
                    <IonCol size="6">
                      <TextInput
                        label="Confirmar contraseña"
                        type="password"
                        idName="confirmPassword"
                        placeholder="Confirme su contraseña"
                      />
                    </IonCol>
                    <IonCol size="6">
                      <TextInput
                        label="Tipo de identificación"
                        type="text"
                        idName="identificationType"
                        placeholder="Ingrese su tipo de identificación"
                      />
                    </IonCol>
                    <IonCol size="6">
                      <TextInput
                        label="Identificación"
                        type="number"
                        idName="identification"
                        placeholder="Ingrese su identificación"
                      />
                    </IonCol>
                    <IonCol size="12">
                      <IonButton expand="block" type="submit">
                        Registrar
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

export default Register;
