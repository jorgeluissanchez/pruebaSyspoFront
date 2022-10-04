import * as yup from "yup";
const validationSchema = yup
  .object({
    user: yup
      .string()
      .required("El usuario es requerido")
      .min(5, "Minimo 5 caracteres")
      .max(15, "Maximo 15 caracteres"),
    full_name: yup
      .string()
      .required("El nombre es requerido")
      .min(5, "Minimo 5 caracteres")
      .max(15, "Maximo 15 caracteres"),
    city: yup
      .string()
      .required("La ciudad es requerida")
      .min(3, "Minimo 3 caracteres")
      .max(15, "Maximo 15 caracteres"),
    country: yup
      .string()
      .required("El pais es requerido")
      .min(3, "Minimo 3 caracteres")
      .max(15, "Maximo 15 caracteres"),
    age: yup
      .number()
      .integer()
      .typeError("La edad debe ser un numero")
      .required("La edad es requerida")
      .min(18, "Debes ser mayor de edad")
      .max(150, "Edad invalida"),
    gender: yup
      .string()
      .required("El genero es requerido")
      .min(3, "Minimo 3 caracteres")
      .max(15, "Maximo 15 caracteres"),
    password: yup
      .string()
      .required("La contraseña es requerida")
      .min(5, "Minimo 5 caracteres")
      .max(15, "Maximo 15 caracteres"),
    confirmPassword: yup
      .string()
      .required("La confirmación de contraseña es requerida")
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
    identificationType: yup
      .string()
      .required("El tipo de identificación es requerido")
      .min(3, "Minimo 3 caracteres")
      .max(15, "Maximo 15 caracteres"),
    identification: yup
      .number()
      .integer()
      .typeError("La identificación debe ser un número")
      .required("La identificación es requerida")
      .min(1000000, "Se requiere un número de identificación válido")
      .max(9999999999, "Se requiere un número de identificación válido"),
  })
  .required();

export default validationSchema;
