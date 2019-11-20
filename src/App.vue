<template>
  <div id="app" style="height:100%;">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
    created(){
    window._vm_ = this;
  },
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
html,body,#app{
  height: 100%;
}
</style>
