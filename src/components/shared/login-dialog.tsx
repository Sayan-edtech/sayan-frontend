import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import AuthForm from "@/features/auth/components/AuthForm";
import { Pages } from "@/constants/enums";
import { useAuth } from "@/features/auth/hooks/useAuthStore";

interface LoginDialogProps {
  children?: React.ReactNode;
  triggerText?: string;
  triggerVariant?: "default" | "secondary" | "outline" | "ghost" | "link";
  triggerSize?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function LoginDialog({
  children,
  triggerText = "دخول",
  triggerVariant = "link",
  triggerSize = "default",
  className = "",
}: LoginDialogProps) {
  const { openAuthModal, setOpenAuthModal } = useAuth();

  return (
    <Dialog
      open={openAuthModal}
      onOpenChange={(isOpen) => {
        setOpenAuthModal(isOpen);
      }}
    >
      <DialogTrigger asChild>
        {children || (
          <Button
            variant={triggerVariant}
            size={triggerSize}
            className={`${className} hover:text-primary transition-colors duration-200`}
          >
            <LogIn className="w-4 h-4 ml-2" />
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-lg w-full mx-4 rounded-2xl shadow-xl border-0"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogHeader className="flex justify-center items-center pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            مرحباً بك
          </DialogTitle>
        </DialogHeader>

        <AuthForm slug={Pages.SIGNIN} />
      </DialogContent>
    </Dialog>
  );
}
