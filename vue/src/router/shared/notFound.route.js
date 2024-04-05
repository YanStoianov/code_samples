const NotFoundRoute = {
  path: "*",
  name: "Not Found",
  component: () => import("@/pages/NotFound"),
};

export default NotFoundRoute;
