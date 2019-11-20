<template>
  <div class="PageList">
    <view-box>
      <XiangQing :detailsData="detailsData"></XiangQing>
    </view-box>
  </div>
</template>

<script>
import {TabbarItem,Group,Cell,Flexbox,FlexboxItem,Datetime,XButton,ViewBox } from "vux";
import XiangQing from './../components/XiangQing'
export default {
  name: 'PageList',
  data() {
    return {
      detailsData:''
    };
  },
  components:{
    XiangQing,
    ViewBox
  },
  created(){
    this.getDetails()
  },
  methods: {
    async getDetails(){
      let res = await this.$Http.getContactDetails({
        id:this.$route.query.id
      })
      this.detailsData = res.data
      console.log(res.data)
    }
  },
};
</script>

<style scoped>

</style>
