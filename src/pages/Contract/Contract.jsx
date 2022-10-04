import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import "@react-pdf-viewer/core/lib/styles/index.css";
import {
  IonContent,
  IonPage,
  IonButton,
  useIonAlert,
  IonGrid,
  IonCol,
  IonRow,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { Get, Put } from "../../services";
import Pdf from "../../components/Pdf/Pdf";

import "@react-pdf-viewer/toolbar/lib/styles/index.css";

const Contract = () => {
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const [file, setFile] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      await Get("/pdf/" + id).then((res) => {
        setFile(res);
      });
    };
    fetchData();
  }, [id]);

  const chengeStatus = (state) => {
    Put("/pdf/" + id, { state: state }).then((res) => {
      presentAlert({
        header: "Se ha cambiado el estado del contrato",
        message: "Estado actual: " + state,
        buttons: ["OK"],
      });
      history.push("/home");
      window.location.reload();
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contrato</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Pdf file={file?.title + ".pdf"} id={id} />
            </IonCol>
          </IonRow>
          {file?.state === "pendiente" ? (
            <IonRow
              style={{
                marginTop: "50px",
              }}
            >
              <IonCol>
                <IonButton
                  onClick={() => chengeStatus("rechazado")}
                  expand="block"
                >
                  Rechazar
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  onClick={() => chengeStatus("firmado")}
                  expand="block"
                >
                  Firmar
                </IonButton>
              </IonCol>
            </IonRow>
          ) : null}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Contract;
