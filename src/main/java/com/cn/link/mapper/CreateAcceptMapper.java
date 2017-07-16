package com.cn.link.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cn.link.model.CreateAccept;
import com.cn.link.model.CreateBill;

public interface CreateAcceptMapper {
	public List<CreateAccept> listAllAccept();
	
	public CreateBill selectByPrimaryKey(String contractid);
	
	public List<CreateAccept> selectByFilter(@Param("contractid")String contractid, @Param("bank")String bank, 
			@Param("currency")String currency, @Param("paydate")String paydate, @Param("registerdate")String registerdate,
			@Param("payamount")String payamount);
	
	public int updateAcceptByKeySelective(CreateAccept record);
	
	public int editAcceptByKeySelective(CreateAccept record);
	
	public int updateLock(int id, String contractid, String lockamount, String lockrate);
	
	public int updateAcceptState(String contractid);
	
	public List<CreateAccept> getInfoFromBillAndAccept(String contractid);
	
	public List<CreateAccept> listAllAcceptByDate(String paydate1, String paydate2);
	
	public void acceptDelete(int id);
}
