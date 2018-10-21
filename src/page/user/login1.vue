<template>
    <div class="container" style="top:28%;">
        <form name="myForm" id="myForm">
            <fieldset>
                <div class="user-model" style="position: relative;margin: 0 auto;width:90%;height:30px;">
                    <ul style="display: flex;position: relative;margin: 0 auto;font-weight: bold;font-size: 15px;">
                        <li style="position:relative;margin-left: 40%;color: black;word-break:keep-all;"> <router-link to="/register" style="color:black;">注册</router-link></li>
                        <li style="margin-left:5%;color:green;word-break:keep-all;">登录</li>
                    </ul>
                </div>
                <input type="text" name="user" placeholder="用户名"><br>
                <input type="password" name="password" placeholder="密码"><br>
                <span><input type="text" id="code" name="code" placeholder="请输入验证码"></span>
                <span class="f1" @click="getNumCode()"><img src="http://39.108.236.127/php/admin/code.php" id="code_picture" width=100% height=100%/></span>
                <input type="button"  id="login" value="登录"@click="check()"/>
            </fieldset>
        </form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data:function () {
            return{
                code:null,
                x:null,
                y:null,
            }
        },
        created(){
        },
        methods: {
            check() {
                var x = document.forms["myForm"]["user"].value;
                var y = document.forms["myForm"]["password"].value;
                var code = document.forms["myForm"]["code"].value;
                this.code = code;
                this.x = x;
                this.y = y;
                if (x == "" || y == "") {
                    this.toast("用户名或密码不可为空");
                    return false;
                }
                var send_data = {"code": code, "name": x, "password": y}
                this.$http.post("http://39.108.236.127/php/admin/login_database.php",
                    {
                        code:this.code,
                        name:this.x,
                        password:this.y
                    },
                    {emulateJSON: true}
                )
                    .then((res) => {//成功胡回调
                        res= eval('(' + res.bodyText + ')');
                        console.log(res);
                        if (res["code"] == "200") {
                            this.toast("欢迎你" + x);
                            this.setcookie(x,res['email'], 1);
                            this.websocket(x);
                            window.history.back();
                        }
                        else {
                            if (res["code"] == "403" && res["data"] == "code_error") {
                                this.toast("验证码错误");
                                this.getNumCode();
                                return;
                            }
                            else {
                                if (res["data"] == "unsign") {
                                    this.toast("该用户尚未注册");
                                    this.getNumCode();
                                }
                                else {
                                    this.toast("密码错误");
                                    this.getNumCode();
                                }
                            }
                        }
                    })
                    .catch((error) => {   //失败的回掉
                        console.log(error)
                    });
            },
            websocket(name){
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
                    var system_data=eval('(' + evt.data + ')');
                    if(system_data.type=='system')
                    {
                        var users=[];
                        for(var user in system_data.online)
                        {
                            users.push(decodeURI(user))
                        }
                        alert("在线人数"+system_data.online_count+'/n');
                        localStorage.setItem("socket_data",JSON.stringify(system_data.online));
                        console.log(system_data.online);

                    }
                    else{
                        alert(evt.data);
                    }
                }
                websocket.onerror=function (evt,e) {
                    console.log('error');
                }
            },
            setcookie(name, email, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toGMTString();
                document.cookie = "name" + "=" + name + "; " + expires;
                +"path=/";
                document.cookie = "email" + "=" + email + "; " + expires;
                +"path=/";
            },
            getNumCode() {
                var img = document.getElementById("code_picture");
                img.src = "http://39.108.236.127/php/admin/code.php?" + new Date().getTime();
            }
        }
    }
</script>
<style>
</style>