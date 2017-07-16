package com.cn.link.service;

import java.util.List;

import com.cn.link.model.CreateBill;

public interface CreateBillService {

	public int deleteByPrimaryKey(String contractid);

	public int insert(CreateBill record);

	public int insertSelective(CreateBill record);

	public CreateBill selectByPrimaryKey(String contractid);
	
	public CreateBill queryByContractIdAndState(String contractid);
	
	public CreateBill queryByContractIdAndState2(String contractid);

	public int updateByPrimaryKeySelective(CreateBill record);

	public int updateByPrimaryKey(CreateBill record);
	
	public List<CreateBill> listAllUnCheckBill();
	
	public int updateState(Integer id);
	
	public int updateState2(Integer id);
	
	public int updateState3(String contractId,String state);
	
	public List<CreateBill> listAllCheckBill();
	
	public CreateBill selectById(Integer id);
}
