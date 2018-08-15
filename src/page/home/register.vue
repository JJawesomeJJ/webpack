<template>
        <div class="container">
        <form name="myForm" id="myForm">
            <fieldset>
                <input type="text" name="user" id="user" placeholder="用户名"><br>
                <input type="password" name="password" id="password" placeholder="密码"><br>
                <input type="password" name="password1"id="password1" placeholder="确认密码" ><br>
                <label></label>
                <input type="text" name="email" id="email" placeholder="email">
                <span><input type="radio" name="sex" id="man" value="man"><label>小哥哥</label></span>
                <span class="sex"><input type="radio" name="sex" id="women" value="women"><label>小姐姐</label></span><br>
                <span><input type="text" id="code" name="code" placeholder="请输入验证码"></span>
                <span class="f1" onclick="getNumCode()"><img src="http://111.230.101.206/php/admin/code.php" id="code_picture" width=100% height=100%/></span>
                <router-link to="/login"><input type="button" name="login" id="login" value="登录"/></router-link>
                <input type="button" neme="register" id="register"value="注册" v-on:click="check()"/>
            </fieldset>
        </form>
    </div>

</template>

<script>
    export default {
        name: "register",
        methods:{
            getNumCode() {
                var img = document.getElementById("code_picture");
                img.src = "http://111.230.101.206/php/admin/code.php?" + new Date().getTime();
            },
            check() {
                var x = document.forms["myForm"]["email"].value;
                var y = document.forms["myForm"]["user"].value;
                var z = document.forms["myForm"]["password"].value;
                var j = document.forms["myForm"]["password1"].value;
                var code = document.forms["myForm"]["code"].value;
                var sex = $("input[name='sex']:checked").val();
                if (y == "") {
                    alert("用户名不可为空");
                    return;
                }
                if (z.length < 6) {
                    alert("请确保密码大于6位");
                    return;
                }
                if (j != z) {
                    alert("密码不一致");
                    return;
                }
                var atpos = x.indexOf("@");
                var dotpos = x.lastIndexOf(".");
                if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
                    alert("不是一个有效的 e-mail 地址");
                    return false;

                }
                if (typeof(sex) == "undefined") {
                    alert("您还未选择性别");
                    return;
                }
                if (code.length < 1) {
                    alert("请输入验证码");
                    return;
                }
                $.ajax({
                    type: 'post',
                    url: "http://111.230.101.206/php/admin/register.php",
                    data: {"code": code, "name": y, "password": z, "email": x, "sex": sex},
                    success: function (data) {
                        data = eval('(' + data + ')');
                        if (data["code"] == "200") {
                            alert("欢迎你" + y);
                            setcookie(y, z, 7);
                            window.location.href = "http://111.230.101.206";
                        }
                        else {
                            if (data["code"] == "403" && data["data"] == "code_error") {
                                alert("验证码错误");
                                getNumCode();
                                return;
                            }
                            else {
                                console.log(data["data"]);
                                if (data["data"] == "mail") {
                                    alert("该email已被注册");
                                    getNumCode();
                                }
                                else {
                                    alert("用户名已被注册");
                                    getNumCode();
                                }
                            }
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },
            setcookie(name,password,exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toGMTString();
                document.cookie = "name" + "=" + name + "; " + expires;
                +"path=/";
                document.cookie = "password" + "=" + password + "; " + expires;
                +"path=/";
            },

    },
        created(){
        }
    }
</script>

<style>
</style>