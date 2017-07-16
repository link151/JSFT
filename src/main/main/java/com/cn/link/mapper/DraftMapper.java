package com.cn.link.mapper;

import java.util.List;

import com.cn.link.model.Draft;

public interface DraftMapper {
	public int deleteByPrimaryKey(String contractid);

	public int insert(Draft record);

	public int insertSelective(Draft record);

	public Draft selectByPrimaryKey(String contractid);

	public int updateByPrimaryKeySelective(Draft record);

	public int updateByPrimaryKey(Draft record);
    
	public List<Draft> listAllDraftOrderByBank();
	
	public List<Draft> listDraftByDeptOrderByBank(String deptId);
	
	public Draft getInfoFromDraftAndBill(String contractid);
	
	public Integer getMaxBusinessCnt();
	
	public Integer getMaxFinancialCnt();
	
	public List<Draft> selectDraftNotice(String refunddate);
	
	public Draft selectdraftByID(Integer id);
}