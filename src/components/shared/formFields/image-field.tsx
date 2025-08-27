import type { IFormField } from "@/types/app";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, MinusCircleIcon, PlusCircleIcon } from "lucide-react";

interface Props extends IFormField {
  errors: FieldErrors;
  control: Control<Record<string, unknown>>;
}

const ImageField = ({
  label,
  name,
  placeholder,
  disabled,
  control,
  errors,
}: Props) => {
  const hasError = Boolean(errors[name]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Pass the file to the form
      onChange(file);
    }
  };

  const removeImage = (onChange: (value: File | null) => void) => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Accordion
        type="single"
        collapsible
        value={isOpen ? "item-1" : ""}
        onValueChange={(value) => setIsOpen(value === "item-1")}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-0">
            {label && (
              <Label
                htmlFor={name}
                className={cn(
                  "text-sm font-medium text-card-foreground",
                  "flex items-center justify-between w-full"
                )}
              >
                <div className="flex items-center gap-2">
                  {isOpen ? (
                    <MinusCircleIcon className="h-4 w-4 text-card-foreground" />
                  ) : (
                    <PlusCircleIcon className="h-4 w-4 text-card-foreground" />
                  )}
                  {label}
                </div>
                <ChevronDown
                  className={cn(
                    "text-card-foreground transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </Label>
            )}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <Controller
              control={control}
              name={name}
              render={({ field: { onChange } }) => (
                <div className="space-y-4">
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, onChange)}
                    className="hidden"
                    disabled={disabled}
                  />

                  {/* Preview or upload area */}
                  <div
                    className={cn(
                      "relative border-2 border-dashed rounded-lg p-6 text-center transition-colors",
                      hasError
                        ? "border-destructive"
                        : "border-border hover:border-primary",
                      disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {preview ? (
                      <div className="relative">
                        <div
                          className={cn(
                            "relative cursor-pointer group",
                            disabled && "cursor-not-allowed opacity-50"
                          )}
                          onClick={disabled ? undefined : handleFileSelect}
                        >
                          <img
                            src={preview}
                            alt="Preview"
                            loading="lazy"
                            className="mx-auto max-h-48 w-auto rounded-lg object-contain border-2 border-background shadow-lg transition-opacity group-hover:opacity-75"
                          />
                          {/* Overlay icon on hover */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-black/50 rounded-lg p-3">
                              <svg
                                className="h-6 w-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </div>
                          </div>
                          {/* Tooltip text */}
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            اضغط لتغيير الصورة
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removeImage(onChange)}
                          disabled={disabled}
                        >
                          ×
                        </Button>
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "space-y-2 cursor-pointer transition-colors hover:bg-muted/50 rounded-lg p-4",
                          disabled && "cursor-not-allowed opacity-50"
                        )}
                        onClick={disabled ? undefined : handleFileSelect}
                      >
                        <div className="mx-auto h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                          <svg
                            className="h-8 w-8 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                          {placeholder || "اضغط هنا لاختيار صورة (مطلوب)"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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

export default ImageField;
