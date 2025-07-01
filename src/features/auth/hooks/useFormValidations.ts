import * as z from "zod";
import {
  signinSchema,
  signupSchema,
  verifyAccountSchema,
  forgotPasswordSchema,
  resetPassordSchema,
} from "@/validations/auth";
import type { IFormFieldsVariables } from "@/types/app";
import { Pages } from "@/constants/enums";

const useFormValidations = (props: IFormFieldsVariables) => {
  const { slug } = props;

  const getValidationSchema = () => {
    switch (slug) {
      case Pages.SIGNIN:
        return signinSchema;
      case Pages.SIGNUP:
        return signupSchema;
      case Pages.VERIFY_ACCOUNT:
        return verifyAccountSchema;
      case Pages.FORGOT_PASSWORD:
        return forgotPasswordSchema;
      case Pages.RESET_PASSWORD:
        return resetPassordSchema;

      default:
        return z.object({});
    }
  };

  return { getValidationSchema };
};

export default useFormValidations;
