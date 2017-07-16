package com.cn.link.model;

public class CreateAccept {
	private Integer id;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	private String contractid;
	private String bank;
	private String currency;
	private Double payamount;
	private Integer days;
	private String week;
	private String paydate;
	private String registerdate;
	private Double lockamount;
	private Double lockrate;
	private String state;
	
	private CreateBill bill;
	
	public String getContractid() {
		return contractid;
	}
	public void setContractid(String contractid) {
		this.contractid = contractid == null ? null : contractid.trim();;
	}
	public String getBank() {
		return bank;
	}
	public void setBank(String bank) {
		this.bank = bank  == null ? null : bank.trim();
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency  == null ? null : currency.trim();
	}
	public Double getPayamount() {
		return payamount;
	}
	public void setPayamount(Double payamount) {
		this.payamount = payamount;
	}
	public Integer getDays() {
		return days;
	}
	public void setDays(Integer days) {
		this.days = days;
	}
	public String getWeek() {
		return week;
	}
	public void setWeek(String week) {
		this.week = week  == null ? null : week.trim();
	}
	public String getPaydate() {
		return paydate;
	}
	public void setPaydate(String paydate) {
		this.paydate = paydate  == null ? null : paydate.trim();
	}
	public String getRegisterdate() {
		return registerdate;
	}
	public void setRegisterdate(String registerdate) {
		this.registerdate = registerdate  == null ? null : registerdate.trim();
	}
	public Double getLockamount() {
		return lockamount;
	}
	public void setLockamount(Double lockamount) {
		this.lockamount = lockamount;
	}
	public Double getLockrate() {
		return lockrate;
	}
	public void setLockrate(Double lockrate) {
		this.lockrate = lockrate;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state  == null ? null : state.trim();
	}
	public CreateBill getBill() {
		return bill;
	}
	public void setBill(CreateBill bill) {
		this.bill = bill;
	}
	
	
	
}
