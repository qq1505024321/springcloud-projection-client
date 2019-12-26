package com.jk.controller;

import java.io.FileWriter;
import java.io.IOException;

public class AlipayConfig {
    // 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
    public static String app_id = "2016101500692323";

    // 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCVMI3nK3UOQpbgbvuyWO8lTZTswFlJaxWPVK5hvicA13mdH1Om6kTvdkR1QTHfpKWAzwoqXbLr5qLd9NT1PnN45yMs88CSfr6vDqiUeEJV7uU4Kvre5zHtqpdvt+nASUQlspS/YyAZ/8R73MmdZp9KtvAqy9HicIZ/4Nz872VFO2fApBnY3+yuNbJknzWBJ3vDthU3keFSwpl1EoinsUq1svhYfglfOwDQ3et2qAhF7qxfAL+ICTdukIljK3rG3b4PLpzeZ3HBnQ7/bk0YnhCtiuRdU+Gp8giYZl5iYL3Q7v3uOlQ1k1lZmekKPeUg1WWDaT/wCrq5o8hTVSSNvN6VAgMBAAECggEAfQOb1VuYEiQAk/7MEQ3vD34sTht8dkYyYdHe8m7J9i2Zbe1jRppGu7aJ9Qt1hGdOfFqBtTChDoZMcduIXB1B280rr65t7xQgK0cIQqlnROUT1PZHFGP9dZ+emHIvgP6kCUbU2G9y5fZqKjTACZKF5rDXHbV/odUTD7NY2uasIM8zAnenLGSxRJBMUzRZX3clOBXPNNqoZ9dT0WppmSYtSQfRTqQkD5dSELwCP1geFWZ0Lh0ENloYZeuvXLqBCPKL4u60QMYNO3T5HIp6lc4LJRP0Loh04aaiRxW/zr3kmpjhvRnHxk03ChOt6QIK5cOQIA08Q0ENtYIz/3UYWZ993QKBgQDpr45z4PT9GwS5+P+G6V+yohpgR0LssyBKI2yY9mE0TRqiZC/bw+kmC3iqByQni1GeRyyrmm+0e7XGAM4JQKF/GQgZU5KH1aKXk/cZhmJhgUjRzrSpMWrGxKUjbaoNJu2wIAxplEzrB3Bv9CBDu89IMqI8QQnWBF7coWszUkSnfwKBgQCjb34RwzlNoWbdCmTfnDrUjRN/rCIpRhdKA+frwD/lVcyRM2vMmblEx6H7asI145KCAowiWDyNK+JJIxR8dVRpj7zInrsF99iHDDQXvrOhshik0QvnRS7s2Q4Nu0xgYUvRViyDk3eylXGjlAGwevuBWaWOh/mrCXxZY2E4FI9j6wKBgQDAYIYlX0xQEa4Sa6nwpq7hoBGWsROnSM+MOR1tz2a2Z8NFbLT5do65gzgSwU5CP68xXeaoXrsXGcDLAF6dv1c0CqdgMiyvJnBz2JvTp43WN1h7YG/Z2ZTNjZVlVSJpMWL7W2bcg/nOgpFNmOv21uYNyaFFeUVfqrltaHWYCmH6gQKBgDxOrM9zIVcDAsj3x+c3aAH8mMBYzTY7teZK8K5uf2VptpWxyspxwwqdO6lhaI6oDezJcdpOgvF4ywQ/3JRcWyykrH2/DLYUEaMrnqFQbkpxRGS0+tZ5Eeq14Vixz2oVHPv+92gJ53ZPbOJ2f/UWPG4rnUqt5DP3yRnW8Q3XkF3HAoGBAOLpZ8xktD2ujyp4KvEuzgQ0Dw2ym+j9shpPYUECxA1Eyhyr9yuS2LlBB8eirErTuhwn5HYOOgteHIXYuDdJc0rmlellGOsUmzdBfC+DSViXppr1nGmnnQaFX+86TdOTXx9zOXi2bCWgyRqx55iowRTl//CllBtGkOwlfq9U64Kc";

    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlTCN5yt1DkKW4G77sljvJU2U7MBZSWsVj1SuYb4nANd5nR9TpupE73ZEdUEx36SlgM8KKl2y6+ai3fTU9T5zeOcjLPPAkn6+rw6olHhCVe7lOCr63ucx7aqXb7fpwElEJbKUv2MgGf/Ee9zJnWafSrbwKsvR4nCGf+Dc/O9lRTtnwKQZ2N/srjWyZJ81gSd7w7YVN5HhUsKZdRKIp7FKtbL4WH4JXzsA0N3rdqgIRe6sXwC/iAk3bpCJYyt6xt2+Dy6c3mdxwZ0O/25NGJ4QrYrkXVPhqfIImGZeYmC90O797jpUNZNZWZnpCj3lINVlg2k/8Aq6uaPIU1UkjbzelQIDAQAB";

    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String notify_url = "http://localhost:8092/login/toindex";

    // 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String return_url = "http://localhost:8092/login/toindex";

    // 签名方式
    public static String sign_type = "RSA2";

    // 字符编码格式
    public static String charset = "utf-8";

    // 支付宝网关
    public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";

    // 支付宝网关
    public static String log_path = "D:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /**
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
