package com.jk.model;

import java.io.Serializable;

public class Housedescribe_xc implements Serializable {
    private static final long serialVersionUID = -4884907167914581084L;
    private Integer housedescribeid;

    private Integer houseid;

    private String housetitle;

    private String styleshow;

    private String adorn;

    private String traffic;

    private String rim;

    public Integer getHousedescribeid() {
        return housedescribeid;
    }

    public void setHousedescribeid(Integer housedescribeid) {
        this.housedescribeid = housedescribeid;
    }

    public Integer getHouseid() {
        return houseid;
    }

    public void setHouseid(Integer houseid) {
        this.houseid = houseid;
    }

    public String getHousetitle() {
        return housetitle;
    }

    public void setHousetitle(String housetitle) {
        this.housetitle = housetitle == null ? null : housetitle.trim();
    }

    public String getStyleshow() {
        return styleshow;
    }

    public void setStyleshow(String styleshow) {
        this.styleshow = styleshow == null ? null : styleshow.trim();
    }

    public String getAdorn() {
        return adorn;
    }

    public void setAdorn(String adorn) {
        this.adorn = adorn == null ? null : adorn.trim();
    }

    public String getTraffic() {
        return traffic;
    }

    public void setTraffic(String traffic) {
        this.traffic = traffic == null ? null : traffic.trim();
    }

    public String getRim() {
        return rim;
    }

    public void setRim(String rim) {
        this.rim = rim == null ? null : rim.trim();
    }
}