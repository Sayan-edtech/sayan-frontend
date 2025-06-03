import type { IFormField } from "@/types/app";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props extends IFormField {
  errors: FieldErrors;
  control: Control<Record<string, unknown>>;
}

const Checkbox = ({ label, name, disabled, errors, control }: Props) => {
  const hasError = Boolean(errors[name]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 rtl:space-x-reverse">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value, ref } }) => (
            <ShadcnCheckbox
              id={name}
              checked={Boolean(value) || false}
              onCheckedChange={onChange}
              disabled={disabled}
              ref={ref}
              className={
                hasError
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : ""
              }
              aria-invalid={hasError ? "true" : "false"}
              aria-describedby={hasError ? `${name}-error` : undefined}
            />
          )}
        />
        {label && (
          <Label
            htmlFor={name}
            className={`text-sm font-medium text-card-foreground leading-none cursor-pointer ${
              disabled ? "opacity-70 cursor-not-allowed" : ""
            } ${hasError ? "text-destructive" : ""}`}
          >
            {label}
          </Label>
        )}
      </div>
      {hasError && (
        <p
          id={`${name}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
