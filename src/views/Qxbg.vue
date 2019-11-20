<template>
  <div class="Qxbg">
    <checker
      v-model="demo6"
      type="checkbox"
      default-item-class="demo5-item"
      selected-item-class="demo5-item-selected"
    >
      <checker-item
        v-for="item in commonList"
        :key="item.pid"
        :value="item.pid"
      >{{item.deviceParentClassName}}</checker-item>
    </checker>
    <x-button class="btn" @click.native="upData()">保存</x-button>
  </div>
</template>

<script>
import { Checker, CheckerItem, XButton } from "vux";
export default {
  name: "Qxbg",
  data() {
    return {
      commonList: [],
      labelPosition: "",
      checklist001: [],
      demo6: []
    };
  },
  components: {
    Checker,
    CheckerItem,
    XButton
  },
  created() {
    this.getAdminParentClassListDataSuper();
  },
  methods: {
    async getAdminParentClassListDataSuper() {
      console.log(this.demo6, 11);
      let res = await this.$Http.getAdminParentClassListData({
        userid: this.$route.query.userid
      });
      this.commonList = res.data;
      for (var i = 0; i < this.commonList.length; i++) {
        if (this.commonList[i].flag == 1) {
          console.log(this.commonList[i].flag);
          this.demo6.push(this.commonList[i].pid);
        } else {
          // console.log(12);
        }
        // this.commonList.push(res.data[i].deviceParentClassName);
      }
    },
    async upData() {
      console.log(this.checklist001, 111);
      let res = await this.$Http.updateAdminParentClassListSuper({
        userid: this.$route.query.userid,
        pidAuthority: this.demo6.toString()
      });
      this.$vux.toast.text("保存成功", "middle");
      this.$router.push({
        path: "administratorsList"
      });
    },
    change(val, label) {
      // console.log("change", val, label);
    },
    selectFirst() {
      this.checklist001 = ["China"];
    },
    selectFirstTwo() {
      this.checklist001 = ["China", "Japan"];
    }
  }
};
</script>

<style scoped lang="less">
.Qxbg {
  .btn {
    background: #304a8c;
    color: #fff;
    margin: 10px auto;
    display: block;
    width: 50%;
    margin:30px 0 0 25%;
  }
  .demo5-item {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    border-radius: 30px;
    color: #304a8c;
    margin:10px 0 0 10%;
    background: #fff;
    border: 1px solid #304a8c;
    padding: 0 10px;
    width: 80%;
  }
  .demo5-item-selected {
    background: #304a8c;
    color: #fff;
  }
}
</style>
