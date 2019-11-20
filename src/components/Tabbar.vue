<template>
  <div class="tabbar1">
    <tabbar>
      <tabbar-item selected link="/HomePage">
        <img slot="icon" src="../assets/tabbar/class.png" />
        <img  slot="icon-active" src="../assets/tabbar/calss_active.png" />
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item :selected="$route.path === '/shopping'||$route.path === '/ReserveList'" link="shopping">
      <!-- <tabbar-item :selected="$route.path === '/shopping'" link="shopping" :badge="`${badgeData}`"> -->
       <img slot="icon" src="../assets/tabbar/statistics.png" />
        <img  slot="icon-active" src="../assets/tabbar/statistics_active.png" />
       
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item :selected="$route.path === '/history'||$route.path === '/HistoryReserve'" link="history">
         <img slot="icon" src="../assets/tabbar/history.png" />
        <img  slot="icon-active" src="../assets/tabbar/history_active.png" />
        <span slot="label">历史订单</span>
      </tabbar-item>
      <tabbar-item :selected="
      $route.path === '/Cell'||
      $route.path ==='/AdminReserveList'|| 
      $route.path==='/AddEquipment'|| 
      $route.path==='/AdminToExamineList'|| 
      $route.path==='/addEquipmentUpload'||
      $route.path==='/Administratorspage'
      " link="Cell" v-if="roledata=='z'">
        <img slot="icon"   src="../assets/tabbar/administrators.png" />
        <img  slot="icon-active"   src="../assets/tabbar/administrators_active.png" />
        <span slot="label">管理员</span>
      </tabbar-item>
      <tabbar-item :selected="$route.path === '/cellSuper'" link="cellSuper" v-if="roledata=='s'">
        <img slot="icon"   src="../assets/tabbar/administrators.png" />
        <img  slot="icon-active"   src="../assets/tabbar/administrators_active.png" />
        <span slot="label">超级管理员</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell, ViewBox  } from "vux";

export default {
  name:"tabbar1",
  components: {
    Tabbar,
    TabbarItem,
    Group, Cell,ViewBox 
  },
  // props:['badgeData'],
  data(){
    return{
      roledata:'',
      badgeData:sessionStorage.getItem("badgeData")
    }
  },
  created(){
    var roledata = sessionStorage.getItem('role')
    this.roledata = roledata;
  },
};
</script>

<style lang="less" scope>
@import "~vux/src/styles/reset.less";
.tabbar1{
  .weui-tabbar{
    position: fixed
  }
}
</style>
