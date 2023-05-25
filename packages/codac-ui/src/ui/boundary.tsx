import clsx from "clsx";
import React from "react";

const Label = ({
  children,
  animateRerendering,
  color,
}: {
  children: React.ReactNode;
  animateRerendering?: boolean;
  color?: "default" | "pink" | "blue" | "violet" | "cyan" | "orange";
}) => {
  return (
    <div
      className={clsx("rounded-full px-1.5 shadow-[0_0_1px_3px_black]", {
        "bg-gray-800 text-gray-300": color === "default",
        "bg-codac-pink text-white": color === "pink",
        "bg-codac-blue text-white": color === "blue",
        "bg-codac-cyan text-white": color === "cyan",
        "bg-codac-violet text-violet-100": color === "violet",
        "bg-codac-orange text-white": color === "orange",
        "animate-[highlight_1s_ease-in-out_1]": animateRerendering,
      })}
    >
      {children}
    </div>
  );
};
export const Boundary = ({
  children,
  labels = ["children"],
  size = "default",
  color = "default",
  animateRerendering = true,
}: {
  children: React.ReactNode;
  labels?: string[];
  size?: "small" | "default";
  color?: "default" | "pink" | "blue" | "violet" | "cyan" | "orange";
  animateRerendering?: boolean;
}) => {
  return (
    <div
      className={clsx("relative rounded-lg border border-dashed", {
        "p-3 lg:p-5": size === "small",
        "p-4 lg:p-9": size === "default",
        "border-gray-700": color === "default",
        "border-codac-pink": color === "pink",
        "border-codac-blue": color === "blue",
        "border-codac-cyan": color === "cyan",
        "border-codac-violet": color === "violet",
        "border-codac-orange": color === "orange",
        "text-codac-pink animate-[rerender_1s_ease-in-out_1]": animateRerendering,
      })}
    >
      <div
        className={clsx(
          "absolute -top-2.5 flex gap-x-1 text-[9px] uppercase leading-4 tracking-widest",
          {
            "left-3 lg:left-5": size === "small",
            "left-4 lg:left-9": size === "default",
          }
        )}
      >
        {labels.map((label) => {
          return (
            <Label key={label} color={color} animateRerendering={animateRerendering}>
              {label}
            </Label>
          );
        })}
      </div>

      {children}
    </div>
  );
};
