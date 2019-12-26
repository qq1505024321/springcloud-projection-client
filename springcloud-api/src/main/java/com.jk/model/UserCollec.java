package com.jk.model;

import java.io.Serializable;

public class UserCollec implements Serializable {

    private static final long serialVersionUID = 5865649594632636161L;

    private Integer userid;

    private Integer houseid;

    private String houseimg;

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Integer getHouseid() {
        return houseid;
    }

    public void setHouseid(Integer houseid) {
        this.houseid = houseid;
    }

    public String getHouseimg() {
        return houseimg;
    }

    public void setHouseimg(String houseimg) {
        this.houseimg = houseimg == null ? null : houseimg.trim();
    }
}