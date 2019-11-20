<template>
  <div>
    <group>
        <cell title="订单管理" link="/AdminToExamineList"></cell>
        <cell title="设备管理" link="/Administratorspage"></cell>
        <cell title="添加设备" link="/AddEquipment"></cell>
        <tabbar></tabbar>
    </group>
  </div>
</template>

<script>
import { Cell,Group,XHeader } from 'vux'
import tabbar from "./../components/Tabbar";
export default {
  components: {
    Cell,
    Group,
    tabbar,
    XHeader
  }
}
</script>

<style scoped lang="less">
/deep/ .weui-cells{
  margin-top: 0
}
</style>
