<template>
  <div class="AdministratorsPage">
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
        <swipeout v-for="item in listdata" :key="item.id">
          <swipeout-item
            @on-close="handleEvents('on-close')"
            @on-open="handleEvents('on-open')"
            transition-mode="follow"
            v-if="item.state == state"
          >
            <div slot="right-menu">
              <swipeout-button
                @click.native="onButtonClick(item.id)"
                type="primary"
                v-if="item.state=='1'"
              >禁用</swipeout-button>
              <swipeout-button
                @click.native="onButtonClick1(item.id)"
                type="warn"
                v-if="item.state=='0'"
              >启用</swipeout-button>
              <swipeout-button
                @click.native="onButtonClickEdit(item.id)"
                type="default"
                v-if="item.state=='1'"
              >编辑</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t" :class="{'opact': item.state=='0'}">
              <flexbox>
                <flexbox-item :span="3">
                  <div class="flex-demo left_img">
                    <img :src="`${item.picUrl}`" alt />
                  </div>
                </flexbox-item>
                <flexbox-item class="content_left">
                  <flexbox>
                    <flexbox-item>
                      <div class="flex-demo">
                        <p class="title">
                          {{item.deviceBrand}}
                        </p>
                        <p class="title2">{{item.deviceCompany}}</p>
                        <p class="brand">所属品牌：{{item.deviceCompany}}</p>
                        <p class="time">设备编号：{{item.id}}</p>
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
  Swiper,
  SwiperItem,
  ViewBox
} from "vux";
import list from "./../components/List";
import tabbar from "./../components/Tabbar";
export default {
  name: "AdministratorsPage",
  data() {
    return {
      listdata: "",
      list2: ["启用", "禁用"],
      index: 0,
      state: 1
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
    Swiper,
    SwiperItem,
    ViewBox
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await this.$Http.getAdminGetDeviceList({
        userid: sessionStorage.getItem("userid")
      });
      // for(let i =  0;i<res.data.length;i++){
      //   if(res.data[i].state == 0){
      //      console.log(res.data[i].state == 0)
      //   }
      // }
      this.listdata = res.data;
      // console.log(res.data,res.data.length)
    },
    async onButtonClick(id) {
      let res = await this.$Http.getEnableDevice({
        userid: sessionStorage.getItem("userid"),
        id: id,
        state: 0
      });
      if (res.code == 0) {
        this.$vux.toast.text("该设备已禁用", "middle");
        this.getList();
      }
    },
    async onButtonClick1(id) {
      let res = await this.$Http.getEnableDevice({
        userid: sessionStorage.getItem("userid"),
        id: id,
        state: 1
      });
      if (res.code == 0) {
        this.$vux.toast.text("该设备已启用", "middle");
        this.getList();
      }
    },
    onButtonClickEdit(id) {
      this.$router.push({
        path: "addEquipmentUpload",
        query: {
          id: id
        }
      });
    },
    checkout(ss) {
      if (ss == 1) {
        this.state = 0;
      } else {
        this.state = 1;
      }
    },
    handleEvents(type) {
      console.log("event: ", type);
    }
  }
};
</script>

<style scope lang="less">
.AdministratorsPage {
  .opact {
    opacity: 0.4;
  }
  // .addEquipment {
  //   width: 60px;
  //   height: 60px;
  //   background: #304a8c;
  //   border-radius: 100px;
  //   color: #fff;
  //   line-height: 1;
  //   font-size: 12px;
  //   position: fixed;
  //   top: 70%;
  //   right: 10px;
  // }
  .left_img {
    border: 1px solid #304a8c;
    height: 80px;
    margin-left: 10%;
    img {
      margin: 5%;
      width: 90%;
      height: 90%;
    }
  }
  .content_left {
    border-bottom: 1px solid #eee;
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      .sbid {
        font-size: 12px;
        color: #999;
      }
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
      margin-top: 10px;
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
}
</style>
