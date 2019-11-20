<template>
  <div class="reserveList">
    <div class="h_card">
      <p class="name iconfont iconyonghu">
        <span class="tit">姓名：</span>
        <span>{{OwnData.username}}</span>
      </p>
      <p class="iconfont icondianhua_">
        <span class="tit">联系方式：</span>
        <span>{{mobile}}</span>
      </p>
      <p class="iconfont iconyuyue">
        <span class="tit">开始时间：</span>
        <span>{{OwnData.startTime}}</span>
      </p>
      <p class="iconfont iconjieshushijian">
        <span class="tit">归还时间：</span>
        <span>{{OwnData.endTime}}</span>
      </p>
      <p
        class="iconfont iconjieshushijian1"
        v-if="this.$route.query.state == 2 || this.$route.query.state == 3"
      >
        <span class="tit">开始借用时间:</span>
        <span>{{OwnData.actuallyStartTime}}</span>
      </p>
      <p class="iconfont iconjieshushijian2" v-if="this.$route.query.state == 3">
        <span class="tit">实际归还时间:</span>
        <span>{{OwnData.actuallyEndTime}}</span>
      </p>
      <p v-if="this.$route.query.state == 6">
        <span class="tit">关闭理由:</span>
        <span>{{OwnData.closeReason}}</span>
      </p>
    </div>
    <view-box>
      <listnew :shopListConfirm="shopListConfirm"></listnew>
    </view-box>
    <flexbox class="computed_b">
      <flexbox-item>
        <div class="flex-demo">
          <p class="estimate">预计费用：￥{{OwnData.money}}元</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <x-button
            mini
            class="submit"
            @click.native="cancel()"
            v-if="this.$route.query.state == 0"
          >撤销</x-button>
        </div>
      </flexbox-item>
    </flexbox>

    <tabbar></tabbar>
  </div>
</template>

<script>
import {
  XHeader,
  TabbarItem,
  Group,
  Cell,
  Flexbox,
  FlexboxItem,
  Datetime,
  XButton,
  ViewBox
} from "vux";
import tabbar from "./../components/Tabbar";
import listnew from "./../components/Listnew";

export default {
  name: "",
  data() {
    return {
      shopListConfirm: "",
      deviceList: "",
      OwnData: "",
      startTime: this.$route.query.limitHourValue,
      endTime: this.$route.query.limitHourValue2,
      // money:'',
      name: sessionStorage.getItem("name"),
      mobile: sessionStorage.getItem("mobile")
    };
  },
  components: {
    tabbar,
    XHeader,
    TabbarItem,
    Group,
    Cell,
    Flexbox,
    FlexboxItem,
    Datetime,
    XButton,
    listnew,
    ViewBox
  },
  created() {
    this.getList();
  },
  methods: {
    async getList(i) {
      let res = await this.$Http.getOrderDeatailData({
        orderId: this.$route.query.orderId,
        userid: sessionStorage.getItem("userid")
      });
      this.OwnData = res.data;
      this.shopListConfirm = res.data.devcieDetailList;
      var devid = [];
      for (var i = 0; i < this.shopListConfirm.length; i++) {
        devid.push(this.shopListConfirm[i].id);
      }
      this.deviceList = devid.toString();
      // let res2 = await this.$Http.getMoneyData({
      //   userid: sessionStorage.getItem("userid"),
      //   deviceList:this.deviceList,
      //   startTime :this.OwnData.startTime,
      //   endTime:this.OwnData.endTime,
      // })
      // this.money = res2.data.money
    },
    async cancel() {
      let res = await this.$Http.getCancelOrder({
        userid: sessionStorage.getItem("userid"),
        orderId: this.$route.query.orderId
      });
      if (res.code == 0) {
        this.$vux.toast.text("撤销成功", "middle");
        this.$router.push("history");
      } else {
        this.$vux.toast.text(`${res.msg}`, "middle");
      }
    }
  }
};
</script>

<style scoped lang="less">
.reserveList {
  .h_card {
    background: #304a8c;
    padding: 10px 20px;
    line-height: 30px;
    color: #fff;
    font-size: 14px;
    p {
      padding-left: 10px;
      .tit {
        margin: 0 10px;
      }
    }
    .name {
      background: #ff866c;
      border-radius: 30px;
      width: 50%;
      .tit {
        text-align: justify;
      }
    }
    .iconfont {
      font-size: 14px;
    }
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
</style>
