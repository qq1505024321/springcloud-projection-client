package com.jk.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "t_praise")
public class Praise implements Serializable {
    private static final long serialVersionUID = 86835281511917889L;

    private String id;  //  id

    private String coid;   //  被点赞评论id

    private String usid;   //  点赞人

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCoid() {
        return coid;
    }

    public void setCoid(String coid) {
        this.coid = coid;
    }

    public String getUsid() {
        return usid;
    }

    public void setUsid(String usid) {
        this.usid = usid;
    }

    @Override
    public String toString() {
        return "Praise{" +
                "id='" + id + '\'' +
                ", coid='" + coid + '\'' +
                ", usid='" + usid + '\'' +
                '}';
    }
}
