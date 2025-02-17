/** @format */
"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";
import LoadingPage from "@/components/loading";

const guestOnly = "guestOnly";
const needLogin = "needLogin";

class Route {
  constructor(path, type) {
    this.path = path;
    this.type = type;
  }
}

const routes = [];
routes.push(new Route("auth", guestOnly));
routes.push(new Route("content", needLogin));
routes.push(new Route("membership", needLogin));

export default function ProtectedPage({ children }) {
  const userSelector = useSelector((state) => state.auth);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRoute = routes.find((route) => pathname.includes(route.path));
    if (pathname == "/" && !userSelector.email) {
      return redirect("/auth/login");
    } else if (checkRoute?.type == needLogin && !userSelector.email) {
      return redirect("/auth/login");
    } else if (checkRoute?.type == guestOnly && userSelector.email) {
      return redirect("/");
    } else
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
  }, [children, userSelector.email, pathname]);

  return <div>{isLoading ? <LoadingPage /> : children}</div>;
}
