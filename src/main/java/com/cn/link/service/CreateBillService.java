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
	
	public void deleteById(Integer id);
	
	public List<CreateBill> listAllUnCheckBillByDeptId(Integer deptId);
	
	public List<CreateBill> listAllCheckBillByDeptId(Integer deptId);
	
	public List<CreateBill> exportCheckBill(String bank,String dept,String currency,String goods,String contractId,String crtDate);
	
	public List<CreateBill> exportUnCheckBill(String bank,String dept,String currency,String goods,String contractId,String crtDate);
	
	public List<CreateBill> exportCheckBillByDeptId(String bank,String dept,String currency,String goods,String contractId,String crtDate,Integer deptId);
	
	public List<CreateBill> exportUnCheckBillByDeptId(String bank,String dept,String currency,String goods,String contractId,String crtDate,Integer deptId);

}
