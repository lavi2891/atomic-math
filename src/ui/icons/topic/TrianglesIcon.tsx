import * as React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export function TriangleIcon({ size = 24, ...props }: Props) {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-triangle"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M10.363 3.591 2.257 17.125a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87L13.637 3.59a1.914 1.914 0 0 0-3.274 0" />
    </svg>
  );
}
