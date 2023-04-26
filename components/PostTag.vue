<template>
  <v-chip id="tag">
    {{ tag }}
  </v-chip>
</template>
      
<script>

export default {
  name: 'PostTag',

  props: ['tag'],
}
</script>
  
<style scoped>
  #tag {
    margin-left: 10px;
    margin-bottom: 10px;
  }
</style>
