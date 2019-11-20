<template>
  <div>
    <div class="tab-content">
      <x-header>共享服务</x-header>
      <!-- <tab :line-width="1" custom-bar-width="20px">
          <tab-item selected>全部品牌</tab-item>
          <tab-item>唐狮</tab-item>
          <tab-item>果壳</tab-item>
      </tab>-->
      <button-tab>
        <button-tab-item>全部品牌</button-tab-item>
        <button-tab-item selected>唐狮</button-tab-item>
        <button-tab-item>果壳</button-tab-item>
      </button-tab>
      <tab :scroll-threshold="5">
        <tab-item v-for="n in 8" :key="n" :selected="n===1">已发货{{ n }}</tab-item>
      </tab>
    </div>
  </div>
</template>

<script>
import {
  XHeader,
  Group,
  Cell,
  XButton,
  Sticky,
  Tab,
  TabItem,
  ButtonTab,
  ButtonTabItem
} from "vux";

export default {
  components: {
    XHeader,
    Tab,
    TabItem,
    XButton,
    ButtonTab,
    ButtonTabItem
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
.active {
  color: #00a4a6 !important;
}
.acc-child {
  position: absolute;
  top: 51px;
  padding: 2%;
}
</style>
