package com.jk.controller;

import com.alibaba.fastjson.JSONObject;
import com.jk.model.Users;
import com.jk.service.UserService;
import com.jk.httpclient.HttpClientUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Controller
@RequestMapping("login")
public class LoginController {
    @Autowired
    private UserService userService;
    @Autowired
    private RedisTemplate redisTemplate;

    @RequestMapping("tologin")
    public String tologin(){
        return "login";
    }

    @RequestMapping("toindex")
    public String toindex(){
        return "main";
    }

    // 登陆验证
    @RequestMapping("loginVerify")
    @ResponseBody
    public Integer loginVerify(Users user, HttpServletRequest request){
        Map<String, Object> map = userService.loginVerify(user);
        Object admin = map.get("admin");
        String userstr = JSONObject.toJSONString(admin);
        Users users = JSONObject.parseObject(userstr, Users.class);
        if(admin != null){
            request.getSession().setAttribute("loginUser", users);
        }
        return (Integer) map.get("result");
    }

    //发送验证码
    @RequestMapping("faCode")
    @ResponseBody
    public Integer faCode(String phone) {
        int flag = 1; //  1代表第一次发送
        String p = phone + "login"; //手机号+login作为键
        if (redisTemplate.opsForValue().get(p)!=null) {//如果不是空 说明已经发送验证码
            flag=2; // 2代表已经发送
            return flag;
        }
        String url = "https://api.netease.im/sms/sendcode.action";
        Map<String, String> map = new HashMap<String, String>();
        map.put("mobile", phone);  // 接收验证码的手机号
        map.put("codeLen", "6"); // 验证码长度  默认为4
        //map.put("templateid","14833157"); // 模板语音验证 模板号 不加默认使用短信
        HttpClientUtil clientUtil = new HttpClientUtil();
        // String str = "{'code':200,'msg':'8','obj':'35842'}";  //  测试用（返回的格式）
        String str = clientUtil.doPost(url, map, "utf-8");
        System.out.println("返回的内容："+str);
        JSONObject jsObj = JSONObject.parseObject(str);
        String yzm = jsObj.getString("obj");// obj 返回的验证码默认的键
        redisTemplate.opsForValue().set(p,yzm,300, TimeUnit.SECONDS);  //  向redis里存入数据和设置缓存时间
        return flag;
    }

    //验证码登录验证
    @RequestMapping("LoginYanzheng")
    @ResponseBody
    public Integer LoginYanzheng(String sjh,String yzm){
        Integer result = 1;// 验证失败
        String p = sjh + "login";
        String sjyzm = (String) redisTemplate.opsForValue().get(p);//获取redis里的验证码信息
        if (sjyzm.equals(yzm)) {// 判断是否跟用户输入的一致
            result = 2;//  验证码匹配成功
        }
        return result;
    }

    //注册 新增用户信息
    @RequestMapping("register")
    @ResponseBody
    public Integer register(Users user,String yzm){
        Integer result = 1;// 验证码匹配失败
        String p = user.getPhone() + "login";
        String sjyzm = (String) redisTemplate.opsForValue().get(p);//获取redis里的验证码信息
        if (sjyzm.equals(yzm)) {// 判断是否跟用户输入的一致
            result = 2;//  验证码匹配成功
            userService.insertUser(user);
        }
        return result;
    }

    //注册 新增用户信息
    @RequestMapping("phoneUsername")
    @ResponseBody
    public Integer phoneUsername(Users user){
        Integer result = 2;// 用户和手机匹配失败
        List<Users> list = userService.queryUserByphone(user);
        if (list!=null&&list.size()>0){
            result = 1;
        }
        return result;
    }

    //注册 新增用户信息
    @RequestMapping("resetPwd")
    @ResponseBody
    public Integer resetPwd(Users user,String yzm){
        Integer result = 2;//   验证码匹配失败
        String p = user.getPhone() + "login";
        String sjyzm = (String) redisTemplate.opsForValue().get(p);//获取redis里的验证码信息
        if (sjyzm.equals(yzm)) {// 判断是否跟用户输入的一致
            result = 1;//  验证码匹配成功
            userService.updateUser(user);
        }
        return result;
    }







}
