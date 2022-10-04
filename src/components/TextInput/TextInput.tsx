import React from "react";
import { IonInput, IonItem, IonLabel } from "@ionic/react";
import { useFormikContext } from "formik";

const TextInput: React.FC<any> = (prop) => {
  const { label, idName, placeholder, type } = prop;
  const { getFieldProps, getFieldMeta } = useFormikContext();
  return (
    <div>
      <IonItem>
        <IonLabel position="floating">{label}</IonLabel>
        <IonInput
          name={idName}
          id={idName}
          type={type}
          placeholder={placeholder}
          value={getFieldProps(idName).value}
          onIonChange={getFieldProps(idName).onChange}
        />
      </IonItem>
      <p
        style={{
          color: "tomato",
        }}
      >
        {getFieldMeta(idName).touched && getFieldMeta(idName).error}
      </p>
    </div>
  );
};

export default TextInput;
