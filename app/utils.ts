import * as yup from "yup";

export const validations = yup.object({
  name: yup.string().required("Name is required").min(3),
  email: yup.string().email("Invalid Email").required(),
  age: yup.number().required("Age is required").min(16),
  gender: yup.string().optional(),
});

export type User = yup.Asserts<typeof validations>;
