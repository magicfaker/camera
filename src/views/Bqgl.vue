<template >
  <div class="tab-content">
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
              @on-item-click="click(item.companyId,item.companyName)"
              v-for="(item,index) in list1"
              :key="item.deviceCompanyId"
              :value="index"
            >{{item.companyName}}</checker-item>
          </checker>
        </div>
      </flexbox-item>
    </flexbox>
    <view-box>
      <div class="tab-content">
        <tab :line-width="2" v-model="index">
          <tab-item
            class="vux-center"
            v-for="(item, index) in list2"
            @click.native="checkout(index)"
            :key="index"
          >{{item}}</tab-item>
        </tab>
        <view-box>
          <swipeout v-for="item in list3" :key="item.id">
            <swipeout-item
              @on-close="handleEvents('on-close')"
              @on-open="handleEvents('on-open')"
              transition-mode="follow"
              v-if="item.flag == flag"
            >
              <div slot="right-menu">
                <swipeout-button
                  @click.native="onButtonClick(item.id)"
                  type="primary"
                  v-if="item.flag=='1'"
                >禁用</swipeout-button>
                <swipeout-button
                  @click.native="onButtonClick1(item.id)"
                  type="warn"
                  v-if="item.flag=='0'"
                >启用</swipeout-button>
              </div>
              <div slot="content" class="demo-content vux-1px-t" :class="{'opact': item.flag=='0'}">
                <flexbox @click.native="son(item.id,item.deviceParentClassName)">
                  <flexbox-item class="content_left">
                    <flexbox>
                      <flexbox-item>
                        <div class="flex-demo">
                          <p class="brand">所属品牌：{{item.companyName}}</p>
                          <p class="time">分类名称：{{item.deviceParentClassName}}</p>
                          <p class="title">公司ID{{item.companyId}}</p>
                        </div>
                      </flexbox-item>
                    </flexbox>
                  </flexbox-item>
                </flexbox>
              </div>
            </swipeout-item>
          </swipeout>
        </view-box>
      </div>
    </view-box>
    <x-button class="add" @click.native="AddParents()">新增父类标签</x-button>
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
  ViewBox
} from "vux";
export default {
  data() {
    return {
      select1: "",
      select2: "",
      select3: "",
      listdata: "",
      list1: "",
      list3: "",
      list4: "",
      demo5: 0,
      demo4: 0,
      indexSeleted: 0,
      list2: ["启用", "禁用"],
      index: 0,
      flag: 1,
      cid:'19489258',
      cname:'唐狮服饰'
    };
  },
  components: {
    XHeader,
    Tab,
    TabItem,
    XButton,
    ButtonTab,
    ButtonTabItem,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Flexbox,
    FlexboxItem,
    Checker,
    CheckerItem,
    ViewBox
  },
  created() {
    this.getCompanyListDataSuper();
    this.getParentListDataSuper();
  },
  methods: {
    async click(id,name) {
      let res = await this.$Http.getParentListData({
        companyId: id
      });
      this.list3 = res.data;
      this.cid = id;
      this.cname = name;
    },
    async getCompanyListDataSuper() {
      let res = await this.$Http.getCompanyListData({
        userid: sessionStorage.getItem("userid")
      });
      this.list1 = res.data;
    },
    async getParentListDataSuper() {
      let res = await this.$Http.getParentListData({
        companyId: 19489258
      });
      this.list3 = res.data;
    },
    async onButtonClick(id) {
      let res = await this.$Http.deleteParentClassData({
        userid: sessionStorage.getItem("userid"),
        id: id,
        flag: 0
      });
      if (res.code == 0) {
        this.$vux.toast.text("该分类已禁用", "middle");
        this.getParentListDataSuper();
      }
    },
    async onButtonClick1(id) {
      let res = await this.$Http.startParentClassData({
        userid: sessionStorage.getItem("userid"),
        id: id,
        flag: 1
      });
      if (res.code == 0) {
        this.$vux.toast.text("该分类已启用", "middle");
        this.getParentListDataSuper();
      }
    },
    son(id,name){
        this.$router.push({
          path: "BqglSon",
          query: {
            id: id,
            parents:name
          }
        });
    },
    AddParents(){
         this.$router.push({
          path: "AddParents",
          query: {
            companyId:this.cid,
            companyName:this.cname
          }
        });
    },
    handleEvents(type) {
      console.log("event: ", type);
    },
    checkout(ss) {
      if (ss == 1) {
        this.flag = 0;
      } else {
        this.flag = 1;
      }
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
  .content_left {
    border-bottom: 1px solid #eee;
    padding: 0 10px;
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      font-size: 12px;
      color: #999;
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
    .brand {
      color: #999;
      font-size: 12px;
      margin-top: 5px;
    }
    .record {
      color: #666;
      font-size: 12px;
    }
    .time {
      color: #ff7c61;
      font-size: 12px;
    }
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
  .add {
    background: #304a8c;
    width: 40%;
    margin-left: 30%;
    color: #eee;
    font-size: 14px;
  }
}
</style>
