<template>
  <div id="app">
      <div class="j-nav-bar">
          <div class="j-logo"><img src="https://b-ssl.duitang.com/uploads/item/201511/22/20151122175817_zWSft.thumb.700_0.jpeg" alt="logo"></div>
          <div class="j-other"><i class="iconfont icon-gengduo">
          <div class="j-grid">
              <ul>
                  <li>
                      <div class="padding"><i class="iconfont icon-tupian"></i></div></li>
                  <li>
                      <div class="padding"><i class="iconfont icon-qian"></i></div></li>
                  <li>
                      <div class="padding"><i class="iconfont icon-shezhi"></i></div></li>
              </ul>
              <ul>
                  <li>
                      <router-link to="/register">
                          <div class="padding"><i class="iconfont icon-wenjianjia"></i></div></router-link></li>
                  <li>
                      <router-link to="/login"><div class="padding"><i class="iconfont icon-yonghu"></i></div></router-link></li>
                  <li>
                      <router-link to="/news_list"><div class="padding"><i class="iconfont icon-xinxi"></i></div></router-link></li></ul>
              <ul>
                  <li>
                      <div class="padding"><i class="iconfont icon-dengpao"></i></div></li>
                  <li>
                      <div class="padding"><i class="iconfont icon-shangjia"></i></div></li>
                  <li>
                      <div class="padding"><i class="iconfont icon-dibiao"></i></div></li>
              </ul>
          </div>
          </i></div>
      </div>
      <div class="j-container">
          <router-view></router-view>
          <div class="j-cover"><img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2065113976,1298457337&fm=200&gp=0.jpg" alt="" ></div>
      </div>
      <div class="j-nav-tail">
          <ul>
              <div class="caidan"><i class="iconfont icon-shouye"></i></div>
              <div class="caidan"><i class="iconfont icon-yonghu1"></i></div>
              <div class="caidan"><i class="iconfont icon-gouwuche"></i></div>
              <div class="caidan"><i class="iconfont icon-sousuo"></i></div>
          </ul>
      </div>
  </div>
</template>
<script>

export default {
  name: 'app'
};
</script>
<style>
</style>
