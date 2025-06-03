import { InputTypes } from "@/constants/enums";
import type { IFormField } from "@/types/app";
import TextField from "./text-field";
import PasswordField from "./password-field";
import type { Control, FieldErrors } from "react-hook-form";
import Checkbox from "./checkbox";

interface Props extends IFormField {
  errors: FieldErrors;
  control: Control<Record<string, unknown>>;
}

const FormFields = (props: Props) => {
  const { type } = props;

  const renderField = (): React.ReactNode => {
    if (type === InputTypes.EMAIL || type === InputTypes.TEXT) {
      return <TextField {...props} />;
    }

    if (type === InputTypes.PASSWORD) {
      return <PasswordField {...props} />;
    }

    if (type === InputTypes.CHECKBOX) {
      return <Checkbox {...props} />;
    }

    return null;
  };

  return <>{renderField()}</>;
};

export default FormFields;
