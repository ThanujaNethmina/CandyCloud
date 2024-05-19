import React from "react";

const sizes = {
  "3xl": "text-[22px] font-bold",
  "2xl": "text-xl font-semibold",
  "5xl": "text-[28px] font-semibold md:text-[26px] sm:text-2xl",
  "4xl": "text-2xl font-semibold md:text-[22px]",
  "7xl": "text-[32px] font-semibold md:text-3xl sm:text-[28px]",
  "6xl": "text-3xl font-semibold md:text-[28px] sm:text-[26px]",
  "9xl": "text-4xl font-semibold md:text-[34px] sm:text-[32px]",
  "8xl": "text-[35px] font-semibold md:text-[33px] sm:text-[31px]",
  "15xl": "text-6xl font-semibold md:text-[52px] sm:text-[46px]",
  "14xl": "text-[52px] font-bold md:text-[44px] sm:text-[38px]",
  "13xl": "text-5xl font-semibold md:text-[44px] sm:text-[38px]",
  xl: "text-lg font-bold",
  s: "text-sm font-semibold",
  md: "text-[15px] font-bold",
  "12xl": "text-[45px] font-bold md:text-[41px] sm:text-[35px]",
  xs: "text-xs font-bold",
  lg: "text-base font-bold",
  "11xl": "text-[40px] font-semibold md:text-[38px] sm:text-4xl",
  "10xl": "text-[38px] font-semibold md:text-4xl sm:text-[34px]",
};

const Heading = ({ children, className = "", size = "7xl", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-white-A700 font-opensans ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
