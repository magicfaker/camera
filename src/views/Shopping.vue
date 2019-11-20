<template>
  <div class="shop">
    <div class="content">
      <flexbox :gutter="16">
        <flexbox-item :span="2">
          <div class="flex-demo">
            <p class="title">预约时间</p>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">
            <group>
              <datetime
                v-model="limitHourValue"
                format="YYYY-MM-DD HH:mm"
                default-selected-value
                @on-change="change"
              ></datetime>
            </group>
          </div>
        </flexbox-item>
        <flexbox-item :span="1">
          <div class="flex-demo">
            <p class="font_center">至</p>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">
            <group>
              <datetime
                v-model="limitHourValue2"
                format="YYYY-MM-DD HH:mm"
                @on-change="change"
                :inline-desc="$t('')"
              ></datetime>
            </group>
          </div>
        </flexbox-item>
      </flexbox>
      <view-box ref="viewBox">
        <flexbox v-for="item in shopList" :key="item.id">
          <flexbox-item :span="3">
            <div class="flex-demo left_img">
              <img :src="`${item.picUrl}`" alt />
            </div>
          </flexbox-item>
          <flexbox-item class="content_left">
            <flexbox>
              <flexbox-item>
                <div class="flex-demo">
                  <p class="title_1">{{item.deviceBrand}}</p>
                  <p class="brand">设备所属：{{item.deviceCompany}}</p>
                  <p class="time">租赁价格：{{item.price}}元/小时</p>
                  <p>{{badgeData}}</p>
                </div>
              </flexbox-item>
              <flexbox-item :span="2">
                <div class="flex-demo">
                  <x-icon type="ios-minus-outline" size="30" @click="deleteCart(item.deviceId)"></x-icon>
                </div>
              </flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
      </view-box>
      <flexbox class="computed_b">
        <flexbox-item>
          <div class="flex-demo"></div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">
            <x-button mini class="submit" @click.native="nextPage()">确认</x-button>
          </div>
        </flexbox-item>
      </flexbox>
    </div>

    <tabbar :badgeData="badgeData"></tabbar>
  </div>
</template>

<script>
import {
  TabbarItem,
  Group,
  Cell,
  Flexbox,
  FlexboxItem,
  Datetime,
  DatetimeRange,
  XButton,
  Toast,
  ToastPlugin,
  ViewBox
} from "vux";
import tabbar from "./../components/Tabbar";
import DeteleList from "./../components/DeteleList";
export default {
  name: "shop",
  data() {
    return {
      limitHourValue: "开始时间",
      limitHourValue2: "结束时间",
      shopList: "",
      badgeData:this.$store.state.count
    };
  },
  components: {
    tabbar,
    TabbarItem,
    Group,
    Cell,
    DeteleList,
    Flexbox,
    FlexboxItem,
    Datetime,
    XButton,
    Toast,
    ToastPlugin,
    ViewBox,
    DatetimeRange
  },
  created() {
    this.getList();
  },
  methods: {
    // 拉取商品列表
    async getList() {
      let res = await this.$Http.getCartList({
        userid: sessionStorage.getItem("userid")
      });
      this.shopList = res.data;
      // console.log(res,222)
      // this.badgeData = res.data.length;
      // sessionStorage.setItem("badgeData", this.badgeData);
    },
    // 删除方法
    async deleteCart(id) {
      let res = await this.$Http.deleteCart({
        id: id,
        userid: sessionStorage.getItem("userid")
      });
      if (res.code == 0) {
        this.$vux.toast.text("删除成功", "middle");
        this.getList();
        // this.$router.go(0)
      }
    },
    //跳转下一页带时间
    nextPage() {
      if (
        this.limitHourValue == "开始时间" ||
        this.limitHourValue2 == "结束时间"
      ) {
        this.$vux.toast.text("请选择时间", "middle");
      } else if (this.limitHourValue == this.limitHourValue2) {
        this.$vux.toast.text("开始时间不能与结束时间相同", "middle");
      } else {
        this.$router.push({
          path: "ReserveList",
          query: {
            limitHourValue: this.limitHourValue,
            limitHourValue2: this.limitHourValue2
          }
        });
      }
    },
    onChange(val) {
      this.limitHourValue = val;
    },
    change(value) {
      var that = this;
      function CompareDate(d1, d2) {
        if (new Date(d1.replace(/-/g, "/")) > new Date(d2.replace(/-/g, "/"))) {
          that.$vux.toast.text("结束时间必须大于开始时间", "middle");
        } else {
        }
      }
      CompareDate(this.limitHourValue, this.limitHourValue2);
    },
    deleteItem(item, index) {
      console.log(item);
      console.log(index);
    }
  }
};
</script>

<style scoped lang="less">
.shop {
  .left_img {
    height: 80px;
    width: 80px;
    margin-left: 10%;
    overflow: hidden;
    border-radius: 5px;
    img {
      width: 100%;
    }
  }
  .content_left {
    border-bottom: 1px solid #eee;
    .title_1 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: 3rem;
    }
    .brand {
      color: #666666;
      font-size: 12px;
      margin-top: 10px;
    }
    .time {
      color: #ff7c61;
      font-size: 12px;
    }
  }
  .vux-x-icon {
    fill: #ff866c;
  }
  .content {
    padding: 5px;
    .font_center {
      text-align: center;
      padding-top: 8px;
    }
    .title {
      text-align: center;
      color: #304a8c;
      padding-top: 10px;
      font-size: 13px
    }
    .flex-demo /deep/ .weui-cell__ft {
      padding: 0;
      text-align: center;
      &::after {
        display: none;
      }
    }
    .flex-demo /deep/ .weui-cells {
      font-size: 12px;
      background: #304a8c;
      border-radius: 30px;
    }
    .flex-demo /deep/ .weui-cell {
      padding: 6px 0;
    }
    .flex-demo /deep/ .vux-cell-value {
      color: #fff;
    }
    .computed_b {
      background: #fff;
      position: fixed;
      bottom: 3.4rem;
      padding: 10px 0;
      box-shadow: 0px 0px 5px #e0e0e0;
      right: 0;
      .estimate {
        margin-left: 10px;
      }
      .submit {
        border-radius: 20px;
        background: #304a8c;
        color: #fff;
        float: right;
        margin-right: 10px;
      }
    }
  }
  .z_index {
    z-index: 9999;
  }
}
</style>
