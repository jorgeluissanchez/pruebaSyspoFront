import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
} from "@ionic/react";
import axios from "axios";
import jwt from "jwt-decode";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useState, useEffect } from "react";
import { Get, Put } from "../../services";
const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    let decoded = jwt(token);
    if (token) {
      Get("/usuario/" + decoded.id)
        .then((res) => {
          setUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 10,
    });
    const fd = new FormData();
    fd.append("pfp", photo.base64String);
    axios
      .put("http://localhost:5000/api/usuario/" + user._id, fd, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          withCredentials: true,
        },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const takeSignature = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 10,
    });
    const fd = new FormData();
    fd.append("signature", photo.base64String);
    axios
      .put("http://localhost:5000/api/usuario/" + user._id, fd, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          withCredentials: true,
        },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonRow className="document-container">
                <IonCol size="12">
                  {user?.pfp ? (
                    <IonImg
                      src={user?.pfp}
                      style={{ width: "auto", height: "100px" }}
                    />
                  ) : (
                    <p className="ion-padding ion-text-center">
                      Su foto no ha sido tomada
                    </p>
                  )}
                </IonCol>

                <IonCol size="12">
                  <IonButton onClick={() => takePhoto()} expand="block">
                    Adjuntar Foto
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonCol>

            <IonCol size="12">
              <IonRow>
                <IonCol size="12">
                  {user?.signature ? (
                    <IonImg
                      src={user?.signature}
                      style={{ width: "auto", height: "100px" }}
                    />
                  ) : (
                    <p className="ion-padding ion-text-center">
                      Su firma no ha sido tomada
                    </p>
                  )}
                </IonCol>

                <IonCol size="12">
                  <IonButton onClick={() => takeSignature()} expand="block">
                    Adjuntar Firma
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
