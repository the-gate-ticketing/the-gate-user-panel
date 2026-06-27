<template>
  <policy-document title="Purchase policies" :sections="content.purchasePolicies" />
</template>

<script>
import content from "@theme/content";
import PolicyDocument from "@/venue/components/PolicyDocument";

export default {
  name: "VenuePurchasePolicies",
  components: { PolicyDocument },
  data() {
    return { content };
  },
};
</script>
