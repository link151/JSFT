package com.cn.link.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cn.link.mapper.DraftMapper;
import com.cn.link.model.Draft;
import com.cn.link.service.DraftService;

@Service
public class DraftServiceImpl implements DraftService{

	@Autowired
	private DraftMapper draftMapper;
	
	@Override
	public int deleteByPrimaryKey(String contractid) {
		return draftMapper.deleteByPrimaryKey(contractid);
	}

	@Override
	public int insert(Draft record) {
		return draftMapper.insert(record);
	}

	@Override
	public int insertSelective(Draft record) {
		return draftMapper.insertSelective(record);
	}

	@Override
	public Draft selectByPrimaryKey(String contractid) {
		return draftMapper.selectByPrimaryKey(contractid);
	}

	@Override
	public int updateByPrimaryKeySelective(Draft record) {
		return draftMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(Draft record) {
		return draftMapper.updateByPrimaryKey(record);
	}

	@Override
	public List<Draft> listAllDraftOrderByBank() {
		return draftMapper.listAllDraftOrderByBank();
	}

	@Override
	public Draft getInfoFromDraftAndBill(String contractid) {
		return draftMapper.getInfoFromDraftAndBill(contractid);
	}

	@Override
	public Integer getMaxBusinessCnt() {
		return draftMapper.getMaxBusinessCnt();
	}

	@Override
	public Integer getMaxFinancialCnt() {
		return draftMapper.getMaxFinancialCnt();
	}

	@Override
	public List<Draft> listDraftByDeptOrderByBank(String deptId) {
		return draftMapper.listDraftByDeptOrderByBank(deptId);
	}

	@Override
	public List<Draft> selectDraftNotice(String refunddate) {
		return draftMapper.selectDraftNotice(refunddate);
	}

	@Override
	public Draft selectdraftByID(Integer id) {
		return draftMapper.selectdraftByID(id);
	}

}
