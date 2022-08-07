<template>
  <footer
    class="footer fixed-footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-4 text-md-left col-sm-12 text-center">
          <h5 class="bd-text-grey mb-2">Contact Us</h5>
          <ul class="list-unstyled ml-3">
            <li class="d-block pt-2">
              <i class="now-ui-icons tech_mobile"></i>
              01090041114
            </li>
            <li class="d-block pt-3">
              <i class="now-ui-icons ui-1_email-85"></i>
              thegategy@gmail.com
            </li>
            <!-- <li class="d-block pt-2">
              <i class="now-ui-icons location_pin"></i> The Gate Address
            </li> -->
          </ul>
        </div>
        <div class="col-md-4 text-center mt-md-0 col-sm-12 mt-3">
          <h5 class="bd-text-grey mb-2">Social Media</h5>
          <a
            target="_blank"
            href="https://www.twitter.com"
            class="btn btn-neutral btn-icon btn-twitter btn-round"
            rel="tooltip"
            title="Follow us"
          >
            <i class="fab fa-twitter"></i>
          </a>
          <a
            target="_blank"
            href="https://www.facebook.com/TheGategy/"
            class="btn btn-neutral btn-icon btn-facebook btn-round"
            rel="tooltip"
            title="Like us"
          >
            <i class="fab fa-facebook-square"></i>
          </a>
          <a
            target="_blank"
            href="https://instagram.com/thegategy?igshid=YmMyMTA2M2Y="
            class="btn btn-neutral btn-icon btn-instagram btn-round"
            rel="tooltip"
            title="Follow us"
          >
            <i class="fab fa-instagram"></i>
          </a>
        </div>
        <div class="col-md-4 text-right mt-md-0 col-sm-12 mt-3">
          <div class="content-center brand text-center">
            <img
              style="max-width: 75%"
              :src="
                currentEnv === 'development'
                  ? 'the-gate-logo.png'
                  : `webjars/the-gate-user-panel/v${version}/the-gate-logo.png`
              "
              alt=""
            />
          </div>
        </div>
      </div>
      <hr class="horizontal-line" />
      <div class="col-md-12">
        <div class="text-center">
          Copyright &#169; {{ year }} THE GATE. All Rights Reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { version } from "../../../package.json";

export default {
  props: {
    backgroundColor: String,
    type: String,
  },
  data() {
    return {
      version,
      year: new Date().getFullYear(),
    };
  },
  computed: {
    currentEnv() {
      return process.env.NODE_ENV;
    },
  },
};
</script>
<style scoped>
.fixed-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 16rem;
}

@media (max-width: 480px) and (min-width: 320px) {
  .fixed-footer {
    height: 32rem;
  }
}

.horizontal-line {
  border-top: 1px solid gray;
}
</style>
