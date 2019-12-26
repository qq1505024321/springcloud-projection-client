package com.jk.model;

import java.io.Serializable;

public class RealOrder_xc implements Serializable {
    private static final long serialVersionUID = -6638168068427694277L;
    private Integer realid;

    private String realname;

    private String realicard;

    private String realphone;

    private Integer orderid;

    public Integer getRealid() {
        return realid;
    }

    public void setRealid(Integer realid) {
        this.realid = realid;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname == null ? null : realname.trim();
    }

    public String getRealicard() {
        return realicard;
    }

    public void setRealicard(String realicard) {
        this.realicard = realicard == null ? null : realicard.trim();
    }

    public String getRealphone() {
        return realphone;
    }

    public void setRealphone(String realphone) {
        this.realphone = realphone == null ? null : realphone.trim();
    }

    public Integer getOrderid() {
        return orderid;
    }

    public void setOrderid(Integer orderid) {
        this.orderid = orderid;
    }
}