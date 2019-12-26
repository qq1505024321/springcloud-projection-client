package com.jk.model;

import java.io.Serializable;

public class HouseImg_xc implements Serializable {
    private static final long serialVersionUID = -4861087194874930027L;
    private Integer imgid;

    private String woshiimgurl;

    private Integer houseid;

    private String ketingimgurl;

    private String wsjimgurl;

    private String chufangimgurl;

    private String qitaimgurl;

    public Integer getImgid() {
        return imgid;
    }

    public void setImgid(Integer imgid) {
        this.imgid = imgid;
    }

    public String getWoshiimgurl() {
        return woshiimgurl;
    }

    public void setWoshiimgurl(String woshiimgurl) {
        this.woshiimgurl = woshiimgurl == null ? null : woshiimgurl.trim();
    }

    public Integer getHouseid() {
        return houseid;
    }

    public void setHouseid(Integer houseid) {
        this.houseid = houseid;
    }

    public String getKetingimgurl() {
        return ketingimgurl;
    }

    public void setKetingimgurl(String ketingimgurl) {
        this.ketingimgurl = ketingimgurl == null ? null : ketingimgurl.trim();
    }

    public String getWsjimgurl() {
        return wsjimgurl;
    }

    public void setWsjimgurl(String wsjimgurl) {
        this.wsjimgurl = wsjimgurl == null ? null : wsjimgurl.trim();
    }

    public String getChufangimgurl() {
        return chufangimgurl;
    }

    public void setChufangimgurl(String chufangimgurl) {
        this.chufangimgurl = chufangimgurl == null ? null : chufangimgurl.trim();
    }

    public String getQitaimgurl() {
        return qitaimgurl;
    }

    public void setQitaimgurl(String qitaimgurl) {
        this.qitaimgurl = qitaimgurl == null ? null : qitaimgurl.trim();
    }
}