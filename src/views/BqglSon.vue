<template >
  <div class="tab-content">
    <p class="head_title">父类标签：{{parentsName}}</p>
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
              <div slot="content" class="demo-content vux-1px-t" :class="{'opact': item.flag=='0'}" @click.native="son(item.id)">
                <flexbox>
                  <flexbox-item class="content_left">
                    <flexbox>
                      <flexbox-item>
                        <div class="flex-demo">
                          <p class="brand">所属分类：{{parentsName}}</p>
                          <p class="time">分类名称：{{item.deviceClassName}}</p>
                          <p class="title">ID:{{item.pid}}</p>
                        </div>
                      </flexbox-item>
                    </flexbox>
                  </flexbox-item>
                </flexbox>
              </div>
            </swipeout-item>
          </swipeout>
        </view-box>
        <x-button class="add" @click.native="AddSon()">新增子类标签</x-button>        
      </div>
    </view-box>
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
      parentsName:this.$route.query.parents
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
    this.getdevClassListDataSuperSuper();
  },
  methods: {
    async getCompanyListDataSuper() {
      let res = await this.$Http.getCompanyListData({
        userid: sessionStorage.getItem("userid")
      });
      this.list1 = res.data;
    },
    async getdevClassListDataSuperSuper() {
      let res = await this.$Http.getdevClassListData({
        id:this.$route.query.id
      });
      this.list3 = res.data;
    },
    async onButtonClick(id) {
      let res = await this.$Http.deleteClassData({
        userid: sessionStorage.getItem("userid"),
        id: id,
        flag: 0
      });
      if (res.code == 0) {
        this.$vux.toast.text("该分类已禁用", "middle");
         this.getdevClassListDataSuperSuper();
      }
    },
    async onButtonClick1(id) {
      let res = await this.$Http.startClassData({
        userid: sessionStorage.getItem("userid"),
        id: id,
        flag: 1
      });
      if (res.code == 0) {
        this.$vux.toast.text("该分类已启用", "middle");
        this.getdevClassListDataSuperSuper();
      }
    },
    son(id){
        this.$router.push({
          path: "BqglSon",
          query: {
            id: id,
          }
        });
    },
    AddSon(){
        this.$router.push({
          path: "AddSon",
          query: {
            id: this.$route.query.id,
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
  .head_title {
    color: #304a8c;
    font-weight: bolder;
    padding:10px 0 0 10px;
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
   .add{
      background: #304a8c;
      width: 40%;
      margin-left: 30%;
      color: #eee;
      font-size: 14px;
  }
}
</style>
