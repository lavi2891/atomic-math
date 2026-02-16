import * as React from "react";
import type { TopicIconName } from "./types";

import { SignedNumbersIcon } from "./topic/SignedNumbersIcon";
import { AlgebraExpressionIcon } from "./topic/AlgebraExpressionsIcon";
import { LinearEquationsIcon } from "./topic/LinearEquationsIcon";
import { TriangleIcon } from "./topic/TrianglesIcon";

type Props = {
  name: TopicIconName;
  size?: number;
  className?: string;
};

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const ICONS: Record<TopicIconName, React.ComponentType<IconProps>> = {
  signedNumbers: SignedNumbersIcon,
  algebraExpressions: AlgebraExpressionIcon,
  linearEquations: LinearEquationsIcon,
  triangles: TriangleIcon,
};

export function TopicIcon({ name, size = 24, className }: Props) {
  const IconComponent = ICONS[name];

  if (!IconComponent) {
    return <span style={{ width: size, height: size }}>□</span>;
  }

  return <IconComponent size={size} className={className} />;
}
