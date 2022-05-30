$(function() {
     // 点击去注册账号让 登录框隐藏，注册框显示
  $("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击去登录让 注册框隐藏，登录框显示
  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  // 引入form模块
  const form = layui.form;

  // 自定义检测校验规则
 form.verify({
   //密码校验规则
  pwd: [
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ],

  repwd:(value) => {
    //1.获取当前数入的值
    //2.获取密码框的值
    //3.两者进行判断
    //4.如果不一致，提示消息
    const pwd = $('#form_reg [name=password]').val()
    if(pwd !==value) return "两次密码不一致"
  }
 })

 // 获取 layui 弹窗
const layer = layui.layer;
// 设置请求根路径
// const baseUrl = "http://www.liulongbin.top:3007";

// 监听注册表单，发送注册请求
$("#form_reg").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/api/reguser",
        data: {
            username: $("#form_reg [name=username").val(),
            password: $("#form_reg [name=password").val(),
        },
        success: (res) => {
          // console.log(res);
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg("注册成功！");
            // 注册成功后跳转到登录界面
            $("#link_login").click();
        },
    });
});

//登录请求
$('#form_login').on('submit', function(e) {
  //阻止表单默认提交行为
  e.preventDefault();
  $.ajax({
    type:"POST",
    url: "/api/login",
    data:$(this).serialize(),
    success:(res) => {
      // console.log(res)
      if(res.status !== 0) return layer.msg('登录失败')
      layer.msg('登录成功')
      //把登录的唯一标识 token 存在本地存储
      localStorage.setItem('token',res.token)
      //跳转到主页
      location.href = "/index.html"
    }
  })
})
})