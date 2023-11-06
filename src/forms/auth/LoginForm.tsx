import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ErrorMessages from "@/components/ErrorMessages";
import { api } from "@/lib/api";
import { ClientRoutes } from "@/lib/constants/routes";
import { login } from "@/lib/reducers/auth";
import { UserLoginInput, userLoginSchema } from "@/lib/schemas/user.schema";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending } = api.user.useLogin({
    onSuccess: data => {
      dispatch(login(data.user));
      navigate(ClientRoutes.HOME);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserLoginInput>({
    resolver: zodResolver(userLoginSchema),
  });

  const isFormSubmitting = isPending || isSubmitting;

  const onSubmit: SubmitHandler<UserLoginInput> = data => {
    mutate({ user: data });
  };

  return (
    <>
      <ErrorMessages errors={errors} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="form-group">
          <input className="form-control form-control-lg" type="email" placeholder="Email" {...register("email")} />
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </fieldset>
        <button type="submit" className="btn btn-lg btn-primary pull-xs-right" disabled={isFormSubmitting}>
          Sign in
        </button>
      </form>
    </>
  );
}
