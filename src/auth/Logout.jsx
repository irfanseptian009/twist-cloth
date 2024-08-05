import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    let redirectLink = "/";
    if (searchParams.get("as")) {
      redirectLink = "/login/" + searchParams.get("as");
      console.log(redirectLink, "< redirectLink dan bukti masuk ke if");
    }
    const token = localStorage.getItem("access_token");
    if (token) {
      localStorage.removeItem("access_token");
    }

    navigate(redirectLink);
  }, []);

  return <></>;
}
