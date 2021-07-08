<template>
<div>
  {{publicReport.user.name}}
</div>
</template>

<script>
export default {
  name: "publicReportListItem",
  props:["publicReport"]
}
</script>

<style scoped>

</style>