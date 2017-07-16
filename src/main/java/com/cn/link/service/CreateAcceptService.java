package com.cn.link.service;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.cn.link.model.CreateAccept;
import com.cn.link.model.CreateBill;

public interface CreateAcceptService {
	public List<CreateAccept> listAllAccept();
//	public CreateAccept selectByPrimaryKey(String contractid);
	public CreateBill selectByPrimaryKey(String contractid);
	public int updateAcceptByKeySelective(CreateAccept record);
	public int EditAcceptByKeySelective(CreateAccept record);
	public int updateLock(int id, String contractid, String lockamount, String lockrate);
	public int updateState(String contractid);
	public List<CreateAccept> listAllAcceptByDate(String paydate1, String paydate2);
	public boolean AcceptExportExcel(String contractid, String bank, String currency, String paydate, String registerdate, String payamount, HttpServletResponse response); 
	public List<CreateAccept> getInfoFromBillAndAccept(String contractid);
	public void AcceptDelete(int[] ids);
}
