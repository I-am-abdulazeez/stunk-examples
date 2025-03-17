export const numberWithComma = (number: string) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getAlertClass = (
  type: "success" | "error" | "info" | "warning",
  variant: "default" | "soft" | "outline" | "dashed"
) => {
  const baseClass = `alert alert-${type}`;

  const variants = {
    default: baseClass,
    soft: `${baseClass} alert-soft`,
    outline: `${baseClass} alert-outline`,
    dashed: `${baseClass} alert-dash`,
  };

  return variants[variant];
};
