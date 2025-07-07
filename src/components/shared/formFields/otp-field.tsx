import React from "react";
import { Controller } from "react-hook-form";
import OtpInput from "react-otp-input";
import { Label } from "@/components/ui/label";
import type { Control, FieldErrors } from "react-hook-form";
import { useAuth } from "@/features/auth/hooks/useAuthStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Routes } from "@/constants/enums";

interface OtpFieldProps {
  name: string;
  label?: string;
  disabled?: boolean;
  errors: FieldErrors;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  numInputs?: number;
  autoFocus?: boolean;
}

const OtpField: React.FC<OtpFieldProps> = ({
  name,
  label,
  disabled = false,
  errors,
  control,
  numInputs = 6,
  autoFocus = false,
}) => {
  const searchParams = useSearchParams();
  const { email: verifiedEmail } = Object.fromEntries(searchParams[0]);
  const { verifyAccount } = useAuth();
  const error = errors[name];
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-4">
      {label && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <OtpInput
            value={value || ""}
            onChange={async (otp) => {
              onChange(otp);

              // Only send request when all inputs are filled with valid numbers
              if (otp.length === numInputs && /^\d+$/.test(otp)) {
                try {
                  const { status_code, message } = await verifyAccount({
                    email: verifiedEmail,
                    otp,
                  });
                  if (status_code === 200) {
                    toast.success(message);
                    navigate(`/${Routes.DASHBOARD}`, {
                      replace: true,
                    });
                  }
                } catch (error) {
                  console.error("OTP verification failed:", error);
                }
              }
            }}
            numInputs={numInputs}
            shouldAutoFocus
            inputType="number"
            renderInput={(props) => (
              <input
                {...props}
                disabled={disabled}
                autoFocus={autoFocus}
                className={`
                  w-12 h-12 text-center text-lg font-semibold
                  border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                  transition-colors duration-200
                  [&::-webkit-outer-spin-button]:appearance-none
                  [&::-webkit-inner-spin-button]:appearance-none
                  [-moz-appearance:textfield]
                  ${
                    error
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 hover:border-gray-400"
                  }
                  ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                `}
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "textfield",
                }}
              />
            )}
            containerStyle={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              direction: "ltr",
            }}
          />
        )}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">{error.message as string}</p>
      )}
    </div>
  );
};

export default OtpField;
