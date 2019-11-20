<template>
  <div>
    <p class="log">自动登录中……</p>
    <p></p>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      id:''
    };
  },
  created() {
    this.id= this.GetQueryString("codeId")
    this.login();
    // var str = location.search;
  },
  methods: {
    GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return null;
    },
    async login() {
      //取得整个地址栏
      var str = location.href;
      let res = await this.$Http.getUserInfoData({
        code: this.id
        // code: "18090044"
        // code: "19090098"
      })
      if (res.code == "0") {
        sessionStorage.setItem("role", res.data.role);
        sessionStorage.setItem("userid", res.data.userid);
        sessionStorage.setItem("name", res.data.username);
        sessionStorage.setItem("mobile", res.data.mobile);
        sessionStorage.setItem("companyName", res.data.companyName);
        sessionStorage.setItem("usergh", res.data.usergh);
        sessionStorage.setItem("companyId", res.data.companyId);
        this.$router.push({
          path: "/homePage"
        });
      }
    }
  }
};
</script>

<style scoped>
.log {
  text-align: center;
  margin-top: 20%;
  color: #304a8c;
  font-size: 20px;
}
</style>
