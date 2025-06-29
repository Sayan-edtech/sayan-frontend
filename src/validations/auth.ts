import * as z from "zod";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { UserType } from "@/constants/enums";

const userData = {
  user_type: z.enum([UserType.STUDENT, UserType.ACADEMY], {
    errorMap: () => ({ message: "يجب اختيار نوع الحساب" }),
  }),
  profile_picture: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file) return true; // Allow undefined/null values
        return file instanceof File;
      },
      { message: "صورة الملف الشخصي يجب أن تكون ملف صحيح" }
    )
    .refine(
      (file) => {
        if (!file) return true; // Allow undefined/null values
        return file.size <= 5 * 1024 * 1024; // 5MB max
      },
      { message: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت" }
    )
    .refine(
      (file) => {
        if (!file) return true; // Allow undefined/null values
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        return allowedTypes.includes(file.type);
      },
      { message: "نوع الملف يجب أن يكون JPG أو PNG أو WebP" }
    ),
  fname: z
    .string()
    .trim()
    .min(2, { message: "الاسم الاول يجب أن يكون حرفين على الأقل" })
    .max(50, { message: "الاسم يجب أن يكون أقل من 50 حرف" }),
  lname: z
    .string()
    .trim()
    .min(2, { message: "الاسم الاول يجب أن يكون حرفين على الأقل" })
    .max(50, { message: "الاسم يجب أن يكون أقل من 50 حرف" }),
  phone_number: z
    .string()
    .min(1, { message: "رقم الهاتف مطلوب" })
    .refine((phone) => isValidPhoneNumber(phone), {
      message: "رقم الهاتف غير صحيح",
    })
    .transform((phone) => {
      // Clean the phone number - extract only digits from national number
      if (isValidPhoneNumber(phone)) {
        const phoneNumber = parsePhoneNumber(phone);
        return phoneNumber.nationalNumber;
      }
      // Fallback: remove all non-digits
      return phone.replace(/\D/g, "");
    })
    .refine((cleanPhone) => /^[0-9]{10,15}$/.test(cleanPhone), {
      message: "رقم الهاتف يجب أن يكون بين 10-15 رقم",
    }),
  email: z
    .string()
    .trim()
    .min(1, { message: "البريد الإلكتروني مطلوب" })
    .email({
      message: "يجب أن يكون بريد إلكتروني صحيح",
    }),
  password: z
    .string()
    .min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
  confirm_password: z.string().min(8, { message: "تأكيد كلمة المرور مطلوب" }),
};

export const signinSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "البريد الإلكتروني مطلوب" })
    .email({
      message: "يجب أن يكون بريد إلكتروني صحيح",
    }),
  password: z
    .string()
    .min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
});
export const signupSchema = z
  .object(userData)
  .refine((data) => data.password === data.confirm_password, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirm_password"],
  });

export type ISignin = z.infer<typeof signinSchema>;
export type ISignup = z.infer<typeof signupSchema>;
