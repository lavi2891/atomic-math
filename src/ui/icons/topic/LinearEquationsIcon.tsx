import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export function LinearEquationsIcon({ size = 24, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="icon icon-tabler icons-tabler-outline icon-tabler-equal"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M5 10h14M5 14h14" />
    </svg>
  );
}
