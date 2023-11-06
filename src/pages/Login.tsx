import { Link } from "react-router-dom";

import LoginForm from "@/forms/auth/LoginForm";
import RootLayout from "@/layouts/RootLayout";
import { ClientRoutes } from "@/lib/constants/routes";

export default function Login() {
  return (
    <RootLayout>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link to={ClientRoutes.REGISTER}>Don't have an account?</Link>
              </p>

              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
