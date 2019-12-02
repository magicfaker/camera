<template >
  <div class="tab-content" style="height:100%">
    <flexbox>
      <flexbox-item :span="1">
        <div class="flex-demo">
          <p class="screen_left">品牌</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <checker
            v-model="demo4"
            default-item-class="demo5-item"
            selected-item-class="demo5-item-selected"
            :radio-required="true"
          >
            <checker-item
              @on-item-click="click(index)"
              v-for="(item,index) in list1"
              :key="item.deviceCompanyId"
              :value="index"
            >{{item.deviceCompanyName}}</checker-item>
          </checker>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox class="checkRadio">
      <flexbox-item :span="1">
        <div class="flex-demo">
          <p class="screen_left">分类</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <scroller lock-y :scrollbar-x="false">
            <div class="box1">
              <checker
                v-model="demo5"
                default-item-class="demo5-item"
                selected-item-class="demo5-item-selected"
                :radio-required="true"
              >
                <checker-item
                  @on-item-click="click1(index1)"
                  v-for="(item1,index1) in list2"
                  :key="item1.deviceParentClassId"
                  :value="index1"
                >{{item1.deviceParentClassName}}</checker-item>
              </checker>
            </div>
          </scroller>
        </div>
      </flexbox-item>
    </flexbox>
    <tab v-model="indexSeleted" :scroll-threshold="8" class="sss">
      <tab-item
        @on-item-click="click2(index2)"
        v-for="(item2,index2) in list3"
        :key="index2.deviceClassId"
        :selected="index2===indexSeleted"
      >{{item2.deviceClassName}}</tab-item>
    </tab>
    <view-box style="height:86.4%">
      <list :listdata="listdata"></list>
    </view-box>
    <tabbar></tabbar>
  </div>
</template>
<script>
import {
  XHeader,
  Group,
  Cell,
  XButton,
  Sticky,
  Tab,
  TabItem,
  ButtonTab,
  ButtonTabItem,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  Flexbox,
  FlexboxItem,
  Checker,
  CheckerItem,
  ViewBox,
  Scroller
} from "vux";
import list from "./../components/List";
import tabbar from "./../components/Tabbar";
export default {
  data() {
    return {
      select1: "",
      select2: "",
      select3: "",
      listdata: "",
      list1: "",
      list2: "",
      list3: "",
      list4: "",
      demo5: 0,
      demo4: 0,
      indexSeleted: 0
    };
  },
  components: {
    XHeader,
    Tab,
    TabItem,
    XButton,
    ButtonTab,
    ButtonTabItem,
    list,
    tabbar,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Flexbox,
    FlexboxItem,
    Checker,
    CheckerItem,
    ViewBox,
    Scroller
  },
  created() {
    this.getList();
    this.getClassListDataOwn();
  },
  methods: {
    async getList() {
      let res = await this.$Http.getContactList({
        deviceCompanyId: this.select1,
        deviceParentClassId: this.select2,
        deviceClassId: this.select3
      });
      this.listdata = res.data;
    },
    async getClassListDataOwn() {
      let res = await this.$Http.getClassListData();
      this.list1 = res.data;
      this.list2 = this.list1[0].deviceParentClassList;
      this.list3 = this.list2[0].deviceClassList;
    },
    click(id) {
      this.list2 = this.list1[id].deviceParentClassList;
      this.list3 = this.list2[0].deviceClassList;
      this.demo5 = 0;
      this.indexSeleted = 0;
      this.select2 = this.list2[0].deviceParentClassId;
      this.getList();
    },
    click1(id) {
      this.indexSeleted = 0;
      console.log(this.indexSeleted);
      this.list3 = this.list2[id].deviceClassList;
      this.select2 = this.list2[id].deviceParentClassId;
      this.select3 = "";
      this.getList();
    },
    click2(id) {
      // this.list4 = this.list3[id].deviceClassList;
      this.select3 = this.list3[id].deviceClassId;
      this.getList(id);
    },
    onButtonClick(type) {
      alert("on button click " + type);
    },
    handleEvents(type) {
      console.log("event: ", type);
    }
  }
};
</script>

<style lang="less" scope>
.tab-content {
  .checkRadio {
    margin-top: 5px;
  }
  // .sss /deep/.vux-tab-ink-bar {

  //       right: 78% !important;
  //       height: 100px;

  // }
  .screen_left {
    text-align: right;
    color: #304a8c;
    font-size: 14px;
    font-weight: bolder;
  }
  .tabbar_1 {
    margin: 3px 0;
    padding: 0 10px 0 0;
  }
  .vux-demo {
    text-align: center;
  }
  .logo {
    width: 100px;
    height: 100px;
  }
  .active {
    color: #00a4a6 !important;
  }
  .acc-child {
    position: absolute;
    top: 51px;
    padding: 2%;
  }
  .demo5-item {
    height: 26px;
    line-height: 25px;
    font-size: 12px;
    text-align: center;
    border-radius: 30px;
    color: #304a8c;
    margin-right: 5px;
    background: #fff;
    border: 1px solid #304a8c;
    padding: 0 10px;
  }
  .demo5-item-selected {
    background: #304a8c;
    color: #fff;
  }
  .box1 {
    position: relative;
    width: 32rem;
  }
}
</style>
