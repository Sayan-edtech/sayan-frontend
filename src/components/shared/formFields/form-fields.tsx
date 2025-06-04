import { InputTypes } from "@/constants/enums";
import type { IFormField } from "@/types/app";
import TextField from "./text-field";
import PasswordField from "./password-field";
import SelectField from "./select-field";
import PhoneField from "./phone-field";
import ImageField from "./image-field";
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

    if (type === InputTypes.SELECT) {
      return <SelectField {...props} />;
    }

    if (type === InputTypes.PHONE) {
      return <PhoneField {...props} />;
    }

    if (type === InputTypes.IMAGE) {
      return <ImageField {...props} />;
    }

    return null;
  };

  return <>{renderField()}</>;
};

export default FormFields;
