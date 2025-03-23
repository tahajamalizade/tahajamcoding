const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/products",
        component: () => import("src/pages/ProductsPage.vue"),
      },
      {
        path: "/products/:id",
        component: () => import("src/pages/SingleProductPage.vue"),
      },
      { path: "/cart", component: () => import("pages/CartPage.vue") },
      { path: "/checkout", component: () => import("pages/CheckOut.vue") },
      { path: "/SignIn", component: () => import("pages/SignIn.vue") },
      { path: "/admin", component: () => import("pages/adminPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
