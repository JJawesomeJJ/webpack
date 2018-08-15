<template>
    <div class="container_content">
        <div class="title">{{title}}</div>
        <div class="content" v-html="content">
            <div class="j-comment"></div>
        </div>
        <div class="comment_data">
        <li class="comment_container" v-for="i in this.comment">
            <div style="margin-top: 20px" v-if="i.comment!=null">
                <span><div class="iconfont icon-yonghu "></div><h1 style="line-height: 40px">{{i.user_id}}</h1><div class="iconfont icon-zan"style="margin-left: 240px;font-size: 20px;line-height: 35px"></div><div class="iconfont icon-gengduo" style="font-size: 20px"></div></span>
            <h1 style="margin-left:40px;margin-top:10px">{{i.comment}}</h1>
            </div>
        </li>
        </div>
        <div class="j-comment">
            <li><div class="icon iconfont icon-zuojiantou"></div></li>
            <li><input type="text" name="comment_content" id="comment_content"></li>
            <li class="up"><div class="iconfont icon-tiquliuliang1" v-on:click="comment_data"></div></li>
            <li><div class="iconfont icon-fenxiang"></div></li>
        </div>
    </div>
</template>

<script>
    export default {
        name: "news_content",
        data(){
            return{
                content:null,
                title:null,
                url:null,
                comment:[]
            }
        },
        created(){
            this.title=this.$route.query.title;
            this.url=this.$route.query.url;
            this.get_content(this.url);
        },
        mounted () {

        },
        watch:{
            content:function () {
                this.get_comment();
                console.log(this.comment)
            }
        },
        updated: function () {
            this.data_src();
            //this.get_comment();
        },
        methods:{
            get_content(url) {
                var url1='http://111.230.101.206/php/api/news.php?url='+url.replace(/&/g,'*');
                console.log(url1)
                this.$http.jsonp(url1, {
                    jsonpCallback: "callback",
                }).then(function (res) {
                    this.content=res.body.replace(/\\n/g,'<br>').replace(/\\t/g,'').replace(/\\r/g,'').replace(/\\"\/\//g,'"http:\/\/').replace(/jpg\\"/g,'jpg" width=100%;');
                    console.log(this.content);
                }.bind(this)).catch(function (res) {
                    console.log(res)
                })
            },
            get_comment(){
                var url="http://111.230.101.206/php/api/comment_query.php";
                var senddata={
                    url:this.url
                }
                this.$http.jsonp(url,{
                    jsonpCallback: "callback",
                    params:senddata
                }).then(function (res) {
                    console.log(res.body);
                    for(var i=0;i<res.body.length;i++)
                    {
                        this.comment.push(res.body[i]);
                    }
                })
            },
            comment_data(){
                var com=document.getElementById("comment_content").value;
                var url="http://111.230.101.206/php/api/news_comment.php"
                var sendata={
                    comment:com,
                    url:this.url
                }
                this.comment=[]
                this.$http.jsonp(url,{
                    jsonpCallback:"callback",
                    params:sendata
                }).then(function (res) {
                    if(res.body.code=='200')
                    {
                        this.get_comment();
                    }
                }.bind(this)).catch(function (res) {
            console.log(res)
        })
            },

            data_src(){
                var ob=$("img");
                $("img").each(function(){
                    var path=$(this).attr('data-src');
                    ($(this).attr('src',path));
                    if($(this).attr('class')=="\\\"art_img_mini_img")
                    {
                        $(this).css("display","none");
                    }
                });

            }
        }
    }
</script>

<style scoped>
    .container_content{
        background-color: grey;
        position: absolute;
    }
.content{
    position: relative;
    line-height: 50px;
    font-size:21px;
}
.comment_data{
    position: relative;
    margin-bottom: 55px;
}
span{
    display: flex;
}
    .j-comment{
        line-height:42px;
        position: fixed;
        display: flex;
        width:100%;
        height:40px;
        background-color: white;
        bottom: 0px;
        border-top: 1px solid #007aff;
        background-color: grey;
        opacity:0.9;
        margin-top: 50px;
    }
    h{
        line-height: 45px;
    }
img{
    width: 100%;
}
.title{
    position:relative;
    width: 100%;
    height: 60px;
    background-color: #0086b3;
    text-align: center;
    font-size: 30px;
    line-height: 53px;
}
input{
    height: 60%;
    width: 100%;
    border-radius: 8px;
    padding: 4px 5px;
    border: 1.1px solid black;
}
.iconfont.icon-tiquliuliang1 {
    margin-left: 50%;
    font-size: 30px;
}
.iconfont.icon-fenxiang{
    margin-left: 90%;
    font-size: 30px;
}
.comment_container{
    display: flex;
}
.icon-yonghu
{
    text-align: center;
    line-height: 41px;
    width: 40px;
    height: 40px;
    margin-top: 5px;
    background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534307402308&di=49936e5ddd1ec1928912b4bc61d820ba&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F10%2F53%2F80%2F72b1OOOPIC6e.jpg");
    background-size: 100% 100%;
    border-radius: 20px;
    font-size:34px;
}
    @media screen and (max-width: 690px){
        .title{
            font-size: 15px;
        }
        .up iconfont{
            font-size: 30px;
        }
    }

</style>