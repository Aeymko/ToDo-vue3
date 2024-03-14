<script>

export default {
  mounted(){
    this.$store.commit('initialiseStore')
  }
}
</script>

<template>
  <TaskLayout />
</template>
