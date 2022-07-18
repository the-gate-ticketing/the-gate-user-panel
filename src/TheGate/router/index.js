import Vue from "vue";
import Router from "vue-router";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Home from "../pages/Home";
import Events from "../pages/Events";
import Policies from "../pages/Policies";
import About from "../pages/About";

Vue.use(Router);

export const HOME_PATH = "/";
export const EVENTS_PATH = "/events";
export const POLICIES_PATH = "/our-policies";
export const ABOUT_PATH = "/about-us";
export const CONTACT_PATH = "/contact-us";

export default new Router({
  mode: "history",
  linkExactActiveClass: "active",
  routes: [
    {
      path: HOME_PATH,
      name: HOME_PATH,
      components: { default: Home, header: Navbar, footer: Footer },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: POLICIES_PATH,
      name: POLICIES_PATH,
      components: { default: Policies, header: Navbar, footer: Footer },
      props: {
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: ABOUT_PATH,
      name: ABOUT_PATH,
      components: { default: About, header: Navbar, footer: Footer },
      props: {
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: EVENTS_PATH,
      name: EVENTS_PATH,
      components: { default: Events, header: Navbar, footer: Footer },
      props: {
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "*",
      redirect: HOME_PATH,
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});
