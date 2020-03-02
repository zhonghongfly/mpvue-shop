<template>
  <div class="map">
      <div class="selection">
          <input type="text" placeholder="搜索" focus="true" v-model="keywords" @input="bindInput">
      </div>
      <scroll-view :scroll-y="true" class="addCont" style="height: 400rpx;">
        <div class="result" v-for="(item, index) in tips" :key="index" @touchstart="bindSearch(item.name)">
          {{item.name}}
        </div>
      </scroll-view>

      <div class="mapContainer">
        <span class="title">显示当前位置</span>
        <map class="mapShow" :longitude="longitude" :latitude="latitude" :markers="markers" :scale="scale"></map>
      </div>
  </div>
</template>

<script>
import amapFile from '../../utils/amap-wx';
import {mapMutations} from 'vuex';
export default {
  data: {
    tips: [],
    longitude: 0, //经度
    latitude: 0, //纬度
    scale: 16,
    markers: '',
    keywords: ''
  },
  mounted(){
    this.getMapAddress();
  },
  methods: {
    ...mapMutations(['update']),
    getMapAddress(){
      let _this = this;
      let myAmapFn = new amapFile.AMapWX({key: '7466f0fba50d3fea00187e6223d23b63'});
      myAmapFn.getRegeo({
        iconPath: '/static/images/marker.png',
        iconWidth: 22,
        iconHeight: 32,
        success: data => {
          let marker = [{
            id: data[0].id,
            longitude: data[0].longitude, //经度
            latitude: data[0].latitude,
            width: data[0].width,
            height: data[0].height
          }];
          _this.markers = marker;
          _this.longitude = data[0].longitude;
          _this.latitude = data[0].latitude;
        },
        fail: err => console.log(err)
      });
    },
    bindInput(){
      let _this = this;
      let myAmapFn = new amapFile.AMapWX({key: '7466f0fba50d3fea00187e6223d23b63'});
      myAmapFn.getInputtips({
        keywords: _this.keywords,
        location: '',
        success: data => {
          if(data && data.tips){
            _this.tips = data.tips;
          }
        }
      });
    },
    bindSearch(cityName){
      this.update({cityName: cityName});
      wx.navigateBack({
        delta: 1
      });
    }
  }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>