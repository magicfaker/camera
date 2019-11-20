<template>
  <div class="AdminReseList">
    <div class="h_card">
      <p class="name iconfont iconyonghu">
        <span class="tit">姓名：</span>
        <span>{{OwnData.username}}</span>
      </p>
      <p class="iconfont icondianhua_">
        <span class="tit">联系方式:</span>
        <span>{{OwnData.mobile}}</span>
      </p>
      <p class="iconfont iconyuyue">
        <span class="tit">预约开始时间:</span>
        <span>{{OwnData.startTime}}</span>
      </p>
      <p class="iconfont iconjieshushijian">
        <span class="tit">预约归还时间:</span>
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
      <AdminHistoryDetail :shopListConfirm="shopListConfirm"></AdminHistoryDetail>
    </view-box>
    <flexbox class="computed_b">
      <flexbox-item>
        <div class="flex-demo">
          <p class="estimate" v-if="this.$route.query.state == 2">已产生费用：{{OwnData.actuallyMoney}}元</p>
          <p class="estimate" v-if="this.$route.query.state == 3">总计：{{OwnData.actuallyMoney}}元</p>
          <p
            class="estimate"
            v-if="this.$route.query.state !=2 && this.$route.query.state !=3 "
          >预计费用：{{OwnData.money}}元</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <x-button
            mini
            class="submit"
            @click.native="submit()"
            v-if="this.$route.query.state == 0"
          >同意</x-button>
          <x-button
            mini
            class="submit"
            @click.native="submitOk()"
            v-if="this.$route.query.state==1"
          >确认借出</x-button>
          <x-button
            mini
            class="submit"
            @click.native="showPlugin3()"
            v-if="this.$route.query.state== 0||this.$route.query.state== 1"
          >关闭</x-button>
          <x-button
            mini
            class="submit"
            @click.native="submitBack()"
            v-if="this.$route.query.state==2"
          >确认归还</x-button>
          <!-- <x-button mini class="submit" v-if="this.$route.query.state==3">订单完成</x-button> -->
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
  ViewBox,
  Confirm,
} from "vux";
import tabbar from "./../components/Tabbar";
import AdminHistoryDetail from "./../components/AdminHistoryDetail";

export default {
  name: "AdminReseList",
  data() {
    return {
      shopListConfirm: "",
      deviceList: "",
      OwnData: "",
      startTime: this.$route.query.limitHourValue,
      endTime: this.$route.query.limitHourValue2,
      show:false,
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
    AdminHistoryDetail,
    ViewBox,
    Confirm,
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await this.$Http.getOrderDeatailData({
        orderId: this.$route.query.orderId,
        userid: sessionStorage.getItem("userid")
      });
      this.OwnData = res.data;
      this.shopListConfirm = res.data.devcieDetailList;
      // var devid =[];
      // for(var i =0;i<this.shopListConfirm.length;i++){
      //     devid.push(this.shopListConfirm[i].deviceId)
      // }
      // this.deviceList = devid.toString()
    },
    //同意
    async submit() {
      let res = await this.$Http.getAcceptOrder({
        orderId: this.$route.query.orderId,
        userid: sessionStorage.getItem("userid")
      });
      if (res.code == 0) {
        this.$vux.toast.text("已同意", "middle");
        this.$router.push("AdminToExamineList");
      } else {
        this.$vux.toast.text(`${res.msg}`);
      }
    },
    //借出
    async submitOk() {
      let res = await this.$Http.getLendDevice({
        orderId: this.$route.query.orderId,
        userid: sessionStorage.getItem("userid")
      });
      if (res.code == 0) {
        this.$vux.toast.text("借出成功", "middle");
        this.$router.push("AdminToExamineList");
      } else {
        this.$vux.toast.text(`${res.msg}`, "middle");
      }
    },
    //确认归还
    async submitBack() {
      let res = await this.$Http.getReturnDevice({
        orderId: this.$route.query.orderId,
        userid: sessionStorage.getItem("userid")
      });
      if (res.code == 1) {
        this.$vux.toast.text("归还成功", "middle");
        this.$router.push("AdminToExamineList");
      } else {
        this.$vux.toast.text(`${res.msg}`, "middle");
      }
    },
    //拒绝
    async submitStop(msg) {
      let res = await this.$Http.getAdminCloseOrder({
        orderId: this.$route.query.orderId,
        userid: sessionStorage.getItem("userid"),
        closeReason:msg
      });
      if (res.code == 0) {
        this.$vux.toast.text("关闭成功", "middle");
        this.$router.push("AdminToExamineList");
      } else {
        this.$vux.toast.text(`${res.msg}`, "middle");
      }
    },
     showPlugin3 () {
      const _this = this
      this.$vux.confirm.prompt('', {
        title: '请输入关闭理由',
        onShow () {
          console.log('promt show')
          _this.$vux.confirm.setInputValue('')
        },
        onHide () {
          console.log('prompt hide,33')
        },
        onCancel () {
          console.log('prompt cancel,22')
        },
        onConfirm (msg) {
          if(msg==''){
            _this.$vux.toast.text("请填写关闭理由", "middle");
          }else{
            _this.submitStop(msg)
          }
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
.AdminReseList {
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
      margin-top: 0;
      margin-right: 10px;
    }
  }
}
</style>
