<template>
  <div class="listConent">
    <flexbox v-for="item in listdata" :key="item.id" @click.native="getDetails(item.id)">
      <flexbox-item :span="3">
        <div class="flex-demo left_img">
          <img :src="`${item.picUrl}`" alt />
        </div>
      </flexbox-item>
      <flexbox-item class="content_left">
        <flexbox>
          <flexbox-item>
            <div class="flex-demo">
              <p class="title">{{item.deviceName}}</p>
              <!-- <p class="brand">设备品牌：{{item.deviceBrand}}</p> -->
              <p class="brand">租赁价格：{{item.price}}元/小时</p>
              <p class="record">所属公司：{{item.deviceCompany}}</p>
              <p :class="{'colorSet': item.isOrder=='1'}"
              >预约记录：{{item.isOrder | OrderRecord}}</p>
            </div>
          </flexbox-item>
          <flexbox-item :span="2">
            <div class="flex-demo">
              <x-icon type="ios-plus" size="30" class="icon-red" @click.stop="addCart(item.id)"></x-icon>
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
export default {
  name: "about",
  components: {
    Flexbox,
    FlexboxItem
  },
  props: ["listdata"],
  methods: {
    async addCart(id) {
      let res = await this.$Http.addCart({
        id: id,
        userid: sessionStorage.getItem("userid")
      });
      if (res.code == 0) {
        this.$vux.toast.text("已加入购物车", "middle");
      }
      // this.listdata = res.data;
    },
    getDetails(id) {
      this.$router.push({
        path: "GoodsDetails",
        query: {
          id: id
        }
      });
    }
  },
  filters: {
    OrderRecord(val) {
      switch (val) {
        case "0":
          return "暂无预约记录";
          break;
        case "1":
          return "已有预约记录，点击查看";
          break;
      }
    }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
.listConent {
  margin-top: 5px;
  .left_img {
    height: 80px;
    overflow: hidden;
    margin-left: 10%;
    border-radius: 3px;
    height: 80px;
    img {
      width: 100%;
    }
  }
  .content_left {
    border-bottom: 1px solid #eee;
    font-size: 12px;
    color: gray;
    .colorSet {
      color: #ff866c;
    }
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 16px;
      color: #304a8c;
      // display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .brand {
      margin-top: 10px;
    }
  }
  .vux-x-icon {
    fill: #ff866c;
  }
}
</style>