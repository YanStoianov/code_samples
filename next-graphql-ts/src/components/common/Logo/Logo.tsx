import React from "react";
import Image, { ImageProps } from "next/image";
// CONSTANTS
import appConstants from "@/constants/appConstants";
// COMPONENTS
import LogoSvg from "../../../../public/Logo.svg";

const Logo = ({
  width = 120,
  height = 46,
  priority = true,
  ...props
}: Omit<ImageProps, "alt" | "src" | "property">) => {
  return (
    <Image
      priority={priority}
      src={LogoSvg}
      alt={appConstants.APP_NAME}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default Logo;
