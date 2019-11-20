<template>
  <div>
    <group>
        <cell title="添加管理员" link="/Administrators"></cell>
        <cell title="管理员列表" link="/administratorsList"></cell>
        <cell title="标签管理" link="/Bqgl"></cell>
        <tabbar></tabbar>
    </group>
  </div>
</template>

<script>
import { Cell,Group } from 'vux'
import tabbar from "./../components/Tabbar";
export default {
  components: {
    Cell,
    Group,
    tabbar
  }
}
</script>

<style scoped lang="less">
/deep/ .weui-cells{
  margin-top: 0
}
</style>
