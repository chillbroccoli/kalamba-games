import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import sanitize from "sanitize-html";

import ErrorMessages from "@/components/ErrorMessages";
import { api } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/constants/keys";
import { isNilOrEmpty } from "@/lib/helpers/isNilOrEmpty";
import { CreateArticleInput, createArticleSchema } from "@/lib/schemas/article.schema";
import { Article } from "@/lib/types/api";

type UpdateArticleFormProps = {
  slug: string;
  initialValues: Pick<Article, "body" | "title" | "description" | "tagList">;
};

export default function UpdateArticleForm({ slug, initialValues }: UpdateArticleFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = api.articles.useUpdateArticle(
    { slug },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.ARTICLES],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.ARTICLE, slug],
        });
        toast.success("Article updated successfully!");
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateArticleInput>({
    defaultValues: {
      ...initialValues,
      tagList: initialValues.tagList.join(","),
    },
    resolver: zodResolver(createArticleSchema),
  });

  const isFormSubmitting = isPending || isSubmitting;

  const onSubmit: SubmitHandler<CreateArticleInput> = data => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => !isNilOrEmpty(value))
    ) as CreateArticleInput;

    const { tagList, body, ...rest } = filteredData;
    const tagListArray = tagList ? tagList.split(",").filter(Boolean) : [];

    mutate({
      article: {
        ...rest,
        body: sanitize(body),
        tagList: tagListArray,
      },
    });
  };

  return (
    <>
      <ErrorMessages errors={errors} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Article Title"
              {...register("title")}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="What's this article about?"
              {...register("description")}
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control"
              rows={8}
              placeholder="Write your article (in markdown)"
              {...register("body")}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter tags (comma separated)"
              {...register("tagList")}
            />
            <div className="tag-list" />
          </fieldset>
          <button className="btn btn-lg pull-xs-right btn-primary" type="submit" disabled={isFormSubmitting}>
            Update Article
          </button>
        </fieldset>
      </form>
    </>
  );
}
