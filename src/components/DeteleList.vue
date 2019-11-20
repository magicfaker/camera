<template>
  <div class="DeteleList">
    <flexbox v-for="item in shopList" :key="item.id">
      <flexbox-item :span="3">
        <div class="flex-demo left_img">
          <img src="../assets/pic.jpg" alt="">
        </div>
      </flexbox-item>
      <flexbox-item class="content_left">
        <flexbox>
           <flexbox-item>
              <div class="flex-demo">
                <p class="title">{{item.deviceBrand}}索尼（SONY） DSC-W830 便携数码相机/照相机/卡片</p>
                <p class="brand">品牌：{{item.deviceCompany}}</p>
                <p class="time">￥12/小时</p>
              </div>
           </flexbox-item>
            <flexbox-item :span="2">
              <div class="flex-demo">
                   <x-icon type="ios-minus-outline" size="30" @click="deleteCart()"></x-icon>
              </div>
            </flexbox-item>
          </flexbox>
       </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from "vux";
import service from "../service/http";
import api from "../service/api";
export default {
  name: "DeteleList",
  components: {
    Flexbox,
    FlexboxItem
  },
  props:[
    'shopList'
  ],
  created(){
   
  },
  methods:{
    async deleteCart(){
      let res = await this.$Http.deleteCart(
      {
        id:3,
        userid:sessionStorage.getItem("userid")
      }
     )
     if(res.code == 0){
       this.$router.go(0)
     }
    }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
.DeteleList{
  margin-top: 5px;
  .left_img{
    border: 1.5px solid #304a8c;
    height: 80px;
    margin-left: 10%;
    img{
      margin: 10%;
      width: 80%;
    }
  }
  .content_left{
    border-bottom: 1px solid #eee;
    .title{
      overflow: hidden; 
      text-overflow: ellipsis; 
      display: -webkit-box; 
      -webkit-line-clamp: 2; 
      -webkit-box-orient: vertical;
      height: 3rem;
    }
     .brand{
      color: #666666;
      font-size: 12px;
      margin-top: 10px;
    }
    .time{
      color:#ff7c61;
      font-size: 12px;
    }
  }
  .vux-x-icon {
    fill: #ff866c;
  }
}
</style>