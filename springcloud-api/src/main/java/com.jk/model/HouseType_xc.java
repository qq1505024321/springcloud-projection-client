package com.jk.model;

import java.io.Serializable;

public class HouseType_xc implements Serializable {

    private static final long serialVersionUID = -2643910460186793352L;

    private Integer housetypeid;

    private String housetype;

    public Integer getHousetypeid() {
        return housetypeid;
    }

    public void setHousetypeid(Integer housetypeid) {
        this.housetypeid = housetypeid;
    }

    public String getHousetype() {
        return housetype;
    }

    public void setHousetype(String housetype) {
        this.housetype = housetype == null ? null : housetype.trim();
    }
}