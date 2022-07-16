<template>
  <div class="section section-about-us">
    <div class="container">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto text-center">
          <h2 class="title">Our Polices</h2>
        </div>
      </div>
      <el-card :body-style="{ padding: '35px' }">
        <h5 class="mt-0">Privacy Policy</h5>
        <p class="blockquote">
          Welcome to Ticketsmarche! Please know that it is very important to us
          to protect your personal information. You must also know that we
          totally respect your privacy. Our Privacy Policy is there to explain
          how we handle the information you share with us. The policy applies to
          everyone who uses our services, including call center, website, or
          walk-in customers. The policy also applies to every piece of
          information provided to us by you...
        </p>
        <h5 class="mt-0">Purchase Policy</h5>
        <p class="blockquote">
          Our goal at Ticketsmarche.com is to make your shopping experience
          enjoyable, easy, and efficient, so that you can be on your way to the
          events as quickly as possible. Our purchase policies are put to ensure
          that you are satisfied and for you to understand how things work in
          Ticketsmarche.com...
        </p>
        <h5 class="mt-0">Terms of Use</h5>
        <p class="blockquote">
          Welcome to Ticketsmarche.com The following are the Terms of Use (these
          "Terms") that govern use of the Ticketsmarche.com web sites By using
          or visiting the Site, you expressly agree to be bound by these Terms
          and to follow these Terms and all applicable laws and regulations
          governing the Site...
        </p>
      </el-card>
    </div>
  </div>
</template>

<script>
import { Card } from "element-ui";

export default {
  components: {
    [Card.name]: Card,
  },
};
</script>
