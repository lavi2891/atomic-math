import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export function SignedNumbersIcon({ size = 24, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="icon icon-tabler icons-tabler-outline icon-tabler-plus-minus"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M4 7h6M7 4v6M20 18h-6M5 19 19 5" />
    </svg>
  );
}
