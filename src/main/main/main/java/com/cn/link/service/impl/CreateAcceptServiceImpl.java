package com.cn.link.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cn.link.mapper.CreateAcceptMapper;
import com.cn.link.model.CreateAccept;
import com.cn.link.model.CreateBill;
import com.cn.link.service.CreateAcceptService;

@Service
public class CreateAcceptServiceImpl implements CreateAcceptService {

	@Autowired
	private CreateAcceptMapper createAcceptMapper;
	
	@Override
	public List<CreateAccept> listAllAccept() {
		// TODO Auto-generated method stub
		return createAcceptMapper.listAllAccept();
	}

	/*@Override
	public CreateBill selectByPrimaryKey(String contractid) {
		// TODO Auto-generated method stub
		return createAcceptMapper.selectByPrimaryKey(contractid);
	}*/

	@Override
	public int updateAcceptByKeySelective(CreateAccept record) {
		// TODO Auto-generated method stub
		return createAcceptMapper.updateAcceptByKeySelective(record);
	}

	@Override
	public int updateLock(int id, String contractid, double lockamount, double lockrate) {
		// TODO Auto-generated method stub
		return createAcceptMapper.updateLock(id, contractid, lockamount, lockrate);
	}

	@Override
	public int EditAcceptByKeySelective(CreateAccept record) {
		// TODO Auto-generated method stub
		return createAcceptMapper.editAcceptByKeySelective(record);
	}
	
	@Override
	public List<CreateAccept> listAllAcceptByDate(String paydate) {
		// TODO Auto-generated method stub
		return createAcceptMapper.listAllAcceptByDate(paydate);
	}

	@Override
	public CreateAccept getInfoFromBillAndAccept(String contractid) {
		return createAcceptMapper.getInfoFromBillAndAccept(contractid);
	}



	@Override
	public CreateBill selectByPrimaryKey(String contractid) {
		// TODO Auto-generated method stub
		return createAcceptMapper.selectByPrimaryKey(contractid);
	}

}
