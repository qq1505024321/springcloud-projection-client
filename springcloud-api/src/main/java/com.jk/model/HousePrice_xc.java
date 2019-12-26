package com.jk.model;

import java.io.Serializable;

public class HousePrice_xc implements Serializable {
    private static final long serialVersionUID = -2985729184558410966L;
    private Integer housepriceid;

    private Integer dayprice;

    private Integer homesales;

    private Integer cashpledge;

    private Integer transactionrules;

    private Integer unsubscriberules;

    private Integer minimumdays;

    private String maxdays;

    private Integer foreigners;

    private String otherrequirements;

    private Integer houseid;

    private Integer cleaningfee;

    public Integer getHousepriceid() {
        return housepriceid;
    }

    public void setHousepriceid(Integer housepriceid) {
        this.housepriceid = housepriceid;
    }

    public Integer getDayprice() {
        return dayprice;
    }

    public void setDayprice(Integer dayprice) {
        this.dayprice = dayprice;
    }

    public Integer getHomesales() {
        return homesales;
    }

    public void setHomesales(Integer homesales) {
        this.homesales = homesales;
    }

    public Integer getCashpledge() {
        return cashpledge;
    }

    public void setCashpledge(Integer cashpledge) {
        this.cashpledge = cashpledge;
    }

    public Integer getTransactionrules() {
        return transactionrules;
    }

    public void setTransactionrules(Integer transactionrules) {
        this.transactionrules = transactionrules;
    }

    public Integer getUnsubscriberules() {
        return unsubscriberules;
    }

    public void setUnsubscriberules(Integer unsubscriberules) {
        this.unsubscriberules = unsubscriberules;
    }

    public Integer getMinimumdays() {
        return minimumdays;
    }

    public void setMinimumdays(Integer minimumdays) {
        this.minimumdays = minimumdays;
    }


    public String getMaxdays() {
        return maxdays;
    }

    public void setMaxdays(String maxdays) {
        this.maxdays = maxdays;
    }

    public Integer getForeigners() {
        return foreigners;
    }

    public void setForeigners(Integer foreigners) {
        this.foreigners = foreigners;
    }

    public String getOtherrequirements() {
        return otherrequirements;
    }

    public void setOtherrequirements(String otherrequirements) {
        this.otherrequirements = otherrequirements == null ? null : otherrequirements.trim();
    }

    public Integer getHouseid() {
        return houseid;
    }

    public void setHouseid(Integer houseid) {
        this.houseid = houseid;
    }

    public Integer getCleaningfee() {
        return cleaningfee;
    }

    public void setCleaningfee(Integer cleaningfee) {
        this.cleaningfee = cleaningfee;
    }
}