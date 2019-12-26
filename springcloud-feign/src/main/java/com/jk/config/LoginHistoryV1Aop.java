package com.jk.config;

import com.jk.model.Visitor;
import com.jk.service.HouseService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

/**
 * 〈一句话功能简述〉<br>
 * 〈〉
 *
 * @author ccl
 * @create 2019/12/22
 * @since 1.0.0
 */
@Aspect
@Component
public class LoginHistoryV1Aop {

    @Autowired
    private HouseService houseService;

    //只匹配 api 包中以下 5 个类中的以 ogin 结尾的方法
    @Pointcut("execution(public * com.jk.controller.HouseController.*ndex(..)) ")
 /*   @Pointcut("execution(public * com.jk.controller.HouseController.*ndex(..)) " +
            "|| execution(public * com.jk.controller.LoginController.*ndex(..)) " +
            "|| execution(public * com.jk.controller.HouseController.*urse(..)) " +
            "|| execution(public * com.jk.controller.HouseController.*ndex2(..)) " +
            "|| execution(public * com.jk.controller.HouseController.*ouse2(..)) " +
            "|| execution(public * com.jk.controller.HouseController.*ndex(..)) " )*/
          /*  "|| execution(public * com.dmap.auth.controller.api.WechatController.*ogin(..)) " +
            "|| execution(public * com.dmap.auth.controller.api.WeboController.*ogin(..)) " +
            "|| execution(public * com.dmap.auth.controller.api.LenovoController.*ogin(..))")*/
    public void loginHistoryLog() {
        //Do nothing in this method.
    }

    @AfterReturning(pointcut = "loginHistoryLog()", returning = "object")
    public void doAfterReturning(JoinPoint joinPoint, Object object) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request;
        String tempIp = "";
        if (attributes != null) {
            request = attributes.getRequest();
            if (request != null) {
                tempIp = request.getRemoteAddr();
            }
        }
        Long count = houseService.queryVisitor();
        System.out.println("访问量："+count);

        String ip = tempIp;//获得 ip 地址
        Object value = object; //object 是切片所拦截的方法的返回值
        String classMethod = joinPoint.getSignature().getName();//获得调用的方法名称
        System.out.println(ip+"--"+value+"--"+classMethod+"--aop");
      //  if(value.equals("index") && classMethod.equals("toIndex")){
            Visitor visitor = new Visitor();
            visitor.setCalssmethod(classMethod);
            houseService.saveVisitor(visitor);
    //    }

    }


}