<template>
<div class="container">
    <form name="myForm" id="myForm">
        <fieldset>
            <lable></lable>
            <input type="text" name="user" placeholder="用户名"><br>
            <label></label>
            <input type="password" name="password" placeholder="密码"><br>
            <input type="text" id="code" name="code" placeholder="请输入验证码">
            <span class="f1" onclick="getNumCode()"><img src="http://111.230.101.206/php/admin/code.php" id="code_picture" width=100% height=100%/></span>
            <input type="button"  id="login" value="登录"@click="check()"/>
             <router-link to="/register"><input type="button" id="register" value="注册"></router-link>
        </fieldset>
    </form>
</div>
</template>

<script>
export default {
name: "login",
 methods: {
            check() {
                var x = document.forms["myForm"]["user"].value;
                var y = document.forms["myForm"]["password"].value;
                var code = document.forms["myForm"]["code"].value;
                if (x == "" || y == "") {
                    alert("用户名或密码不可为空");
                    return false;
                }
                $.ajax({
                    type: 'post',
                    url: "http://111.230.101.206/php/admin/login_database.php",
                    data: {"code": code, "name": x, "password": y},
                    success: function (data) {
                        data = eval('(' + data + ')');
                        if (data["code"] == "200") {
                            alert("欢迎你" + x);
                            setcookie(x, y, 7);
                            window.location.href = "http://111.230.101.206";
                        }
                        else {
                            if (data["code"] == "403" && data["data"] == "code_error") {
                                alert("验证码错误");
                                getNumCode();
                                return;
                            }
                            else {
                                if (data["data"] == "unsign") {
                                    alert("该用户尚未注册");
                                    getNumCode();
                                }
                                else {
                                    alert("密码错误");
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
            setcookie(name, password, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toGMTString();
                document.cookie = "name" + "=" + name + "; " + expires;
                +"path=/";
                document.cookie = "password" + "=" + password + "; " + expires;
                +"path=/";
            },
            getNumCode() {
                var img = document.getElementById("code_picture");
                img.src = "http://111.230.101.206/php/admin/code.php?" + new Date().getTime();
            }
        }
}
</script>
<style>
</style>