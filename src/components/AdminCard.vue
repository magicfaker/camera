<template>
  <div class="AdminCard">
    <div class="contentList" v-for="(item,index) in orderList" :key="index">
      <flexbox @click.native="getOrderDetails(item.orderId,item.state)">
        <flexbox-item class="left" :span="2">
          <div
            :class="{'bgColor': item.state=='3','bgColor2': item.state=='2','bgColor3': item.state=='6','bgColor4': item.state=='1'}"
          >
            <p>{{item.days | rep}}</p>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="content">
            <p>
              申请人：
              <span>{{item.userName}}</span>
            </p>
            <p>
              申请人来自：
              <span>{{item.companyName}}</span>
            </p>
            <p>
              申请设备：
              <span>{{item.deviceName}}</span>
            </p>
            <p>
              预约时间：
              <span>{{item.orderTime}}</span>
            </p>
          </div>
        </flexbox-item>
        <flexbox-item :span="2" class="right">
          <div
            :class="{'bgColor': item.state=='3','bgColor2': item.state=='2','bgColor3': item.state=='6','bgColor4': item.state=='1'}"
          >
            <p>{{item.state | state}}</p>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from "vux";
export default {
  name: "AdminCard",
  data() {
    return {};
  },
  props: ["orderList"],
  components: {
    Flexbox,
    FlexboxItem
  },
  methods: {
    getOrderDetails(id, id2) {
      this.$router.push({
        path: "/AdminReserveList",
        query: {
          orderId: id,
          state: id2
        }
      });
    }
  },
  filters: {
    state(val) {
      switch (val) {
        case "0":
          return "未处理";
          break;
        case "1":
          return "已受理";
          break;
        case "2":
          return "已借出";
          break;
        case "3":
          return "已归还";
          break;
        case "4":
          return "已拒绝";
          break;
        case "5":
          return "已关闭";
          break;
        case "6":
          return "已关闭";
          break;
      }
    },
    rep(ss) {
      return ss.replace(/-/g, "\n/\n");
    }
  }
};
</script>

<style scoped lang="less">
.card {
  margin: 0 10px;
  padding: 5px;
  .contentList {
    border: 1px solid #eee;
    border-radius: 5px;
    margin-top: 5px;
    .left {
      div {
        background: #304a8c;
        border-radius: 20px;
        color: #fff;
        width: 1rem;
        padding: 6px 5px;
        margin-left: 30%;
        p {
          text-align: center;
        }
      }
    }
    .content {
      font-size: 13px;
    }
    .right {
      div {
        background: #304a8c;
        border-radius: 15px 0 0 15px;
        text-align: center;
        color: #fff;
        font-size: 0.6rem;
        padding: 5px 10px;
      }
    }
    .bgColor {
      background: #ff7c61 !important;
    }
    .bgColor2 {
      background: #71a1ac !important;
    }
    .bgColor3 {
      background: grey !important;
    }
    .bgColor4 {
      background: #6bae8c !important;
    }
  }
}
</style>
