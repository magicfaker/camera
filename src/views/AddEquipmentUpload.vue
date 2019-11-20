<template>
  <div class="AddEquipment">
    <group>
      <x-input title="设备品牌" disabled v-model="value1" name="username"></x-input>
      <x-input title="设备分类" disabled v-model="value6" name="username"></x-input>
      <x-input title="设备名称" disabled v-model="maskValue" name="username"></x-input>
      <x-input title="设备价格" disabled v-model="price" name="username"></x-input>
      <x-textarea v-model="remark" name="username"></x-textarea>
    </group>
    <uploader
      :max="1"
      :images="imgshow"
      :show-header="true"
      :readonly="false"
      :upload-url="UploadUrl"
      :autoUpload="false"
      @preview="previewMethod"
      @add-image="addImageMethod"
      @remove-image="false"
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
    <x-button class="submit" @click.native="submit()">提交</x-button>
    <tabbar></tabbar>
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
      value1: "asdasd",
      value2: [],
      value6: "",
      name: [],
      maskValue: "",
      price: "",
      deviceClassId: "",
      UploadUrl: "",
      imgshow: [],
      MessageData: "",
      remark: "",
      show1: false,
      show: false,
      yulan: ""
    };
  },
  created() {
    this.getDeviceMessageDataFirst();
  },
  methods: {
    getUdpatePicData() {
      var that = this;
      lrz(this.$refs.file.$refs.input.files[0], { width: 768 })
        .then(function(rst) {
          // 展示处理好的图片

          var img = new Image();
          img.src = rst.base64;
          // img.onload = function() {
          //   document.body.appendChild(img);
          // };
          return rst;
        })
        .then(function(rst) {
          var fd = new FormData();
          fd.append("file", rst.file);
          fd.append("userid", sessionStorage.getItem("userid"));
          console.log(rst.file);
          axios
            .post("http://115.238.142.66:8882/camera/udpate/udpatePic", fd)
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
              that.imgshow.push(ss[0]);
              that.yulan = ss[0].url;
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
      if (this.imgshow == "") {
        this.$vux.toast.text("至少上传一张图片", "middle");
      } else {
        let res = await this.$Http.getUpdateDevice({
          id: this.$route.query.id,
          picUrl: this.imgshow[0].url,
          remark: this.remark
        });
        if (res.code == 0) {
          this.$vux.toast.text("编辑成功", "middle");
          this.$router.push("administratorspage");
        } else {
          this.$vux.toast.text("请重新添加", "middle");
        }
      }
    },
    async getDeviceMessageDataFirst() {
      let res = await this.$Http.getDeviceMessageData({
        id: this.$route.query.id
      });
      this.value1 = res.data.deviceBrand;
      this.value6 = res.data.deviceClass;
      this.maskValue = res.data.deviceName;
      this.price = res.data.price;
      this.remark = res.data.remark;
      var o = new Object();
      o.url = res.data.picUrl;
      this.imgshow.push(o);
      this.yulan = res.data.picUrl
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
    margin: -6.5rem 0 0 4.8rem;
  }
  .yulan {
    width: 100%;
  }
  /deep/ .weui-dialog__btn_primary {
    color: #304a8c;
  }
}
</style>
