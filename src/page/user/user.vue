<template>
    <div class="container">
        <div class="head">
            <div class="title"><h1 style="position: relative;text-align: center;color: white;font-size: 20px;font-weight: bolder;">我的</h1></div>
            <div class="user">
                <router-link to="/login"><div class="unlogin" v-if="islogin==false" style="width:100%;height: 8vh;display: flex;position: relative;top:2vh;">
                    <img src="http://39.108.236.127/image/logo.png" style="border-radius:123px;height: 100%;margin-left: 8vw;margin-top: 1vh;">
                    <div style="position: relative;left: 3vw;">
                    <h1 style="position:relative;color: white;font-size: 20px;line-height:7vh;">登录|注册</h1>
                        <div style="display: flex"><li class="iconfont icon-shouji" style="font-size:16px;line-height: 5px;color: white;"></li> <h1 style="color: white;font-size: 16px;line-height: 5px;">登录发现更多</h1></div>
                    </div>
                    <div class="iconfont icon-youjiantou" style="color: white;position: relative;left:35vw;"></div>
                </div>
                </router-link>
                    <router-link to="/personal_space"><div class="login" v-if="islogin==true" style="width:100%;height: 8vh;display: flex;position: relative;top:2vh;">
                    <img src="http://39.108.236.127/image/logo.png" style="border-radius:123px;height: 100%;margin-left: 8vw;margin-top: 1vh;">
                    <div style="position: relative;left: 3vw;">
                        <h1 style="position:relative;color: white;font-size: 20px;line-height:7vh;">{{this.user}}</h1>
                        <div style="display: flex"><li class="iconfont icon-shouji" style="font-size:16px;line-height: 5px;color: white;"></li> <h1 style="color: white;font-size: 16px;line-height: 5px;">{{this.email}}</h1></div>
                    </div>
                    <div class="iconfont icon-youjiantou" style="color: white;position: relative;left:13vw;"></div>
                </div>
                </router-link>
            </div>
            <div class="redpacket"style="width:100%;height:15vh;background-color: white;position: relative;top:9vh;">
                <ul style="display: flex">
                    <li style="border-right: 0.5px solid #ddd;"><div class="iconfont icon-qian" style="background-color: #FFB400;"></div><h1 style="line-height:8vh;">钱包</h1></li>
                    <li style="border-right: 0.5px solid #ddd;"><div class="iconfont icon-hongbao" style="background-color:#df5000;"></div><h1 style="line-height:8vh;">红包</h1></li>
                    <li><div class="iconfont icon-zuanshi1" style="background-color:#4cd964;"></div><h1 style="line-height:8vh;">优惠</h1></li>
                </ul>
            </div>
        </div>
        <div class="j-body">
                <li style="top:2vh;">
                    <div class="iconfont icon-dibiao" style="width: 30px;height: 30px;color: #007aff;text-align: center;font-size:30px;line-height: 30px;margin-top: 2vh;"></div>
                    <h1>我的地址</h1>
                    <div class="iconfont icon-youjiantou" style="color:#bbb;position: relative;left:59%;line-height: 53px;font-size: 20px;"></div>
                </li>
            <li style="top:4vh;">
                <div class="iconfont icon-wangting" style="width: 30px;height: 30px;color: #007aff;text-align: center;font-size:30px;line-height: 30px;margin-top: 2vh;"></div>
                <h1>金币商店</h1>
                <div class="iconfont icon-youjiantou" style="color:#bbb;position: relative;left:59%;line-height: 53px;font-size: 20px;"></div>
            </li>
            <li style="top:4vh;">
                <div class="iconfont icon-fenxiang" style="width: 30px;height: 30px;color: #007aff;text-align: center;font-size:30px;line-height: 30px;margin-top: 2vh;"></div>
                <h1>分享时刻</h1>
                <div class="iconfont icon-youjiantou" style="color:#bbb;position: relative;left:59%;line-height: 53px;font-size: 20px;"></div>
            </li>
            <li style="top:6vh;">
                <div class="iconfont icon-dianhua" style="width: 30px;height: 30px;color: #007aff;text-align: center;font-size:30px;line-height: 30px;margin-top: 2vh;"></div>
                <h1>联系我们</h1>
                <div class="iconfont icon-youjiantou" style="color:#bbb;position: relative;left:59%;line-height: 53px;font-size: 20px;"></div>
            </li>
            <li style="top:6vh;">
                <div class="iconfont icon-duihuaxinxi" style="width: 30px;height: 30px;color: #007aff;text-align: center;font-size:30px;line-height: 30px;margin-top: 2vh;"></div>
                <h1>反馈建议</h1>
                <div class="iconfont icon-youjiantou" style="color:#bbb;position: relative;left:59%;line-height: 53px;font-size: 20px;"></div>
            </li>
        </div>
    </div>
</template>
<script>
    export default {
        name: "user",
        data:function () {
            return{
                islogin:false,
                user:null,
                email:null,
            }
        },
        created(){
            this.login();
            },
        methods:{
            login(){
                if(this.getCookie("name")!=""){
                    this.islogin=true;
                    this.user=this.getCookie('name');
                    this.email=this.getCookie('email');
                }
            },
            getCookie(cookieName) {
                var strCookie = document.cookie;
                var arrCookie = strCookie.split("; ");
                for(var i = 0; i < arrCookie.length; i++){
                    var arr = arrCookie[i].split("=");
                    if(cookieName == arr[0]){
                        return arr[1];
                    }
                }
                return "";
            }

        }
    }
</script>

<style scoped>
    .container{
        position: relative;
        top:0px;
    }
    .user{
        position: relative;
        width: 100%;
    }
.head{
    position: relative;
    top:0px;
    width: 100%;
    height:20vh;
    background-image: linear-gradient(90deg,#0af,#0085ff);
}
    .title{
        position: relative;
        width: 100%;
    }
    .redpacket ul li{
        position: relative;
        width: 33.3vw;
        height:15vh;
        text-align: center;
    }
    .redpacket ul li div{
        top:2vh;
        position: relative;
        margin: 0 auto;
        width:50px;
        height:50px;
        border-radius: 50px;
        line-height: 50px;
        color: white;
        font-size: 25px;
    }
    .j-body{
        position: relative;
        margin-top:15vh;
        width:100%;
        height:50vh;
        background-color: lightgrey;
    }
    .j-body li{
        position: relative;
        width: 100%;
        height:8vh;
        background-color:white;
        border-top:1px solid #ddd;
        display: flex;
    }
    .j-body li h1{
        white-space:nowrap;
        font-size: 15px;
        line-height: 50px;
        padding-left:15px;
        font-weight: bold;
    }
</style>