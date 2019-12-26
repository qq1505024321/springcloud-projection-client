package com.jk.model;

import java.io.Serializable;

public class HouseMating_xc implements Serializable {
    private static final long serialVersionUID = 3404852067925799654L;
    private Integer housematingid;

    private Integer houseid;

    private String bathroom;

    private String electric;

    private String facility;

    private String especially;

    private Integer receptionsex;

    private String askfor;

    public Integer getHousematingid() {
        return housematingid;
    }

    public void setHousematingid(Integer housematingid) {
        this.housematingid = housematingid;
    }

    public Integer getHouseid() {
        return houseid;
    }

    public void setHouseid(Integer houseid) {
        this.houseid = houseid;
    }

    public String getBathroom() {
        return bathroom;
    }

    public void setBathroom(String bathroom) {
        this.bathroom = bathroom == null ? null : bathroom.trim();
    }

    public String getElectric() {
        return electric;
    }

    public void setElectric(String electric) {
        this.electric = electric == null ? null : electric.trim();
    }

    public String getFacility() {
        return facility;
    }

    public void setFacility(String facility) {
        this.facility = facility == null ? null : facility.trim();
    }

    public String getEspecially() {
        return especially;
    }

    public void setEspecially(String especially) {
        this.especially = especially == null ? null : especially.trim();
    }

    public Integer getReceptionsex() {
        return receptionsex;
    }

    public void setReceptionsex(Integer receptionsex) {
        this.receptionsex = receptionsex;
    }

    public String getAskfor() {
        return askfor;
    }

    public void setAskfor(String askfor) {
        this.askfor = askfor == null ? null : askfor.trim();
    }
}