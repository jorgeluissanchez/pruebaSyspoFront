import * as yup from "yup";
const validationSchema = yup
  .object({
    user: yup
      .string()
      .required("El usuario es requerido")
      .min(5, "Minimo 5 caracteres")
      .max(15, "Maximo 15 caracteres"),
    password: yup
      .string()
      .required("La contraseña es requerida")
      .min(5, "Minimo 5 caracteres")
      .max(15, "Maximo 15 caracteres"),
  })
  .required();

export default validationSchema;
