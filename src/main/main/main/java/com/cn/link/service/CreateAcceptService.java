package com.cn.link.service;

import java.util.List;

import com.cn.link.model.CreateAccept;
import com.cn.link.model.CreateBill;

public interface CreateAcceptService {
	public List<CreateAccept> listAllAccept();
//	public CreateAccept selectByPrimaryKey(String contractid);
	public CreateBill selectByPrimaryKey(String contractid);
	public int updateAcceptByKeySelective(CreateAccept record);
	public int EditAcceptByKeySelective(CreateAccept record);
	public int updateLock(int id, String contractid, double lockamount, double lockrate);
	public List<CreateAccept> listAllAcceptByDate(String paydate);
	
	public CreateAccept getInfoFromBillAndAccept(String contractid);
}
