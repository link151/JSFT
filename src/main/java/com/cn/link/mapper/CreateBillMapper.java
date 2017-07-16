package com.cn.link.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cn.link.model.CreateBill;

public interface CreateBillMapper {
	public int deleteByPrimaryKey(String contractid);

	public int insert(CreateBill record);

	public int insertSelective(CreateBill record);

	public CreateBill selectByPrimaryKey(String contractid);
	
	public CreateBill queryByContractIdAndState(String contractid);
	
	public CreateBill queryByContractIdAndState2(String contractid);

	public int updateByPrimaryKeySelective(CreateBill record);

	public int updateByPrimaryKey(CreateBill record);
	
	public int updateState(Integer id);
	
	public int updateState2(Integer id);
	
	public int updateState3(String contractId,String state);
	
	public List<CreateBill> listAllCheckBill();
	
	public List<CreateBill> listAllUnCheckBill();
	
	public List<CreateBill> listAllUnCheckBillByDeptId(Integer deptId);
	
	public List<CreateBill> listAllCheckBillByDeptId(Integer deptId);
	
	public CreateBill selectById(Integer id);
	
	public void deleteById(Integer id);
	
	public List<CreateBill> exportCheckBill(@Param("bank")String bank,
			@Param("dept")String dept,@Param("currency")String currency,
			@Param("goods")String goods,@Param("contractId")String contractId,
			@Param("crtDate")String crtDate);
	
	public List<CreateBill> exportUnCheckBill(@Param("bank")String bank,
			@Param("dept")String dept,@Param("currency")String currency,
			@Param("goods")String goods,@Param("contractId")String contractId,
			@Param("crtDate")String crtDate);
	
	public List<CreateBill> exportCheckBillByDeptId(@Param("bank")String bank,
			@Param("dept")String dept,@Param("currency")String currency,
			@Param("goods")String goods,@Param("contractId")String contractId,
			@Param("crtDate")String crtDate,@Param("deptId")Integer deptId);
	
	public List<CreateBill> exportUnCheckBillByDeptId(@Param("bank")String bank,
			@Param("dept")String dept,@Param("currency")String currency,
			@Param("goods")String goods,@Param("contractId")String contractId,
			@Param("crtDate")String crtDate,@Param("deptId")Integer deptId);
}