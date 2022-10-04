import {
  IonButton,
  IonCol,
  IonRow,
  IonInput,
  IonItem,
  IonPage,
  IonGrid,
  IonContent,
} from "@ionic/react";
import { useState, useMemo } from "react";
import "./Styles.css";

interface ContainerProps {
  data: any[];
  user: string;
  state: string;
  title: string;
}

const Table: React.FC<ContainerProps> = (ContainerProps) => {
  const { data, user, state, title } = ContainerProps;
  const [search, setSearch] = useState("");

  const dataFilter = useMemo(() => {
    return data.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, data]);

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonRow>
                <IonCol size="12">
                  <h2>{title}</h2>
                  <IonItem>
                    <IonInput
                      type="text"
                      placeholder="Buscar Titulo"
                      onIonInput={(e: any) => setSearch(e.target.value)}
                      value={search}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" className="infoMain">
                  <IonRow>
                    <IonCol className="infoTextHeader">ID</IonCol>
                    <IonCol className="infoTextHeader">Titulo</IonCol>
                    <IonCol className="infoTextHeader">Accion</IonCol>
                  </IonRow>
                  {dataFilter.map((item) =>
                    item.state === state ? (
                      item.user === user ? (
                        <IonRow className="infoRow" key={item._id + "k"}>
                          <IonCol size="4" className="infoText">
                            {item._id}
                          </IonCol>
                          <IonCol size="4" className="infoText">
                            {item.title}
                          </IonCol>
                          <IonCol size="4" className="infoText">
                            <IonButton routerLink={"./contrato/" + item._id}>
                              ver
                            </IonButton>
                          </IonCol>
                        </IonRow>
                      ) : null
                    ) : null
                  )}
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Table;
