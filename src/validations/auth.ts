import * as z from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

const userData = {
  role: z.enum(["student", "academy"], {
    errorMap: () => ({ message: "يجب اختيار نوع الحساب" }),
  }),
  profile_picture: z
    .any()
    .refine(
      (file) => {
        return file instanceof File;
      },
      { message: "صورة الملف الشخصي مطلوبة" }
    )
    .refine(
      (file) => {
        return file.size <= 5 * 1024 * 1024; // 5MB max
      },
      { message: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت" }
    )
    .refine(
      (file) => {
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
  name: z
    .string()
    .trim()
    .min(2, { message: "الاسم يجب أن يكون حرفين على الأقل" })
    .max(50, { message: "الاسم يجب أن يكون أقل من 50 حرف" }),
  phone: z
    .string()
    .min(1, { message: "رقم الهاتف مطلوب" })
    .refine((phone) => isValidPhoneNumber(phone), {
      message: "رقم الهاتف غير صحيح",
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
    .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" })
    .max(40),
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
    .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" })
    .max(40),
});
export const signupSchema = z
  .object(userData)
  .refine((data) => data.password === data.confirm_password, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirm_password"],
  });

export type ISignin = z.infer<typeof signinSchema>;
export type ISignup = z.infer<typeof signupSchema>;
