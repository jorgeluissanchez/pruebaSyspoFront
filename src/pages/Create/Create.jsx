import {
  IonButton,
  IonContent,
  IonHeader,
  useIonAlert,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
import { Formik } from "formik";
import "./Styles.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import validationSchema from "./validationSchema";

import { Post } from "../../services";

const Create = () => {
  const [editor, setEditor] = useState("");
  const [presentAlert] = useIonAlert();
  const history = useHistory();
  const inputHandler = (event, editor) => {
    setEditor(editor.getData());
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Contrato</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Formik
          initialValues={{
            user: "",
            title: "",
            html: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            values.html = editor;
            const fd = new FormData();
            fd.append("user", values.user);
            fd.append("title", values.title);
            fd.append("html", values.html);
            Post("/pdf", fd).then((res) => {
              presentAlert({
                header: "Contrato creado",
                message: "El contrato se ha creado correctamente",
                buttons: ["OK"],
              });
              history.push("/home");
              window.location.reload();
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
                  <IonRow className="createScreen">
                    <IonCol size="6">
                      <TextInput
                        label="Titulo"
                        idName="title"
                        type="text"
                        placeholder="Ingrese el titulo"
                      />
                    </IonCol>
                    <IonCol size="6">
                      <TextInput
                        label="Destinatario"
                        type="text"
                        idName="user"
                        placeholder="Ingrese el destinatario"
                      />
                    </IonCol>
                    <IonCol size="12">
                      <CKEditor
                        editor={ClassicEditor}
                        onReady={(editor) => {}}
                        onChange={(event, editor) => {
                          inputHandler(event, editor);
                        }}
                      />
                    </IonCol>

                    <IonCol size="12">
                      <IonButton expand="block" type="submit">
                        Crear
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

export default Create;
