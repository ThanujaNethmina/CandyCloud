import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[11px]",
  circle: "rounded-[50%]",
};
const variants = {
  fill: {
    gray_800: "bg-gray-800 text-white-A700",
    lime_600: "bg-lime-600 text-white-A700",
    gray_900: "bg-gray-900",
    pink_900: "bg-pink-900",
    gray_900_01: "bg-gray-900_01",
  },
};
const sizes = {
  md: "h-[60px] px-[35px] text-2xl",
  xs: "h-[29px] px-2.5 text-lg",
  sm: "h-[32px] px-[7px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "sm",
  color = "gray_900_01",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["round", "circle"]),
  size: PropTypes.oneOf(["md", "xs", "sm"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["gray_800", "lime_600", "gray_900", "pink_900", "gray_900_01"]),
};

export { Button };
