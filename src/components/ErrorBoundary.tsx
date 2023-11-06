import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";

export default function ErrorBoundary() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <RootLayout>
      <div className="container page p-y-3">
        <h2 className="text-danger text-xs-center m-b-1">{error?.status}</h2>
        <h1 className="text-primary text-xs-center">{error?.statusText}</h1>
        <div style={{ display: "flex" }} className="flex-items-xs-middle flex-items-xs-center">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </RootLayout>
  );
}
