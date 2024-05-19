import React from "react";

const sizes = {
  "5xl": "text-[40px] font-normal md:text-[38px] sm:text-4xl",
  xs: "text-xs font-normal",
  lg: "text-lg font-normal leading-[25px]",
  s: "text-sm font-normal",
  "2xl": "text-[22px] font-normal",
  "3xl": "text-3xl font-normal md:text-[28px] sm:text-[26px]",
  "4xl": "text-[32px] font-normal md:text-3xl sm:text-[28px]",
  xl: "text-xl font-medium leading-[25px]",
  md: "text-base font-normal leading-5",
};

const Text = ({ children, className = "", as, size = "md", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-white-A700 font-inter ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
