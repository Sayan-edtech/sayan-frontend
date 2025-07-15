import React, { useRef } from "react";
import { Controller } from "react-hook-form";
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

// Simple OTP Input Component
const SimpleOtpInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  numInputs: number;
  autoFocus: boolean;
  disabled: boolean;
}> = ({ value, onChange, numInputs, autoFocus, disabled }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const handleChange = (index: number, newValue: string) => {
    if (newValue.length > 1) {
      newValue = newValue.slice(-1);
    }
    
    const newOtp = value.split('');
    newOtp[index] = newValue;
    const updatedOtp = newOtp.join('');
    
    onChange(updatedOtp);
    
    // Move to next input if value is entered
    if (newValue && index < numInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: numInputs }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-semibold"
        />
      ))}
    </div>
  );
};

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
          <SimpleOtpInput
            value={value || ""}
            onChange={async (otp: string) => {
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
            autoFocus={autoFocus}
            disabled={disabled}
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
