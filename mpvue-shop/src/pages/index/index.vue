<template>
  <div class="index">
    <!-- 头部搜索栏 -->
    <div class="search">
      <div @click="toMap">{{cityName}}</div>
      <div>
        <input type="text" placeholder="搜索商品" />
        <span class="icon"></span>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="swiper">
      <swiper
        class="swiper-container"
        indicator-dots="true"
        autoplay="true"
        interval="3000"
        duration="500"
        circular="true"
      >
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <img :src="item.image_url" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="cannel">
      <div v-for="(item, index) in cannel" :key="index" @click="categoryList(item.id)">
        <img :src="item.icon_url" />
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="brand">
      <div class="head" @click="toBrandList">品牌制造商直供</div>
      <div class="content">
        <div v-for="(item, index) in brand" :key="index" @click="brandDetail(item.id)">
          <div>
            <p>{{item.name}}</p>
            <p>{{item.floor_price}}元起</p>
          </div>
          <img :src="item.pic_url" />
        </div>
      </div>
    </div>
    <!-- 新品首发 -->
    <div class="newGoods">
      <div class="newGoods-top" @click="goods('new')">
        <div class="top">
          <p>新品首发</p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" scroll-x="true">
            <li v-for="(item, index) in newGoods" :key="index">
              <img :src="item.list_pic_url" alt />
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>￥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <!-- 人气好物 -->
    <div class="newGoods hotGoods">
      <div class="newGoods-top" @click="goods('hot')">
        <div class="top">
          <p>人气推荐<span></span>好物精选</p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" scroll-x="true">
            <li v-for="(item, index) in hotGoods" :key="index">
              <img :src="item.list_pic_url" alt />
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>￥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { mapState, mapMutations } from "vuex";
import { get } from "../../utils/index";
export default {
  data: {
    banner: [],
    cannel: [],
    brand: [],
    newGoods: [],
    hotGoods: []
  },
  mounted() {
    this.getCityName();
    this.getData();
  },
  computed: {
    ...mapState(["cityName"])
  },
  methods: {
    ...mapMutations(["update"]),
    toMap() {
      wx.getLocation({
        success: res => {
          wx.getSetting({
            success: res => {
              if (!res.authSetting["scope.userLocation"]) {
                wx.openSetting({
                  success: res => {
                    // 获取授权位置信息
                    this.getCityName();
                  }
                });
              } else {
                wx.navigateTo({
                  url: "/pages/map/main"
                });
              }
            },
            fail: res => console.log(res)
          });
        },
        fail: err => console.log(err)
      });
    },
    getCityName() {
      let _this = this;
      let myAmapFun = new amapFile.AMapWX({
        key: "7466f0fba50d3fea00187e6223d23b63"
      });
      myAmapFun.getRegeo({
        success: function(data) {
          // 成功回调
          // 更新位置
          _this.update({ cityName: data[0].name });
        },
        fail: function(err) {
          // 失败回调
          _this.update({ cityName: "北京" });
        }
      });
    },
    async getData() {
      const data = await get("/index");
      console.log(data);
      this.banner = data.banner;
      this.cannel = data.cannel;
      this.brand = data.brand;
      this.newGoods = data.newGoods;
      this.hotGoods = data.hotGoods;
    },
    categoryList(id) {
      wx.navigateTo({
        url: `/pages/category/main?id=${id}`
      });
    },
    brandDetail(id) {
      wx.navigateTo({
        url: `/pages/brand/main?id=${id}`
      });
    },
    toBrandList() {
      wx.navigateTo({
        url: "/pages/brandList/main"
      });
    },
    goods(info){
      if(info === 'new'){
        wx.navigateTo({
        url: "/pages/goods/main?is_new=" + 1
      });
      }
      if(info === 'hot'){
        wx.navigateTo({
        url: "/pages/goods/main?is_hot=" + 1
      });
      }
    }
  }
};
</script>

<style lang='less' scoped>
@import "./style.less";
</style>