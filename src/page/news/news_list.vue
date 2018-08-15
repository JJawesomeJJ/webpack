import Vue from 'vue'
<template id="new_list">
    <div class="news_list">
        <li v-for="i in list">
            <router-link :to="{path:'/news_content',query:{url:i.URL,title:i.title}}">
            <div class="tabel-view">
                    <img class="thumbnail" v-if="typeof(i.allPics['pics']['0'])=='object'" :src="i.allPics['pics']['0']['imgurl']">
                    <img class="thumbnail" v-else :src="img_url">
                    <div class="media-body">
                        <p>{{i.title}}</p>
                        <p class="source">---{{i.source}}</p>
                    </div>
            </div>
            </router-link>
        </li>
    </div>
</template>
<script>
    export default {
        e1:"#new_lis",
        name: "news_list",
        data: function () {
            return {
                list: [],
                img_url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528218497579&di=1b32fc768ea44907f4bdcdd23094b2b8&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fe%2F5850a9beece26.jpg",
                page:1,
                test:[{}],
            }
        },
        created() {
            this.get_list();
            window.addEventListener('scroll',this.scroll_button)
            //setInterval(this.json_appen,2000);
        },
        mounted () {

        },
        methods: {
            get_list() {
                    var url='https://interface.sina.cn/wap_api/layout_col.d.json?showcid=56261&col=56261&level=1%2C2&show_num=30&page='+this.page+'&act=more&jsoncallback=callbackFunction&_='+new Date().getTime()+'&callback='+new Date().getTime();
                    console.log(url);
                    this.$http.jsonp(url, {
                    jsonp: 'callBackParam',
                    jsonpCallback: "callbackFunction"
                }).then(function (res) {
                    this.list=res.body.result.data.list;
                    this.page=this.page+1;
                }.bind(this));
            },
            json_appen() {
                var  url1='https://interface.sina.cn/wap_api/layout_col.d.json?showcid=56261&col=56261&level=1%2C2&show_num=30&page='+this.page+'&act=more&jsoncallback=callbackFunction&_='+new Date().getTime()+'&callback='+new Date().getTime();
                this.$http.jsonp(url1, {
                    jsonp: 'callBackParam',
                    jsonpCallback: "callbackFunction"
                }).then(function (res) {
                    //$.extend( true,this.list,res.body.result.data.list);
                    for(var i=0;i<res.body.result.data['list'].length;i++)
                    {
                        this.list.push(res.body.result.data['list'][i]);
                    }
                    this.page=this.page+1;
                }.bind(this));
            },
            test1(){
                alert("ok");
            },
            scroll_button() {
                if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
                    this.$options.methods.json_appen.bind(this)();
                }
            },
            get_data() {
                $.ajax({
                    async: false,
                    url: 'https://interface.sina.cn/wap_api/layout_col.d.json?showcid=56261&col=56261&level=1%2C2&show_num=30&page=3&act=more&jsoncallback=callbackFunction&_=1532784393869&callback=Zepto1532784301104',
                    dataType: "jsonp",
                    jsonpCallback: "callbackFunction",
                    success: function (json) {
                        //console.log(json);
                        //console.log(this.list);
                    }
                });

            },
        }
    }
</script>

<style scoped>
.news_list{
    width: 100%;
    height: auto;
    opacity: 0.8;
    position:absolute;
}
.news_list li{
    width: 100%;
    height: 75px;
    background-color: white;
    border-bottom:2px solid grey;
    margin-top: 3px;
    border-radius: 12px;
    position: relative;
    }
.tabel-view{
    width:100%;
    height: 100%;
    position: relative;
}
.thumbnail{
    position: relative;
    width:20%;
    height: 100%;
    border-radius: 5px;
}
.tabel-view p{
    position: relative;
    margin-left: 28%;
    top:-65px;
    font-weight: bold;
    color: black;
    }
.tabel-view .source{
    position: relative;
    margin-left: 71%;
    color: black;
    margin-bottom: 0px;
    buttom:0px;
}
.news_list li:hover{
    opacity: 1.0;
}
.media-body{
    width: 100%;
    height: 100%;
}
h1{
    visibility: hidden;
}

</style>