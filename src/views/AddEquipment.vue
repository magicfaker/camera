<template>
  <div class="AddEquipment">
    <group>
      <x-input title="设备品牌" v-model="value1" name="username" placeholder="*必填*"></x-input>
      <popup-picker title="设备所属分类" :data="valuelist" :columns="2" v-model="value2" show-name></popup-picker>
      <x-input title="设备名称" v-model="maskValue" name="username" placeholder="*必填*"></x-input>
      <x-input
        title="设备租赁价格"
        type="number"
        v-model="maskValue2"
        name="username"
        placeholder="请输入数字"
      ></x-input>

      <uploader
        :max="1"
        :images="imgshow"
        :show-header="true"
        :readonly="false"
        :upload-url="UploadUrl"
        :autoUpload="false"
        :handleClick="false"
        size="small"
        @preview="previewMethod"
        @add-image="addImageMethod"
        @remove-image="removeImageMethod"
        @upload-image="uploadImage"
        @success="onSuccess"
        @change="onSuccess"
        ref="file"
      ></uploader>
      <icon
        v-if="imgshow != ''"
        class="removeImg"
        @click.native="removeImageMethod()"
        type="cancel"
      ></icon>
      <loading :show="show1" text></loading>
      <confirm
        v-model="show"
        @on-cancel="onCancel"
        @on-confirm="onConfirm"
        @on-show="onShow"
        @on-hide="onHide"
        :show-cancel-button="false"
      >
        <img class="yulan" :src="`${yulan}`" alt />
      </confirm>
      <x-textarea :max="100" v-model="remark" :placeholder="$t('备注')"></x-textarea>
    </group>
    <x-button class="submit" @click.native="submit()">提交</x-button>

    <!-- <tabbar></tabbar> -->
  </div>
</template>

<script>
import {
  XHeader,
  XInput,
  XTextarea,
  Group,
  PopupPicker,
  XButton,
  Loading,
  Confirm,
  Icon
} from "vux";
import Uploader from "vux-uploader";
import tabbar from "./../components/Tabbar";
import axios from "axios";
import EXIF from "exif-js";
import lrz from "lrz";
// import instance from "../service/http";
export default {
  name: "AddEquipment",
  components: {
    tabbar,
    XHeader,
    XInput,
    XTextarea,
    Group,
    PopupPicker,
    Uploader,
    XButton,
    Loading,
    Confirm,
    Icon
  },
  data() {
    return {
      value1: "",
      value2: [],
      valuelist: [],
      name: [],
      maskValue: "",
      maskValue2: "",
      deviceClassId: "",
      UploadUrl: "",
      imgshow: [],
      remark: "",
      show1: false,
      show: false,
      yulan: ""
    };
  },
  created() {
    this.getClassList();
  },
  methods: {
    getUdpatePicData() {
      // var fd = new FormData();
      // fd.append("file", this.$refs.file.$refs.input.files[0]);
      // fd.append("userid", sessionStorage.getItem("userid"));
      var that = this;
      lrz(this.$refs.file.$refs.input.files[0], { width: 768 })
        .then(function(rst) {
          // 展示处理好的图片

          var img = new Image();
          img.src = rst.base64;
          // img.onload = function() {
          //   document.body.appendChild(img);
          // };
          that.show1 = true;
          return rst;
        })
        .then(function(rst) {
          var fd = new FormData();
          fd.append("file", rst.file);
          fd.append("userid", sessionStorage.getItem("userid"));
          console.log(rst.file);
          axios
            .post("http://115.238.142.66:8882/camera/udpate/udpatePic", fd)
            // .post("http://20.28.10.111:8993/camera/udpate/udpatePic", fd)
            .then(res => {
              var ss = [];
              ss.push(res.data.data);
              //picurl替换为url
              var keyMap = {
                picUrl: "url"
              };
              for (var i = 0; i < ss.length; i++) {
                var obj = ss[i];
                for (var key in obj) {
                  var newKey = keyMap[key];
                  if (newKey) {
                    obj[newKey] = obj[key];
                    delete obj[key];
                  }
                }
              }
              console.log(ss[0], "zip");
              that.imgshow.push(ss[0]);
              that.yulan = ss[0].url;
              that.show1 = false;
            })
            .catch(function(error) {
              console.log(error);
            })
            .then(function() {});
        })
        .catch(function(err) {
          // 如果出错了，这里可以捕捉到错误信息
          // 而且以上的then都不会执行
          alert(err);
        })
        .always(function() {
          // 不管是成功失败，这里都会执行
        });
    },

    async submit() {
      if (this.value1 == "") {
        this.$vux.toast.text("设备品牌不能为空", "middle");
      } else if (this.value2 == "") {
        this.$vux.toast.text("请选择设备分类", "middle");
      } else if (this.maskValue == "") {
        this.$vux.toast.text("设备名称不能为空", "middle");
      } else if (this.maskValue2 == "") {
        this.$vux.toast.text("设备价格不能为空", "middle");
      } else if (this.imgshow == "") {
        this.$vux.toast.text("至少上传一张图片", "middle");
      } else {
        let res = await this.$Http.getInsertDevice({
          deviceBrand: this.value1,
          deviceClassId: this.value2[1],
          deviceParentClassId: this.value2[0],
          deviceName: this.maskValue,
          picUrl: this.imgshow[0].url,
          price: this.maskValue2,
          userid: sessionStorage.getItem("userid"),
          remark: this.remark
        });
        if (res.code == 0) {
          this.$vux.toast.text("添加成功", "middle");
          this.$router.push("administratorspage");
        } else {
          this.$vux.toast.text("请重新添加", "middle");
        }
      }
    },
    async getClassList() {
      let res = await this.$Http.ClassList({
        userid: sessionStorage.getItem("userid")
      });
      this.valuelist = res.data;
    },
    onCancel() {
      console.log("on cancel");
    },
    onConfirm(msg) {
      console.log("on confirm");
      if (msg) {
        alert(msg);
      }
    },
    onHide() {
      console.log("on hide");
    },
    onShow() {
      console.log("on show");
    },
    uploadImage($event) {
      this.getUdpatePicData($event);
    },
    previewMethod(url) {
      this.show = true;
    },
    addImageMethod(url) {},
    removeImageMethod(url) {
      this.imgshow = [];
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
  /deep/ .remove {
    display: none;
  }
  /deep/ .weui-uploader__file {
    position: relative;
  }
  .removeImg {
    position: absolute;
    margin: -5.1rem 0 0 3.8rem;
  }
  .yulan {
    width: 100%;
  }
  /deep/ .weui-dialog__btn_primary {
    color: #304a8c;
  }
}
</style>
