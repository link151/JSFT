package com.cn.link.service;

import java.util.List;

import com.cn.link.model.Draft;

public interface DraftService {

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
	
	public List<Draft> exportDraftA(String bank,
			String certificate,String currency,
			String draftAmount,String loanDate,
			String refundDate,String contractId);
	
	public List<Draft> exportDraftY(String bank,
			String certificate,String currency,
			String draftAmount,String loanDate,
			String refundDate,String contractId,
			String deptId);
}
