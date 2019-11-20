<template>
  <div class="xiangqing">
    <flexbox orient="vertical">
      <flexbox-item>
        <div class="flex-demo imgBox">
          <img class="img" :src="`${detailsData.picUrl}`" alt />
        </div>
      </flexbox-item>
      <flexbox-item class="content" v-if="detailsData">
        <div class="flex-demo">
          <h3 class="title">{{detailsData.deviceName}}</h3>
          <p><span class="c_tit">价格：</span><span class="icon_i">￥{{detailsData.price}}元</span>/小时</p>
          <p><span class="c_tit">品牌：</span>{{detailsData.deviceBrand}}</p>
          <p><span class="c_tit">公司：</span>{{detailsData.deviceCompany}}</p>
          <p><span class="c_tit">备注：</span>{{detailsData.remark}}</p>
          <h4 class="record">预约记录：</h4>
            <x-table  class="tabble_1" v-if="detailsData.userList!=''">
              <thead>
                <tr>
                  <th>租用人</th>
                  <th>开始时间</th>
                  <th>结束时间</th>
                  <th>预约状态</th>
                </tr>
              </thead>
              <tbody v-for="item in detailsData.userList" :key="item.id">
                <tr>
                  <td>{{item.username || "暂无"}}</td>
                  <td>{{item.startTime || "00-00-00"}}</td>
                  <td>{{item.endTime || "00-00-00"}}</td>
                  <td>{{item.orderState | state}}</td>
                </tr>
              </tbody>
            </x-table>
            <p v-if="detailsData.userList==''">暂无</p>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, XTable } from "vux";
export default {
  name: "xiangqing",
  data() {
    return {};
  },
  props: ["detailsData"],
  components: {
    Flexbox,
    FlexboxItem,
    XTable
  },
  filters: {
    state(val) {
      switch (val) {
        case "0":
          return "未受理";
          break;
        case "1":
          return "已同意";
          break;
        case "2":
          return "已借出";
          break;
      }
    },
  }
};
</script>

<style scoped lang="less">
.xiangqing {
  padding: 10px;
  .imgBox{
    width: 100%;
    height: 20rem;
    overflow: hidden;
    img{
      height: auto;
    }
  }
  .img {
    width: 100%;
    height: 260px;
    overflow: hidden;
  }
  .content {
    .title {
      color:#304a8c;
      font-weight: bold;
      margin: 10px 0;
    }
    .c_tit{
      font-size: 14px;
      color: #999;
      
    }
    .record {
      margin: 10px 0 5px;
      padding-top: 10px;
      color:#304a8c;
    }
    p {
      color: #666;
      border-bottom: 1px dashed #eee;
      margin-bottom: 5px;
      .icon_i{
        color:  #ff866c;
      }
    }
    .tabble_1 {
      font-size: 13px;
    }
  }
}
</style>
