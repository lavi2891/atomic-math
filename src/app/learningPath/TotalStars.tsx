type Props = {
  count: number;
  delta?: number;
  className?: string;
};

export function TotalStars({ count, delta = 0, className = "" }: Props) {
  return <span className={`total-stars${className ? ` ${className}` : ""}`} role="status" aria-label={`${count} כוכבים בסך הכול`}>
    <span aria-hidden="true">⭐</span>
    <strong dir="ltr">{count}</strong>
    {delta > 0 ? <small className="total-stars__delta" dir="ltr">+{delta}</small> : null}
  </span>;
}
