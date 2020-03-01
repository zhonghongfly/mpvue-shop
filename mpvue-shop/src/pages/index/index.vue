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
import {mapState, mapMutations} from 'vuex';
export default {
  data: {
    
  },
  computed: {
    ...mapState(['cityName'])
  },
  methods: {
    ...mapMutations(['update']),
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
      let myAmapFun = new amapFile.AMapWX({key:'7466f0fba50d3fea00187e6223d23b63'});
      myAmapFun.getRegeo({
        success: function (data) {
          // 成功回调
          console.log(data)
          // ........
        },
        fail: function (err) {
          // 失败回调
          console.log(err)
          this.update({cityName: '北京'})
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import "./style.less";
</style>