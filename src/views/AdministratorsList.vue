<template>
  <div class="AdministratorsList">
     <checker
      v-model="demo6"
      type="radio"
      default-item-class="demo5-item"
      selected-item-class="demo5-item-selected"
     
    >
      <checker-item v-for="item in userList" :key="item.userid" :value="item.userid" @on-item-click="click(item.userid)">
        <flexbox >
          <flexbox-item>
            <div class="flex-demo">
                <p>姓名：{{item.username}}</p>
                <p class="bumen">部门：{{item.mainDeptName}}</p>
                <p>电话：{{item.mobile}}</p>
            </div>
          </flexbox-item>
        </flexbox>
      </checker-item>
     </checker>
      <XButton class="add" mini link="administrators">添加管理员</XButton>
      <actionsheet v-model="show" :menus="menus" show-cancel @on-click-menu-menu1="Isdelete()" @on-click-menu-menu2="Isdelete2()"></actionsheet>
  </div>
</template>

<script>
import {
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
  Cell,
  Actionsheet,XSwitch
} from "vux";
import service from "../service/http";
import api from "../service/api";
export default {
  name: "Administrators",
  components: {
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
    Cell,
    Actionsheet,XSwitch
  },
  data() {
    return {
      demo6: [1],
      userList:'',
      show:false,
      id:'',
      show6:'',
      show8:'',
      menus: {
        menu1: this.$t('确定删除此管理员？'),
        menu2: this.$t('权限管理'),
      },
    };
  },
  created() {
    this.getAdminListData()
  },
  methods: {
    async getAdminListData(){
      let res = await this.$Http.getAdminList({
        userid:sessionStorage.getItem("userid")
      })
      this.userList = res.data;
    },
    async delete(id){
        let res =await this.$Http.getDeleteAdmin({
          userid:id
        })
        if(res.code == '0'){
           this.getAdminListData()
           this.$vux.toast.text("删除成功", "middle");
        }
    },
    Isdelete(){
      this.delete(this.id)
    },
    Isdelete2(){
       this.$router.push({
          path: "Qxbg",
          query: {
            userid: this.id
          }
        });
    },
    click(id){
      this.id = id;
      this.show = true
    },
    close(){
        this.show = false
        console.log(123)
    }
  }
};
</script>

<style scoped lang="less">
.AdministratorsList {
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
  .bumen{
    overflow:hidden; 
    text-overflow:ellipsis; 
    white-space:nowrap; 
  }
  .add{
    background: #304a8c;
    color: #fff;
    margin: 10px auto;
    display: block
  }
}
</style>
