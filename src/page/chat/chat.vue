<template>
    <div class="container">
        <div class="title">
            <div class="head_img"><img v-bind:src="head_img" style="width: 40px;height: 40px;border-radius: 50px;position: relative;top:5px;"></div>
            <h1>消息</h1>
        </div>
        <div class="search"><input type="text" value="搜索"></div>
        <li v-for="i in name_list">
            <div class="head_img"><img v-bind:src="head_img" style="width: 40px;height: 40px;border-radius: 50px;position: relative;top:5px;"></div>
            <div style="position:relative;left: 20px;">
                <h1>{{i}}</h1>
                <h2></h2>
            </div>
            <div style="position:absolute;right: 20px;top:10px;">
                <h3></h3>
                <div class="number"></div>
            </div>
        </li>
    </div>
</template>

<script>
    export default {
        name: "chat",
        data(){
            return{
                name_list:null,
                online_list:null,
                all_list:[],
                head_img:null
            }
        },
        created(){
            this.name_list=Array();
            this.is_exist();
            this.load_data();
        },
        methods:{
            is_exist(){
                var url="http://39.108.236.127/head_img/"+this.email+".jpeg";
                this.$http.get(url).then((res)=>{
                    this.head_img=url;
                }).catch((res)=>{
                    this.head_img="http://img3.imgtn.bdimg.com/it/u=3931249197,3470570548&fm=26&gp=0.jpg";
                })
            },
            load_data(){
                console.log(typeof(this.name_list));
                this.online_list=eval('('+localStorage.getItem("socket_data")+')');
                for(var i in this.online_list){
                    this.name_list.push(i);
                }
            }
        }
    }
</script>

<style scoped>
.container{
    width: 100%;
    height: 100%;
    position: relative;
    top:0px;
}
    .title{
        display:flex;
        position: relative;
        width: 100%;
        height:50px;
        background-color: #00aaff;
    }
   .title h1{
        width: 78%;
        line-height:50px;
        text-align: center;
        font-size: 18px;
        color: white;
        font-weight: lighter;
    }
    .search{
        width: 100%;
        height: 35px;
        background-color: white;
        opacity: 0.9;
    }
    .search input{
        top: 5%;
        position: relative;
        left: 5%;
        width: 90%;
        height: 90%;
        background-color:#d8d8d8;
        opacity: 0.9;
        border: 1px solid white;
        border-radius: 5px;
        text-align: center;
    }
    li{
        display: flex;
        position: relative;
        height: 50px;
        width: 100%;
        border-bottom:0.5px solid grey;
        background-color: white;
    }
    li h1{
        line-height:50px;
        font-weight: lighter;
        font-size:20px;
    }
    li h2{
        color:grey;
    }
    .number{
        background-color: #00aaff;
        width: 20px;
        height: 20px;
        border-radius: 10px;
    }
</style>