package com.cn.link.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cn.link.model.Draft;

public interface DraftMapper {
	public int deleteByPrimaryKey(String contractid);

	public int insert(Draft record);

	public int insertSelective(Draft record);

	public Draft selectByPrimaryKey(String contractid);

	public int updateByPrimaryKeySelective(Draft record);

	public int updateByPrimaryKey(Draft record);
	
	public int updateAcceptState(String contractid);
    
	public List<Draft> listAllDraftOrderByBank();
	
	public List<Draft> listDraftByDeptOrderByBank(String deptId);
	
	public Draft getInfoFromDraftAndBill(String contractid);
	
	public Integer getMaxBusinessCnt();
	
	public Integer getMaxFinancialCnt();
	
	public List<Draft> selectDraftNotice(String refunddate);
	
	public Draft selectdraftByID(Integer id);
	
	public void deleteById(Integer id);
	
	public List<Draft> exportDraftA(@Param("bank")String bank,
			@Param("certificate")String certificate,@Param("currency")String currency,
			@Param("draftAmount")String draftAmount,@Param("loanDate")String loanDate,
			@Param("refundDate")String refundDate,@Param("contractId")String contractId);
	
	public List<Draft> exportDraftY(@Param("bank")String bank,
			@Param("certificate")String certificate,@Param("currency")String currency,
			@Param("draftAmount")String draftAmount,@Param("loanDate")String loanDate,
			@Param("refundDate")String refundDate,@Param("contractId")String contractId,
			@Param("deptId")String deptId);
}