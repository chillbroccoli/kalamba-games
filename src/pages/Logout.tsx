import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";
import { ClientRoutes } from "@/lib/constants/routes";
import { logout } from "@/lib/reducers/auth";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    navigate(ClientRoutes.HOME);
  }, [dispatch, navigate]);

  return <RootLayout />;
}
