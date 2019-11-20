<template>
  <div class="Administrators">
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top
      top="46px"
      placeholder="输入工号或者名字"
      :auto-fixed=false
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"></search>
    <checker
      v-model="demo6"
      type="radio"
      default-item-class="demo5-item"
      selected-item-class="demo5-item-selected"
    >
      <checker-item v-for="(item,index) in userList" :key="item.userid" :value="index">
        <flexbox>
          <flexbox-item>
            <div class="flex-demo">
                <p>姓名：{{item.username}}</p>
                <p>工号：{{item.usergh}}</p>
                <p>电话：{{item.mobile}}</p>
            </div>
          </flexbox-item>
        </flexbox>
      <x-button type="primary" mini class="confirm" @click.native="getAdmin(item.userid)">设为管理员</x-button>
      </checker-item>
    </checker>
  </div>
</template>

<script>
import {
  XHeader,
  XInput,
  XTextarea,
  Group,
  PopupPicker,
  Checker,
  CheckerItem,
  Flexbox,
  FlexboxItem,
  XButton,
  Search,
  Cell
} from "vux";
import service from "../service/http";
import api from "../service/api";
export default {
  name: "Administrators",
  components: {
    XHeader,
    XInput,
    XTextarea,
    Group,
    PopupPicker,
    Checker,
    CheckerItem,
    Flexbox,
    FlexboxItem,
    XButton,
    Search,Cell
  },
  data() {
    return {
      demo6: [1],
      userList:'',
      results: [],
      value: ''
    };
  },
  created() {
  },
  methods: {
    setFocus () {
      this.$refs.search.setFocus()
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (name) {
      this.search(name)
      // this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    },
    async getAdmin(userid){
      let res = await this.$Http.getInsertAdmin({
        userid:userid
      })
      if(res.code == 0){
        this.$router.push({path: 'administratorsList'})
        this.$vux.toast.text("设置成功", "middle");
      }
    },
    async search(name){
      let res = await this.$Http.getSearch({
        message:name,
        userid:sessionStorage.getItem("userid")
      })
      this.userList = res.data;
    },
  },
};
</script>

<style scoped lang="less">
.Administrators {
  .demo5-item {
    width: 42%;
    padding: 8px;
    line-height: 26px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin: 8px 0 0 10px;
    font-size: 14px;
  }
  .demo5-item-selected {
    background: #304a8c;
    color: #fff;
    .confirm{
      display: block;
      background: #fff;
      margin-top: 10px;
      width: 100%;
      color: #304a8c;
    }
  }
  .confirm{
      display: block;
      background: #304a8c;
      margin-top: 10px;
      width: 100%
  }
}
</style>
