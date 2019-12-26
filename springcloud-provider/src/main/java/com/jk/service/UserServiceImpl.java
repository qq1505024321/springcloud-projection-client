package com.jk.service;

import com.jk.mapper.UsersMapper;
import com.jk.model.UserInfo;
import com.jk.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserServiceImpl implements UserServiceApi {
    @Autowired
    private UsersMapper usersMapper;

    // 登陆验证
    @Override
    public Map<String, Object> loginVerify(Users user) {
        Map<String, Object> map = new HashMap<>();
        int result = 3; //没有此用户
        List<Users> list = usersMapper.queryUserByName(user.getUsername());
        if (list!=null&&list.size()>0){
            result=2;   // 密码错误
            Users admin = list.get(0);
            if (user.getUserpwd().equals(admin.getUserpwd())){
                result=1;   //登陆成功
                map.put("admin", admin);
            }
        }
        map.put("result", result);
        return map;
    }

    @Override
    public void insertUser(Users user) {
        usersMapper.insertUser(user);
        usersMapper.insertUserInfo(user.getUserid());   //新增用户详细信息
    }

    @Override
    public void updateUser(Users user) {
        usersMapper.updateUser(user);
    }

    @Override
    public List<Users> queryUserByphone(Users user) {
        return usersMapper.queryUserByphone(user);
    }

    @Override
    public UserInfo queryUserById(Users u) {
        System.out.println("++++++++++++++++++++++++++"+u.getUserid());
        return usersMapper.queryUserById(u);
    }

    @Override
    public void userService(UserInfo userInfo) {
        usersMapper.updateUserById(userInfo);
        usersMapper.updateUserInfoById(userInfo);
    }
}
