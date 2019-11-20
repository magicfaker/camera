<template>
  <div class="AddEquipment">
    <group>
      <x-input title="父类ID"   v-model="pid" name="username" :disabled=true></x-input>
      <x-input title="子类设备名称" v-model="deviceClassName " name="username" placeholder="*必填*"></x-input>
    </group>
    <x-button class="submit" @click.native="submit()">提交</x-button>
  </div>
</template>

<script>
import { XInput, XTextarea, Group, PopupPicker, XButton } from "vux";
import axios from "axios";
// import instance from "../service/http";
export default {
  name: "AddEquipment",
  components: {
    XInput,
    XTextarea,
    Group,
    PopupPicker,
    XButton
  },
  data() {
    return {
      deviceClassName :'',
      pid:this.$route.query.id,
    };
  },
  created() {
  },
  methods: {
    async submit() {
      if (this.pid == "") {
         this.$vux.toast.text("设备品牌不能为空", "middle");
      } else if (this.deviceClassName == "") {
         this.$vux.toast.text("设备名称不能为空", "middle");
      } else {
        let res = await this.$Http.insertClassData({
          pid : this.pid,
          deviceClassName: this.deviceClassName,
        });
        if (res.code == 0) {
          this.$vux.toast.text("添加成功", "middle");
          this.$router.push("BqglSon");
        } else {
          this.$vux.toast.text("请重新添加", "middle");
        }
      }
    },
    async getClassList() {
      let res = await this.$Http.ClassList({
        userid: sessionStorage.getItem("userid")
      });
      this.valuelist =res.data
    },

    uploadImage($event) {
      this.getUdpatePicData($event);
    },
    previewMethod(url) {
      console.log(123);
    },
    addImageMethod(url) {
      console.log(this.url, this);
    },
    removeImageMethod(url) {
      console.log(this.url, 1231);
    },
    onSuccess() {
      this.getUdpatePicData();
    },

    onChange(val) {
      console.log("val change", val);
    },
    onShow() {
      console.log("on show");
    },
    onHide(type) {
      console.log("on hide", type);
    }
  }
};
</script>

<style scoped lang="less">
.AddEquipment {
  .submit {
    display: block;
    text-align: center;
    margin: 0 auto;
    background: #304a8c;
    color: #fff;
    width: 40%;
    margin: 50px 0 0 30%;
    border-radius: 30px;
  }
  /deep/ .weui-uploader__input-box {
    width: 50px;
    height: 50px;
  }
}
</style>
