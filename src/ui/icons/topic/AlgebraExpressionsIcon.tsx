import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export function AlgebraExpressionIcon({ size = 24, ...props }: Props) {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-math-x-plus-y"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="m16 9 3 5.063M2 9l6 6M2 15l6-6M22 9l-4.8 9M10 12h4M12 10v4" />
    </svg>
  );
}
