$(function() {
    const form = layui.form;
    // 自定义校验规则
    form.verify({   
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        },
    });

//   在 user_info.js 中定义并调用 initUserInfo 函数
// - 在  initUserInfo  函数中 调用 $.ajax() 获取用户基本信息
// - 如果返回的 status 为0，那么代表成功，如果不等于，代表失败，利用 layer进行提示

    const layer = layui.layer;
    // 初始化用户信息
    const initUserInfo = () => {
      $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: (res) => {
          if (res.status !== 0) return layer.msg("获取用户信息失败！");
        //   console.log(res);
        // 调用 form.val() 方法为表单赋值
          form.val("formUserInfo", res.data);
        },
      });
    };

    //重置功能
    $('#btncz').click((e) => {
        e.preventDefault();
        // 重新调用 initUserInfo() 函数，重新获取用户信息
        initUserInfo()
    })

    // 更新用户数据
    // 监听表单提交事件，在事件处理函数里面取消默认行为
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            // 利用 $(this).serialize() 获取表单数据
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0) return layer.msg('修改用户信息失败！')
                // 调用父页面渲染函数
                window.parent.getUserInfo();
            }
        })

    })
    initUserInfo()
})