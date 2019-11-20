import Vue from 'vue'
import Router from 'vue-router'
import importVue from "import-vue"

Vue.use(Router)

export default new Router({
  routes: [
    importVue("HomePage","/HomePage","首页"),
    importVue("Shopping","/Shopping","商品"),
    importVue("Login","/","登录"),
    importVue("ReserveList","/ReserveList","订单确认页面"),
    importVue("History","/History","历史订单"),
    importVue("HistoryReserve","/HistoryReserve","历史订单详情"),
    importVue("Administrators","/Administrators","管理员搜索页面"),
    importVue("AdministratorsList","/AdministratorsList","管理员列表"),
    importVue("AddEquipment","/AddEquipment","添加商品"),
    importVue("AddEquipmentUpload","/AddEquipmentUpload","编辑商品"),
    importVue("GoodsDetails","/GoodsDetails","商品详情页"),
    importVue("AdministratorsPage","/AdministratorsPage","管理员启禁用商品页面"),
    importVue("AdminToExamineList","/AdminToExamineList","管理员审核借用列表页面"),
    importVue("AdminReserveList","/AdminReserveList","管理员订单确认页面"),
    importVue("cell","/cell","管理员导航页"),
    importVue("cellSuper","/cellSuper","超级管理员导航页"),
    importVue("Bqgl","/Bqgl","标签管理"),
    importVue("BqglSon","/BqglSon","子类标签管理"),
    importVue("Qxbg","/Qxbg","权限变更"),
    importVue("AddParents","/AddParents","新增父类"),
    importVue("AddSon","/AddSon","新增子类"),
  ]
})

