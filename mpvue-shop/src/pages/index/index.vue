<template>
  <div class="index">
    <div class="search">
      <div @click="toMap">{{cityName}}</div>
      <div>
        <input type="text" placeholder="搜索商品"/>
        <span class="icon"></span>
      </div>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
export default {
  data() {
    return {
      cityName: '北京'
    }
  },
  methods: {
    toMap(){
      wx.getLocation({
        success: res => {
          wx.getSetting({
            success: (res) => {
              if(!res.authSetting['scope.userLocation']){
                wx.openSetting({
                  success: res => {
                    console.log(res);
                    // 获取授权位置信息
                    this.getCityName()
                  }
                })
              } else {
                wx.navigateTo({
                  url: '/pages/map/main',
                });
              }
            },
            fail: res => console.log(res)
          });
        },
        fail: err => console.log(err)
      });
    },
    getCityName () {
      let myAmapFun = new amapFile.AMapWX({key:'256d94ac927c73a25e9177d789a1d060'});
      myAmapFun.getRegeo({
        success: function (data) {
          // 成功回调
          console.log(data)
          // ........
        },
        fail: function (err) {
          // 失败回调
          console.log(err)
          // _this.cityName = '北京'
          this.update({ cityName: '北京' })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import "./style.less";
</style>