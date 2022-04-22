import type { ReactElement } from "react";
import type { FieldError } from "react-hook-form";

export const getValidationMessage = (
  error: FieldError,
  name?: string,
  minLength?: number
) => {
  let customMessage: ReactElement | string | undefined;

  switch (error.type) {
    case "required":
      customMessage = "Toto pole je povinné";
      break;
    case "minLength":
      customMessage = `Minimální délka ${name} je ${minLength}`;
      break;
    case "pattern":
      customMessage = `Špatný formát ${name}`;
      break;
    default:
      customMessage = error.message;
  }

  return customMessage;
};
