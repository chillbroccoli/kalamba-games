import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import ErrorMessages from "@/components/ErrorMessages";
import { api } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/constants/keys";
import { isNilOrEmpty } from "@/lib/helpers/isNilOrEmpty";
import { UpdateUserInput, updateUserSchema } from "@/lib/schemas/user.schema";
import { User } from "@/lib/types/api";

export default function UpdateUserForm({ initialValues }: { initialValues: User }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = api.user.useUpdateUser({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CURRENT_USER],
      });
      toast.success("Settings updated successfully!");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserInput>({
    defaultValues: {
      ...initialValues,
    },
    resolver: zodResolver(updateUserSchema),
  });

  const isFormSubmitting = isPending || isSubmitting;

  const onSubmit: SubmitHandler<UpdateUserInput> = data => {
    const filteredData = Object.fromEntries(Object.entries(data).filter(([, value]) => !isNilOrEmpty(value)));
    mutate({ user: filteredData });
  };

  return (
    <>
      <ErrorMessages errors={errors} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <fieldset className="form-group">
            <input className="form-control" type="text" placeholder="URL of profile picture" {...register("image")} />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              {...register("username")}
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows={8}
              placeholder="Short bio about you"
              {...register("bio")}
            />
          </fieldset>
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
            Update Settings
          </button>
        </fieldset>
      </form>
    </>
  );
}
