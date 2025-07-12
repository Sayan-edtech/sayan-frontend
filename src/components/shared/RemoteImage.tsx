import { cn } from "@/lib/utils";

type RemoteImageProps = {
  className?: string;
  src: string;
  alt?: string;
  loading?: "lazy" | "eager";
  onError?: () => void;
} & React.ImgHTMLAttributes<HTMLImageElement>;

function RemoteImage({
  className,
  src,
  alt = "Image",
  loading = "lazy",
  ...rest
}: RemoteImageProps) {
  const url = import.meta.env.VITE_API_URL;
  const domain = new URL(url).origin;
  return (
    <img
      src={`${domain}${src}`}
      alt={alt}
      loading={loading}
      className={`${cn("h-16 w-16 rounded-lg object-cover")} ${className}`}
      {...rest}
    />
  );
}

export default RemoteImage;
