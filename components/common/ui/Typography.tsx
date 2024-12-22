const textStyles = {
  size: {
    xxlarge:
      "text-[32px] lg:text-[56px] lg:leading-[67.2px] max-lg:leading-[38.4px]",
    xlarge:
      "text-[28px] lg:text-[40px] lg:leading-[48px] max-md:leading-[33.6px]",
    large: "text-lg",
    xl: "text-2xl",
    basePro:
      "text-[24px] lg:text-[32px] lg:leading-[38.4px] max-md:leading-[28.8px]",
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
    dark: "text-black",
    grey: "text-grey-10",
    light: "text-grey-6",
    medium: "text-grey-11",
    brand: "text-brand",
    large: "text-grey-12",
    green: "text-success-300",
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
