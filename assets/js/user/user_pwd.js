$(function() {
//     - 利用 form.verify()  来定义规则
//   - 长度必须是6到12位
//   - 不能与旧密码一致
//   - 两次密码是否相同
// - 在对应的表单元素中，利用 lay-verify 来设置自定义校验规则

    const form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        samePwd:val => {
            if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同！";
        },
        rePwd: (val) => {
            if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
        },
    })

    // 发送请求，重置密码
        $(".layui-form").on("submit", (e) => {
           e.preventDefault();
           $.ajax({
               type: "POST",
               url: "/my/updatepwd",
               data: $(".layui-form").serialize(),
               success: (res) => {
                   //修改密码成功后清空token并返回登录界面
                   if (res.status !== 0) return layer.msg("更新密码失败！");
                   localStorage.removeItem("token")
                   window.parent.location.href = '/login.html'
               },
           });
        }); 
})