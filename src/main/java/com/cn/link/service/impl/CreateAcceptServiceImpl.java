package com.cn.link.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cn.link.mapper.CreateAcceptMapper;
import com.cn.link.model.CreateAccept;
import com.cn.link.model.CreateBill;
import com.cn.link.service.CreateAcceptService;
import com.cn.link.util.*;

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
	public int updateLock(int id, String contractid, String lockamount, String lockrate) {
		// TODO Auto-generated method stub
		return createAcceptMapper.updateLock(id, contractid, lockamount, lockrate);
	}

	@Override
	public int EditAcceptByKeySelective(CreateAccept record) {
		// TODO Auto-generated method stub
		return createAcceptMapper.editAcceptByKeySelective(record);
	}
	
	@Override
	public List<CreateAccept> listAllAcceptByDate(String paydate1, String paydate2) {
		// TODO Auto-generated method stub
		return createAcceptMapper.listAllAcceptByDate(paydate1, paydate2);
	}

	@Override
	public List<CreateAccept> getInfoFromBillAndAccept(String contractid) {
		return createAcceptMapper.getInfoFromBillAndAccept(contractid);
	}



	@Override
	public CreateBill selectByPrimaryKey(String contractid) {
		// TODO Auto-generated method stub
		return createAcceptMapper.selectByPrimaryKey(contractid);
	}

	@Override
	public int updateState(String contractid) {
		// TODO Auto-generated method stub
		return createAcceptMapper.updateAcceptState(contractid);
	}

	@Override
	public boolean AcceptExportExcel(String contractid, String bank, String currency, String paydate,
			String registerdate, String payamount, HttpServletResponse response) {
		// TODO Auto-generated method stub
		try{
			if(contractid.equals("")) contractid = "default";
			if(bank.equals("")) bank = "default";
			if(currency.equals("")) currency = "default";
			if(paydate.equals("")) paydate = "default";
			if(registerdate.equals("")) registerdate = "default";
			if(payamount.equals("")) payamount = "default";
			
			List<CreateAccept> list = createAcceptMapper.selectByFilter(contractid, bank, currency, paydate, registerdate, payamount);
			String[] fields ={"合同号", "银行", "币种", "付款金额", "天数", "星期", "付款日期", "登记日期", "锁汇金额", "锁汇汇率", "是否押汇"};
			AcceptExportExcel export = new AcceptExportExcel();
			HSSFWorkbook wb = export.generateExcel();
			wb = export.generateSheet(wb, "承兑表", fields, list);
			export.export(wb, response);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
		
	}

	@Override
	public void AcceptDelete(int[] ids) {
		// TODO Auto-generated method stub
		for(int i = 0; i < ids.length; i++){
			createAcceptMapper.acceptDelete(ids[i]);
		}
	}

}
