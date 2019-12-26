package com.jk.httpclient;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;  
import java.util.List;  
import java.util.Map;  
import java.util.Map.Entry;  
import org.apache.http.HttpEntity;  
import org.apache.http.HttpResponse;  
import org.apache.http.NameValuePair;  
import org.apache.http.client.HttpClient;  
import org.apache.http.client.entity.UrlEncodedFormEntity;  
import org.apache.http.client.methods.HttpPost;  
import org.apache.http.message.BasicNameValuePair;  
import org.apache.http.util.EntityUtils;  
/* 
 * 利用HttpClient进行post请求的工具类 
 */  
//调用短信发送接口的工具类
public class HttpClientUtil {  
    public String doPost(String url,Map<String,String> map,String charset){  
        HttpClient httpClient = null;  
        HttpPost httpPost = null;  
        String result = null;  
        try{  
            httpClient = new SSLClient();  
            httpPost = new HttpPost(url);  
            //设置参数  
            
            List<NameValuePair> list = new ArrayList<NameValuePair>();  
            Iterator iterator = map.entrySet().iterator();  
            while(iterator.hasNext()){  
                Entry<String,String> elem = (Entry<String, String>) iterator.next();  
                list.add(new BasicNameValuePair(elem.getKey(),elem.getValue()));  
            }  
            Long timers = new Date().getTime();
            String appKey = "d157e390acfdb7404bcfa9c12d0c3b4f";//标识
            String appSecret = "20ce25007fb0";//密钥
            String nonce = "1234";	//随机数（最大长度128个字符）
            String curTime = timers.toString();	//当前UTC时间戳，从1970年1月1日0点0 分0 秒开始到现在的秒数(String)
//            CheckSum	SHA1(AppSecret + Nonce + CurTime),三个参数拼接的字符串，进行SHA1哈希计算，转化成16进制字符(String，小写)
           
            String checkSumStr = CheckSumBuilder.getCheckSum(appSecret, nonce, curTime);
            httpPost.setHeader("AppKey", appKey);
            httpPost.setHeader("Nonce", nonce);
            httpPost.setHeader("CurTime", timers.toString());
            httpPost.setHeader("CheckSum", checkSumStr);
            if(list.size() > 0){  
                UrlEncodedFormEntity entity = new UrlEncodedFormEntity(list,charset);  
                httpPost.setEntity(entity);  
            }  
            HttpResponse response = httpClient.execute(httpPost);  
            if(response != null){  
                HttpEntity resEntity = response.getEntity();  
                if(resEntity != null){  
                    result = EntityUtils.toString(resEntity,charset);  
                }  
            }  
        }catch(Exception ex){  
            ex.printStackTrace();  
        }  
        return result;  
    }  
}