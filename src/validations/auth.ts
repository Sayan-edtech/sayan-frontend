import * as z from "zod";

const userData = {
  first_name: z.string().trim().min(1, { message: "الاسم الأول مطلوب" }),
  last_name: z.string().trim().min(1, { message: "الاسم الأخير مطلوب" }),
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
