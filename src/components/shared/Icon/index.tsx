import svgs from "./svgs";
import type { SvgProps } from "./types";

export type SvgIconType = keyof typeof svgs;

interface IconProps extends SvgProps {
  name: SvgIconType;
}

const Icon = ({ name, size = "24px", className = "" }: IconProps) => {
  const SvgIcon = svgs[name];

  return (
    <span style={{ width: size, height: size }} className="element-center">
      <SvgIcon size={size} className={className} />
    </span>
  );
};

export default Icon;
