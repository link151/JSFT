package com.cn.link.mapper;

import java.util.List;

import com.cn.link.model.CreateAccept;
import com.cn.link.model.CreateBill;

public interface CreateAcceptMapper {
	public List<CreateAccept> listAllAccept();
	
	public CreateBill selectByPrimaryKey(String contractid);
	
	public int updateAcceptByKeySelective(CreateAccept record);
	
	public int editAcceptByKeySelective(CreateAccept record);
	
	public int updateLock(int id, String contractid, double lockamount, double lockrate);
	
	public CreateAccept getInfoFromBillAndAccept(String contractid);
	
	public List<CreateAccept> listAllAcceptByDate(String paydate);
}
