export const numberWithComma = (number: string) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export type NotiType = "success" | "error" | "info" | "warning";
export type NotiVariant = "default" | "soft" | "outline" | "dash";

export const getAlertClass = (type: NotiType, variant: NotiVariant) => {
  const baseClasses = "alert";

  const typeClasses = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
    warning: "alert-warning",
  };

  const variantClasses = {
    default: "",
    soft: "alert-soft",
    outline: "alert-outline",
    dash: "alert-dash",
  };

  return `${baseClasses} ${typeClasses[type]} ${variantClasses[variant]}`;
};

export const getButtonClass = (type: NotiType, variant: NotiVariant) => {
  const baseClass = "btn w-full";

  if (variant === "default") return `${baseClass} btn-${type}`;
  if (variant === "soft") return `${baseClass} btn-${type} btn-soft`;
  if (variant === "outline") return `${baseClass} btn-${type} btn-outline`;
  if (variant === "dash") return `${baseClass} btn-${type} btn-dash`;

  return baseClass;
};

export function delay(del: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, del);
  });
}
