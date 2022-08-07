<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <router-link class="navbar-brand" :to="HOME_PATH"> THE GATE </router-link>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item">
        <router-link class="nav-link" :to="HOME_PATH"> Home </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="EVENTS_PATH"> Events </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="POLICIES_PATH">
          Policies
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="ABOUT_PATH"> About </router-link>
      </li>
    </template>
  </navbar>
</template>

<script>
import { Navbar } from "@/components";
import {
  HOME_PATH,
  POLICIES_PATH,
  ABOUT_PATH,
  CONTACT_PATH,
  EVENTS_PATH,
} from "../router";
export default {
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
  },
  components: { Navbar },
  data() {
    return { HOME_PATH, POLICIES_PATH, ABOUT_PATH, CONTACT_PATH, EVENTS_PATH };
  },
};
</script>
