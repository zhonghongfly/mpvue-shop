<template>
  <div class="index">
    <!-- 头部搜索栏 -->
    <div class="search">
      <div @click="toMap">{{cityName}}</div>
      <div>
        <input type="text" placeholder="搜索商品"/>
        <span class="icon"></span>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="500" circular="true">
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <img :src="item.imageURL"/>
          </swiper-item>
        </block>
      </swiper>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import {mapState, mapMutations} from 'vuex';
import {get} from '../../utils/index';
export default {
  data: {
    banner: []
  },
  mounted(){
    this.getCityName();
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
      let _this = this;
      let myAmapFun = new amapFile.AMapWX({key:'7466f0fba50d3fea00187e6223d23b63'});
      myAmapFun.getRegeo({
        success: function (data) {
          // 成功回调
          // 更新位置
          _this.update({cityName: data[0].name})
        },
        fail: function (err) {
          // 失败回调
          _this.update({cityName: '北京'})
        }
      })
    },
    async getData(){
      const data = await get('/index/swiperImages');
    }
  }
}
</script>

<style lang='less' scoped>
@import "./style.less";
</style>