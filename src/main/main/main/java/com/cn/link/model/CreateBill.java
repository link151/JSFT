package com.cn.link.model;

import org.springframework.stereotype.Component;

@Component
public class CreateBill {
	private String contractid;

	private String bank;

	private String dept;

	private String goods;

	private String attribute;

	private String proxyclient;

	private String currency;

	private Double crtamount;

	private String crtdate;

	private Integer crtdeadline;

	private String state;

	private Integer id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getContractid() {
		return contractid;
	}

	public void setContractid(String contractid) {
		this.contractid = contractid == null ? null : contractid.trim();
	}

	public String getBank() {
		return bank;
	}

	public void setBank(String bank) {
		this.bank = bank == null ? null : bank.trim();
	}

	public String getDept() {
		return dept;
	}

	public void setDept(String dept) {
		this.dept = dept == null ? null : dept.trim();
	}

	public String getGoods() {
		return goods;
	}

	public void setGoods(String goods) {
		this.goods = goods == null ? null : goods.trim();
	}

	public String getAttribute() {
		return attribute;
	}

	public void setAttribute(String attribute) {
		this.attribute = attribute == null ? null : attribute.trim();
	}

	public String getProxyclient() {
		return proxyclient;
	}

	public void setProxyclient(String proxyclient) {
		this.proxyclient = proxyclient == null ? null : proxyclient.trim();
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency == null ? null : currency.trim();
	}

	public Double getCrtamount() {
		return crtamount;
	}

	public void setCrtamount(Double crtamount) {
		this.crtamount = crtamount;
	}

	public String getCrtdate() {
		return crtdate;
	}

	public void setCrtdate(String crtdate) {
		this.crtdate = crtdate == null ? null : crtdate.trim();
	}

	public Integer getCrtdeadline() {
		return crtdeadline;
	}

	public void setCrtdeadline(Integer crtdeadline) {
		this.crtdeadline = crtdeadline;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state == null ? null : state.trim();
	}

}