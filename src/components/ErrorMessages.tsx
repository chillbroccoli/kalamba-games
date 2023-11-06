import { FieldErrors, FieldValues } from "react-hook-form";

export default function ErrorMessages<T extends FieldValues>({ errors }: { errors: FieldErrors<T> }) {
  const errorsMap = Object.values(errors);

  return (
    <ul className="error-messages">
      {errorsMap?.length > 0 ? errorsMap.map((error, index) => <li key={index}>{error?.message as string}</li>) : null}
    </ul>
  );
}
