import pick from "just-pick";
import { useParams } from "react-router-dom";

import CreateArticleForm from "@/forms/article/CreateArticleForm";
import UpdateArticleForm from "@/forms/article/UpdateArticleForm";
import RootLayout from "@/layouts/RootLayout";
import { api } from "@/lib/api";

export default function Editor() {
  const params = useParams<{ slug: string }>();
  const { data } = api.articles.useOne({ slug: params.slug }, { enabled: !!params.slug });
  const initialValues = data?.article ? pick(data.article, ["title", "description", "body", "tagList"]) : undefined;
  const showUpdateForm = params?.slug && initialValues;

  return (
    <RootLayout>
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              {showUpdateForm ? (
                <UpdateArticleForm slug={params.slug} initialValues={initialValues} />
              ) : (
                <CreateArticleForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
