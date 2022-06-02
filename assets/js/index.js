//获取用户信息   
    function getUserInfo(){
        $.ajax({
            type: "GET",
            url:'/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem("token"),
            // },
            success: (res) => {
                // console.log(res);
                if(res.status !== 0) {
                    return      layer.msg('获取用户信息失败')
                }
                else{
                    layer.msg('获取用户信息成功')
                }
                xuanRan(res.data)
            }
        })
    }
    getUserInfo()

//渲染用户信息
    const xuanRan = (user) => {
        // console.log(user);
        let uname = user.nickname || user.username;
        //渲染欢迎语
        $('#welcome').html(`欢迎${uname}`)
        //按需渲染头像
        if(user.user_pic !== null) {
            //设置图片头像
            $('.layui-nav-img').attr('src',user.user_pic).show();
            $('.text-avatar').hide()
        }
        else {
            //设置文本头像
            $('.layui-nav-img').hide()
            $('.text-avatar').html(uname[0].toUpperCase())
        }
    }

//给退出按钮绑定点击退出事件
    $('#btnloginout').click(() => {
        layer.confirm('是否退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            layer.close(index);
            //退出要把本地储存清空
            localStorage.removeItem('token')
            location.href = '/login.html'
        });
    })
    function change() {
        $('#change').attr('class', 'layui-this').next().attr('class',"")
    }