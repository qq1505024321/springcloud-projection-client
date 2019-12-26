package com.jk.mapper;

import com.jk.model.UserInfo;
import com.jk.model.Users;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UsersMapper {

    List<Users> queryUserByName(@Param("username") String username);

    void insertUser(Users user);

    void updateUser(Users user);

    List<Users> queryUserByphone(Users user);

    void insertUserInfo(@Param("userid")Integer userid);

    UserInfo queryUserById(Users user);

    void updateUserById(UserInfo userInfo);

    void updateUserInfoById(UserInfo userInfo);
}