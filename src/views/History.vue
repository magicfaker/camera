<template>
  <div class="history">
    <button-tab class="header_tab">
      <button-tab-item selected @on-item-click="returned()">全部</button-tab-item>
      <button-tab-item @on-item-click="returned(0)">未受理</button-tab-item>
      <button-tab-item @on-item-click="returned(1)">已受理</button-tab-item>
      <button-tab-item @on-item-click="returned(2)">已借出</button-tab-item>
      <button-tab-item @on-item-click="returned(3)">已归还</button-tab-item>
      <button-tab-item @on-item-click="returned(6)">已关闭</button-tab-item>
      <button-tab-item @on-item-click="returned(5)">已撤销</button-tab-item>
    </button-tab>
     <view-box ref="viewBox">
    <card class="card" :orderList1="orderList1"></card>
     </view-box>
    <tabbar></tabbar>
  </div>
</template>

<script>
import {
  XHeader,
  TabbarItem,
  Flexbox,
  FlexboxItem,
  ButtonTab,
  ButtonTabItem,
  ViewBox
} from "vux";
import tabbar from "./../components/Tabbar";
import card from "./../components/Card";
import service from "../service/http";
import api from "../service/api";
export default {
  name: "history",
  data() {
    return {
      orderList1: "",
    };
  },
  components: {
    tabbar,
    XHeader,
    TabbarItem,
    Flexbox,
    FlexboxItem,
    ButtonTab,
    ButtonTabItem,
    card,
    ViewBox
  },
  created() {
    this.returned();
  },
  methods: {
    async returned(stateId) {
      let res = await this.$Http.getOrderListData({
        state: stateId,
        userid: sessionStorage.getItem("userid")
      })
      sessionStorage.setItem('index1', stateId);
      this.orderList1 = res.data;
      console.log(this.index1)
    }
  }
};
</script>

<style scoped lang="less">
.history {
  font-size: 14px;
  .vux-button-group {
    padding: 5px 10px 0;
  }
  p {
    padding-left: 10px;
    .tit {
      margin: 0 10px;
    }
  }
  .name {
    background: #ff866c;
    border-radius: 30px;
    width: 40%;
  }
}
</style>
