<template>
  <div class="AdminToExamine">
    <button-tab class="header_tab">
      <button-tab-item selected @on-item-click="returned()">全部</button-tab-item>
      <button-tab-item @on-item-click="returned(0)">未受理</button-tab-item>
      <button-tab-item @on-item-click="returned(1)">已受理</button-tab-item>
      <button-tab-item @on-item-click="returned(2)">已借出</button-tab-item>
      <button-tab-item @on-item-click="returned(3)">已归还</button-tab-item>
      <button-tab-item @on-item-click="returned(5)">已关闭</button-tab-item>
    </button-tab>
    <view-box>
      <AdminCard class="card" :orderList="orderList" v-if="orderList && orderList.length>0"></AdminCard>
    </view-box>
    <!-- <tabbar></tabbar> -->
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
  XButton,
  ViewBox
} from "vux";
import tabbar from "./../components/Tabbar";
import AdminCard from "./../components/AdminCard";
export default {
  name: "history",
  data() {
    return {
      orderList: []
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
    AdminCard,
    XButton,
    ViewBox
  },
  created() {
    this.returned();
  },
  methods: {
    async returned(id) {
      let res = await this.$Http.getAdminOrderListData({
        state: id,
        userid: sessionStorage.getItem("userid")
      })
      this.orderList = res.data;
    }
  }
};
</script>

<style scoped lang="less">
.AdminToExamine {
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
