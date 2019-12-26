package com.jk.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @ClassName MongoImg
 * @Description: TODO
 * @Author 梁浩
 * @Date 2019/12/17
 * @Version V1.0
 **/
@Document(collection = "img")
public class MongoImg {

    @Id
    private String id;

    private String imgurl;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImgurl() {
        return imgurl;
    }

    @Override
    public String toString() {
        return "MongoImg{" +
                "id='" + id + '\'' +
                ", imgurl='" + imgurl + '\'' +
                '}';
    }

    public void setImgurl(String imgurl) {
        this.imgurl = imgurl;
    }
}
