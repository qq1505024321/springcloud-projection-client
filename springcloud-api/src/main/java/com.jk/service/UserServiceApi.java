package com.jk.service;

import com.jk.model.UserInfo;
import com.jk.model.Users;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

public interface UserServiceApi {
    // 登陆
    @RequestMapping("loginVerify")
    Map<String, Object> loginVerify(@RequestBody Users user);
    // 注册
    @RequestMapping("insertUser")
    void insertUser(@RequestBody Users user);
    // 重置密码
    @RequestMapping("updateUser")
    void updateUser(@RequestBody Users user);
    // 判断用户和手机是否匹配
    @RequestMapping("queryUserByphone")
    List<Users> queryUserByphone(@RequestBody Users user);
    //---------上面登陆注册-----------

    // 查询用户个人资料
    @RequestMapping("queryUserById")
    UserInfo queryUserById(@RequestBody Users u);

    // 修改用户个人资料
    @RequestMapping("userService")
    void userService(@RequestBody UserInfo userInfo);
}
