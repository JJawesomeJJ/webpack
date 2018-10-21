exports.install = function (Vue, options) {
    Vue.prototype.toast = function (message){
        $(".toast").remove();
        var html="<div class=\"toast\">"+"<div class=\"toast_content\"><h1>"+message+"</h1></div>"+"</div>";
        $("body").append(html);
        $(".toast").fadeIn(500);
        setTimeout(function () {
            $(".toast").fadeOut(800);
        },1000);
    };
    Vue.prototype.loading=function () {
        var number=0;
        $(".j-loading").css("display","flex");
        var load=setInterval(function () {
            if($(".j-loading").css("display")=="none")
            {
                clearInterval(load);
            }
            var list=document.querySelectorAll(".j-loading>div");
            var class_name=[];
            for(var i of list){
                class_name.push(i.className);
            }
            //console.log(class_name);
            class_name.unshift(class_name[2]);
            class_name.pop();
            //console.log(class_name);
            var time=0;
            for(var i=0;i<list.length;i++)
            {
                list[i].className=class_name[i];
            }
            if(number%2==0)
            {
                $(".j-loading").attr("class","j-loading show");
                $(".j-loading div:nth-child(2)").css("filter","blur(5px");
                $(".j-loading div:nth-child(2)").css("width","20px");
                $(".j-loading div:nth-child(2)").css("height","20px");
                $(".j-loading div:nth-child(1)").css("filter","blur(0px");
                $(".j-loading div:nth-child(3)").css("filter","blur(0px");

            }
            else{
                $(".j-loading.show").attr("class","j-loading");
                $(".j-loading div:nth-child(2)").css("width","25px");
                $(".j-loading div:nth-child(2)").css("height","25px");
                $(".j-loading div:nth-child(2)").css("filter","blur(0px");
                $(".j-loading div:nth-child(1)").css("filter","blur(5px");
                $(".j-loading div:nth-child(3)").css("filter","blur(5px");
            }
            number++;
        },1000)

    }
    Vue.prototype.unloading=function () {

    }
    Vue.prototype.websocket=function (name) {
            var web="ws://39.108.236.127:9502";
            var websocket=new WebSocket(web);
            websocket.onopen=function (evt) {
                console.log("连接成功");
                websocket.send(JSON.stringify(
                    {
                        'username':name,
                        'type':'init'
                    }
                ));
            }
            websocket.onclose=function (evt) {
                console.log("关闭");
            }
            websocket.onmessage=function (evt) {
                alert(evt.data);
            }
            websocket.onerror=function (evt,e) {
                console.log('error');
            }
    }
    Vue.prototype.getCookie=function (cookieName) {
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
};