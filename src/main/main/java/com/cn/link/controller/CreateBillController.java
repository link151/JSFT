package com.cn.link.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.cn.link.model.CreateBill;
import com.cn.link.service.CreateBillService;

@Controller
public class CreateBillController {
	private static Logger logger = Logger.getLogger(UserController.class);

	@Autowired
	private CreateBillService createBillService;

	@RequestMapping(value = "selectBillById/{id}", method = RequestMethod.GET)
	public @ResponseBody CreateBill selectBillById(
			@PathVariable("id") Integer id) {
		logger.info(JSON.toJSONString(createBillService.selectById(id)));
		return createBillService.selectById(id);
	}
	
	@RequestMapping(value = "selectByContractId/{contractId}", method = RequestMethod.GET)
	public @ResponseBody CreateBill selectByContractId(
		@PathVariable("contractId") String contractId) {
		logger.info(JSON.toJSONString(createBillService
				.selectByPrimaryKey(contractId)));
		return createBillService.selectByPrimaryKey(contractId);
	}
	
	@RequestMapping(value="addBill" , method=RequestMethod.POST)
	public @ResponseBody int addBill(@RequestBody CreateBill bill){
		logger.info(JSON.toJSONString(bill));
	    return createBillService.insertSelective(bill);
	}
	
	@RequestMapping(value="listAllUnCheckBill",method=RequestMethod.GET)
	public @ResponseBody List<CreateBill> listAllUnCheckBill(){
		List<CreateBill> bills = createBillService.listAllUnCheckBill();
		logger.info(JSON.toJSONString(bills));
		return bills;
	}
	
	@RequestMapping(value = "updateBill", method = RequestMethod.POST)
	public @ResponseBody int updateBill(@RequestBody CreateBill bill) {
		logger.info(JSON.toJSONString(bill));
		System.out.println("更新bill");
		return createBillService.updateByPrimaryKeySelective(bill);
	}
	
	//审批
		@RequestMapping(value="updateBillStatePassById/{id}",method=RequestMethod.POST)
		public @ResponseBody int updateBillStatePassById(
			@PathVariable("id") Integer id){
			logger.info(JSON.toJSONString(id));
			return createBillService.updateState(id);
		}

	//驳回
	@RequestMapping(value="updateBillStateRejectById/{id}",method=RequestMethod.POST)
	public @ResponseBody int updateBillStateRejectById(
		@PathVariable("id") Integer id){
		logger.info(JSON.toJSONString(id));
		return createBillService.updateState2(id);
	}
	
	@RequestMapping(value="updateState3/{contractId}",method=RequestMethod.POST)
	public @ResponseBody int updateState3(
			@PathVariable("contractId") String contractId){
		logger.info(JSON.toJSONString(contractId));
		return createBillService.updateState3(contractId,"weishenhe");
	}
	
	@RequestMapping(value="listAllCheckBill",method=RequestMethod.GET)
	public @ResponseBody List<CreateBill> listAllCheckBill(){
		logger.info(JSON.toJSONString(createBillService.listAllCheckBill()));
		return createBillService.listAllCheckBill();
	}
	
	//未审批
	@RequestMapping(value="queryByContractIdAndState/{contractId}",method=RequestMethod.GET)
	public @ResponseBody CreateBill queryByContractIdAndState(
			@PathVariable("contractId") String contractId){
		logger.info(JSON.toJSONString(createBillService.queryByContractIdAndState(contractId)));
		return createBillService.queryByContractIdAndState(contractId);
	}
	
	//审批
	@RequestMapping(value="queryByContractIdAndState2/{contractId}",method=RequestMethod.GET)
	public @ResponseBody CreateBill queryByContractIdAndState2(
			@PathVariable("contractId") String contractId){
		logger.info(JSON.toJSONString(createBillService.queryByContractIdAndState2(contractId)));
		return createBillService.queryByContractIdAndState2(contractId);
	}
	
}
