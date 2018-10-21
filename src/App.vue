<template>
    <div id="app">
        <div class="j-cover"><img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2065113976,1298457337&fm=200&gp=0.jpg" alt="" ></div>
        <div class="j-nav-bar">
            <div class="j-logo"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535026018423&di=e40a7858c1e149c3a0374a72eb0be061&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fdcc451da81cb39db30c81870da160924ab18308f.jpg" alt="logo"></div>
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
                            <router-link to="/user"><div class="padding"><i class="iconfont icon-yonghu"></i></div></router-link></li>
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
        </div>
        <div class="j-nav-tail">
            <ul>
                <div class="caidan"><router-link to="/home"><i class="iconfont icon-shouye"></i></router-link></div>
                <div class="caidan"> <router-link to="/news_list"><i class="iconfont icon-wangting" style="font-size: 47px;"></i></router-link></div>
                <div class="caidan" ><router-link to="/personal_space"><i class="iconfont icon-sousuo"></i></router-link></div>
                <div class="caidan"><router-link to="/user"><i class="iconfont icon-yonghu"></i></router-link></div>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'app',
        created(){
        },
        methods:{
        }
    };
</script>
<style>
</style>