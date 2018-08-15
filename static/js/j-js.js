$(document).ready(function () {
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;

    }
    var flag=IsPC();
    console.log(flag)
    window.onresize=function () {
        onload();
    }
    onload();
    function onload() {
        var height=$(window).height();
        var nav_height=$(".j-nav-bar").height();
        var tail_height=$(".j-nav-tail").height();
        var container_height=height-nav_height-tail_height;
        container_height=container_height.toString()+"px";
        $(".j-container").css("height",container_height);
    }
    $(".j-other").hover(function(){
        $(".j-grid").slideDown(250);
        $(".j-container").css("z-index","-1");
        $(".j-cover").css("display","block");
    },function () {
        $(".j-grid").slideUp(1);
        $(".j-container").css("z-index","0");
        $(".j-cover").css("display","none");
    })
    function getNumCode() {
        var img = document.getElementById("code_picture");
        img.src = "http://111.230.101.206/php/admin/code.php?"+new Date().getTime();
    }
    function jump(){
        window.location.href="login.html";
    }
    $("#login").click(function () {
        alert("mmd");
    });
    $("#register").click(function () {
        alert("mmd");
    })
    function setcookie(name,password,exdays)
    {
        var d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = "name" + "=" + name + "; " + expires;+"path=/";
        document.cookie = "password" + "=" + password + "; " + expires;+"path=/";
    }

})