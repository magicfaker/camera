<template>
  <div class="list2">
    <flexbox class="content" v-for="item in shopListConfirm" :key="item.id">
      <flexbox-item :span="3">
        <div class="flex-demo left_img">
          <img :src="`${item.picUrl}`" alt />
        </div>
      </flexbox-item>
      <flexbox-item class="content_left">
        <flexbox>
          <flexbox-item>
            <div class="flex-demo">
              <p>{{item.deviceBrand}}</p>
              <p class="title2">{{item.deviceName}}</p>
              <p class="brand">所属品牌：{{item.deviceCompany}}</p>
              <p class="time">租赁价格：{{item.price}}元/小时</p>
            </div>
          </flexbox-item>
          <!-- <flexbox-item :span="3">
              <div class="flex-demo">
                
              </div>
          </flexbox-item>-->
        </flexbox>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from "vux";
export default {
  name: "list2",
  props: ["shopListConfirm"],
  components: {
    Flexbox,
    FlexboxItem
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
.list2 {
  margin-top: 5px;
  .content {
    margin-bottom: 5px;
    .left_img {
      height: 80px;
      width: 80px;
      margin-left: 10%;
      overflow: hidden;
      border-radius: 3px;
      img {
        width: 100%;
      }
    }
    .content_left {
      border-bottom: 1px solid #eee;
      .brand {
        color: #666666;
        font-size: 12px;
        margin-top: 10px;
      }
      .time {
        color: #ff7c61;
        font-size: 12px;
      }
      .title2 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 14px;
        color: #666;
      }
    }
    .num {
      text-align: center;
      font-size: 12px;
      color: gray;
    }
    .vux-x-icon {
      fill: #ff866c;
    }
  }
}
</style>