<template>
  <div class="section section-about-us">
    <div class="container">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto text-center">
          <h2 class="title">Privacy Policy</h2>
        </div>
      </div>
      <el-card :body-style="{ padding: '35px' }">
        <h5 class="mt-0">Information we may ask for</h5>
        <p class="blockquote">
          During the purchasing process, we may ask for some contact info such
          as your mail or phone number for confirmation messages and tickets
          delivery, due to Fulfill your requests for our services and products.
          If you choose to pay online, in order to complete your reservation and
          billing process we must ask for your card info which we will never
          share, in order to complete your reservation and billing process. we
          respect our user's privacy and we understand the importance of the
          information they share with us.
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

<style scoped>
.blockquote {
  font-weight: 500;
}
</style>
