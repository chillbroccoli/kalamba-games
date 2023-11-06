import { Link } from "react-router-dom";

import Spinner from "@/components/Spinner";
import UpdateUserForm from "@/forms/user/UpdateUserForm";
import RootLayout from "@/layouts/RootLayout";
import { api } from "@/lib/api";
import { ClientRoutes } from "@/lib/constants/routes";

export default function Settings() {
  const { data, isLoading } = api.user.useMe();

  return (
    <RootLayout>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              {data && !isLoading ? <UpdateUserForm initialValues={data.user} /> : <Spinner />}
              <hr />
              <Link to={ClientRoutes.LOGOUT} className="btn btn-outline-danger">
                Or click here to logout.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
