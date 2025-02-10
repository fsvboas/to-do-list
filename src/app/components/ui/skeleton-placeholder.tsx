interface SkeletonPlaceholderProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  rounded?: boolean;
  className?: string;
  color?: string;
}

export const SkeletonPlaceholder = ({
  width,
  height,
  rounded,
  borderRadius = 8,
  className = "",
  color = "bg-gray-300",
}: SkeletonPlaceholderProps) => {
  return (
    <div
      className={`animate-pulse ${color} ${
        rounded ? "rounded-full" : ""
      } ${className}`}
      style={{
        width,
        height,
        borderRadius: !rounded ? borderRadius : undefined,
      }}
    />
  );
};
