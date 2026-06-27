<template>
  <policy-document title="Privacy policies" :sections="content.privacyPolicies" />
</template>

<script>
import content from "@theme/content";
import PolicyDocument from "@/venue/components/PolicyDocument";

export default {
  name: "VenuePrivacyPolicies",
  components: { PolicyDocument },
  data() {
    return { content };
  },
};
</script>
