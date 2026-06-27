import Vue from "vue";
import Router from "vue-router";
import VenueNavbar from "@/venue/layout/VenueNavbar";
import VenueFooter from "@/venue/layout/VenueFooter";
import Home from "@/venue/pages/Home";
import Events from "@/venue/pages/Events";
import Policies from "@/venue/pages/Policies";
import PurchasePolicies from "@/venue/pages/PurchasePolicies";
import PrivacyPolicies from "@/venue/pages/PrivacyPolicies";
import About from "@/venue/pages/About";

Vue.use(Router);

// Paths mirror the THE GATE shell exactly (same backend, same deep links).
export const HOME_PATH = "/";
export const EVENTS_PATH = "/events";
export const POLICIES_PATH = "/our-policies";
export const PURCHASE_POLICIES_PATH = `${POLICIES_PATH}/purchase-policies`;
export const PRIVACY_POLICIES_PATH = `${POLICIES_PATH}/privacy-policies`;
export const ABOUT_PATH = "/about-us";

const withShell = (component) => ({
  default: component,
  header: VenueNavbar,
  footer: VenueFooter,
});

export default new Router({
  mode: "history",
  linkExactActiveClass: "active",
  routes: [
    { path: HOME_PATH, name: HOME_PATH, components: withShell(Home) },
    { path: EVENTS_PATH, name: EVENTS_PATH, components: withShell(Events) },
    { path: POLICIES_PATH, name: POLICIES_PATH, components: withShell(Policies) },
    {
      path: PURCHASE_POLICIES_PATH,
      name: PURCHASE_POLICIES_PATH,
      components: withShell(PurchasePolicies),
    },
    {
      path: PRIVACY_POLICIES_PATH,
      name: PRIVACY_POLICIES_PATH,
      components: withShell(PrivacyPolicies),
    },
    { path: ABOUT_PATH, name: ABOUT_PATH, components: withShell(About) },
    { path: "*", redirect: HOME_PATH },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
});
