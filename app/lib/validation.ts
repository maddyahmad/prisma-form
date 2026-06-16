import * as yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email format")
    .test("strict-email", "Invalid email format", (value) => {
      if (!value) return false;
      return emailRegex.test(value);
    }),
  age: yup
    .number()
    .required("Age is required")
    .typeError("Age must be a number")
    .moreThan(16, "Age must be greater than 16")
    .max(100, "Age must be less than or equal to 100"),
  gender: yup
    .string()
    .oneOf(
      ["male", "female", "other", undefined, ""],
      "Invalid gender selection",
    )
    .optional(),
});
