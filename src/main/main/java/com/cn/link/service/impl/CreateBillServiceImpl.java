package com.cn.link.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cn.link.mapper.CreateBillMapper;
import com.cn.link.model.CreateBill;
import com.cn.link.service.CreateBillService;

@Service
public class CreateBillServiceImpl implements CreateBillService {

	@Autowired
	private CreateBillMapper createBillMapper;

	@Override
	public int deleteByPrimaryKey(String contractid) {
		return createBillMapper.deleteByPrimaryKey(contractid);
	}

	@Override
	public int insert(CreateBill record) {
		return createBillMapper.insert(record);
	}

	@Override
	public int insertSelective(CreateBill record) {
		return createBillMapper.insertSelective(record);
	}

	@Override
	public CreateBill selectByPrimaryKey(String contractid) {
		return createBillMapper.selectByPrimaryKey(contractid);
	}

	@Override
	public int updateByPrimaryKeySelective(CreateBill record) {
		return createBillMapper.updateByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKey(CreateBill record) {
		return createBillMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<CreateBill> listAllUnCheckBill() {
		return createBillMapper.listAllUnCheckBill();
	}

	@Override
	public int updateState(Integer id) {
		return createBillMapper.updateState(id);
	}

	@Override
	public int updateState2(Integer id) {
		return createBillMapper.updateState2(id);
	}

	@Override
	public int updateState3(String contractId, String state) {
		return createBillMapper.updateState3(contractId, state);
	}

	@Override
	public List<CreateBill> listAllCheckBill() {
		return createBillMapper.listAllCheckBill();
	}

	@Override
	public CreateBill queryByContractIdAndState(String contractid) {
		return createBillMapper.queryByContractIdAndState(contractid);
	}

	@Override
	public CreateBill queryByContractIdAndState2(String contractid) {
		return createBillMapper.queryByContractIdAndState2(contractid);
	}

	@Override
	public CreateBill selectById(Integer id) {
		return createBillMapper.selectById(id);
	}

}
