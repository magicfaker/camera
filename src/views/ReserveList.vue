<template>
  <div class="reserveList">
    <div class="h_card">
      <p class="name iconfont iconyonghu">
        <span class="tit">姓名：</span>
        <span>{{name}}</span>
      </p>
      <p class="iconfont icondianhua_">
        <span class="tit">联系方式：</span>
        <span>{{mobile}}</span>
      </p>
      <p class="iconfont iconyuyue">
        <span class="tit">开始时间：</span>
        <span>{{startTime}}</span>
      </p>
      <p class="iconfont iconyuyue">
        <span class="tit">结束时间：</span>
        <span>{{endTime}}</span>
      </p>
    </div>
    <view-box>
      <listnew :shopListConfirm="shopListConfirm"></listnew>
    </view-box>
    <flexbox class="computed_b">
      <flexbox-item>
        <div class="flex-demo">
          <p class="estimate">预计费用：￥{{money || 0}}元</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <x-button mini class="submit"  @click.native="submit()">确认提交</x-button>
        </div>
      </flexbox-item>
    </flexbox>
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
  ViewBox,
} from "vux";
import listnew from "./../components/Listnew";

export default {
  name: "",
  data() {
    return {
      shopListConfirm: "",
      deviceList: "",
      startTime: this.$route.query.limitHourValue,
      endTime: this.$route.query.limitHourValue2,
      money: "",
      name: sessionStorage.getItem("name"),
      mobile: sessionStorage.getItem("mobile"),
      show1:false,
    };
  },
  components: {
    XHeader,
    TabbarItem,
    Group,
    Cell,
    Flexbox,
    FlexboxItem,
    Datetime,
    XButton,
    listnew,
    ViewBox,
  },
  created() {
    this.getList();
    // this.getMoney()
  },
  methods: {
    async getList(i) {
      let res = await this.$Http.getCartList({
        userid: sessionStorage.getItem("userid")
      });
      this.shopListConfirm = res.data;
      var devid = [];
      for (var i = 0; i < this.shopListConfirm.length; i++) {
        devid.push(this.shopListConfirm[i].deviceId);
      }
      this.deviceList = devid.toString();
      let res2 = await this.$Http.getMoneyData({
        userid: sessionStorage.getItem("userid"),
        deviceList: this.deviceList,
        startTime: this.$route.query.limitHourValue,
        endTime: this.$route.query.limitHourValue2
      });
      if (res2.code == 1) {
        this.$vux.toast.text(res2.msg);
      }
      this.money = res2.data.money;
    },
    async submit() {
      let res = await this.$Http.insertOrder({
        userid: sessionStorage.getItem("userid"),
        deviceList: this.deviceList,
        startTime: this.$route.query.limitHourValue,
        endTime: this.$route.query.limitHourValue2
      });
      if (res.code == 0) {
        this.$vux.toast.text("提交成功，等待工作人员审核", "middle");
        this.$router.push("/");
      } else {
        this.$vux.toast.text(res.msg, "middle");
        this.$router.push("/");
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
  }
  .computed_b {
    background: #fff;
    position: fixed;
    bottom: 0;
    padding: 10px 0;
    box-shadow: 0px 0px 5px #e0e0e0;
    right: 0;
    z-index: 9999;
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
