<template>
  <div class="section section-about-us">
    <div class="container">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto text-center">
          <h2 class="title">Our Polices</h2>
        </div>
      </div>
      <el-card :body-style="{ padding: '35px' }">
        <router-link :to="PRIVACY_POLICIES_PATH">
          <h5 class="mt-0"><u>Privacy Policy</u></h5>
        </router-link>
        <p class="blockquote">
          We want you to understand that protecting your personal information is
          important to us. You should also be aware of our complete regard for
          your privacy. To describe how we manage the data you give to us,
          please refer to our Privacy Policy. Everyone who access our services
          in any way is subject to the policy. Every sort of data you give us is
          likewise covered by this policy.
        </p>
        <router-link :to="PURCHASE_POLICIES_PATH">
          <h5 class="mt-0"><u>Purchase Policy</u></h5>
        </router-link>
        <p class="blockquote">
          Our goal is to make your purchasing experience pleasurable
          and simple, so you can get to the activities early as possible. Our
          purchasing regulations must be followed to make sure everything is
          correct and that you are aware of how things operate at The Gate.
        </p>
      </el-card>
    </div>
  </div>
</template>

<script>
import { PURCHASE_POLICIES_PATH, PRIVACY_POLICIES_PATH } from "../router";
import { Card } from "element-ui";

export default {
  components: {
    [Card.name]: Card,
  },
  data() {
    return { PURCHASE_POLICIES_PATH, PRIVACY_POLICIES_PATH };
  },
};
</script>

<style scoped>
.blockquote {
  font-weight: 500;
}
</style>
