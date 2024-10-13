const textStyles = {
  size: {
    xxlarge: "text-xl md:text-[32px] leading-[38.4px]",
    xlarge: "text-2xl",
    large: "text-lg",
    basePro: "text-xl",
    base: "text-base",
    small: "text-sm",
    xsmall: "text-xs",
    xxsmall: "text-[10px]",
  },
  weight: {
    normal: "font-normal",
    medium: "font-medium",
    black: "font-black",
    bold: "font-bold",
    semibold: "font-semibold",
  },
  opacity: {
    true: "opacity-50",
  },
  fontColor: {
    dark: "text-dark-900",
    darkMedium: "text-dark-900/70",
    orange: "text-orange-500",
    brand: "text-brand-primary",
    medium: "text-dark-500",
    lightMedium: "text-dark-500/70",
    lightGrey: "text-grey-300",
    green: "text-success-300",
    grey: "text-grey-400",
    light: "text-surface-secondary/70",
    white: "text-white",
    warning: "text-warning-400",
    error: "text-error",
  },
} as const;

type HeaderStyles = typeof textStyles;

type HeaderProps = {
  [K in keyof HeaderStyles]?: keyof HeaderStyles[K];
} & { children: React.ReactNode; className?: string };

function H1({
  children,
  size = "xlarge",
  weight = "medium",
  fontColor = "dark",
  className,
}: HeaderProps) {
  return (
    <h1
      className={`${textStyles.size[size]} ${textStyles.weight[weight]} ${textStyles.fontColor[fontColor]} ${className}`}
    >
      {children}
    </h1>
  );
}
function H2({
  children,
  size = "xlarge",
  weight = "medium",
  fontColor = "dark",
  className,
}: HeaderProps) {
  return (
    <h2
      className={`${textStyles.size[size]} ${textStyles.weight[weight]} ${textStyles.fontColor[fontColor]} ${className}`}
    >
      {children}
    </h2>
  );
}
function H3({
  children,
  size = "large",
  weight = "normal",
  fontColor = "dark",
  className,
}: HeaderProps) {
  return (
    <h3
      className={`${textStyles.size[size]} ${textStyles.weight[weight]} ${textStyles.fontColor[fontColor]} ${className}`}
    >
      {children}
    </h3>
  );
}
function H4({
  children,
  size = "large",
  weight = "normal",
  fontColor = "dark",
  className,
}: HeaderProps) {
  return (
    <h4
      className={`${textStyles.size[size]} ${textStyles.weight[weight]} ${textStyles.fontColor[fontColor]} ${className}`}
    >
      {children}
    </h4>
  );
}
function H5({
  children,
  size = "large",
  weight = "normal",
  fontColor = "dark",
  className,
}: HeaderProps) {
  return (
    <h5
      className={`${textStyles.size[size]} ${textStyles.weight[weight]} ${textStyles.fontColor[fontColor]} ${className}`}
    >
      {children}
    </h5>
  );
}

function P({
  children,
  size = "base",
  weight = "normal",
  fontColor = "dark",
  className,
}: HeaderProps) {
  return (
    <p
      className={`${textStyles.size[size]} ${textStyles.weight[weight]} ${textStyles.fontColor[fontColor]} ${className}`}
    >
      {children}
    </p>
  );
}

const Typography = { H1, H2, H3, H4, H5, P };

export default Typography;
