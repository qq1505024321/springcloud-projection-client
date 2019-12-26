package com.jk.model;

import java.io.Serializable;

public class BedType_xc implements Serializable {

    private static final long serialVersionUID = 306162906946304772L;

    private Integer bedtypeid;

    private String bedtypename;

    public Integer getBedtypeid() {
        return bedtypeid;
    }

    public void setBedtypeid(Integer bedtypeid) {
        this.bedtypeid = bedtypeid;
    }

    public String getBedtypename() {
        return bedtypename;
    }

    public void setBedtypename(String bedtypename) {
        this.bedtypename = bedtypename == null ? null : bedtypename.trim();
    }
}