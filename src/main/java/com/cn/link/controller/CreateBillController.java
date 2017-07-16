package com.cn.link.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.cn.link.basic.ExportExcel;
import com.cn.link.model.CreateBill;
import com.cn.link.service.CreateBillService;

@Controller
public class CreateBillController {
	private static Logger logger = Logger.getLogger(CreateBillController.class);

	@Autowired
	private CreateBillService createBillService;

	@RequestMapping(value = "selectBillById/{id}", method = RequestMethod.GET)
	public @ResponseBody CreateBill selectBillById(
			@PathVariable("id") Integer id) {
		logger.info(JSON.toJSONString(createBillService.selectById(id)));
		return createBillService.selectById(id);
	}
	
	@RequestMapping(value = "deleteById/{id}", method = RequestMethod.GET)
	public @ResponseBody void deleteById(
			@PathVariable("id") Integer id) {
		logger.info(JSON.toJSONString("删除:"+id));
		createBillService.deleteById(id);
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
	
	//查询所有已经审批开立信息
	@RequestMapping(value="listAllCheckBill",method=RequestMethod.GET)
	public @ResponseBody List<CreateBill> listAllCheckBill(){
		logger.info("listAllCheckBill/" + JSON.toJSONString(createBillService.listAllCheckBill()));
		return createBillService.listAllCheckBill();
	}
	
	//根据部门查询已经审批开立信息
	@RequestMapping(value="listAllCheckBillByDeptId/{deptId}",method=RequestMethod.GET)
	public @ResponseBody List<CreateBill> listAllCheckBillByDeptId(@PathVariable("deptId") Integer deptId){
		logger.info("listAllCheckBillByDeptId/"+ deptId + JSON.toJSONString(createBillService.listAllCheckBillByDeptId(deptId)));
		return createBillService.listAllCheckBillByDeptId(deptId);
	}
	
	//查询所有未审批信息
	@RequestMapping(value="listAllUnCheckBill",method=RequestMethod.GET)
	public @ResponseBody List<CreateBill> listAllUnCheckBill(){
		List<CreateBill> bills = createBillService.listAllUnCheckBill();
		logger.info("listAllUnCheckBill" + JSON.toJSONString(bills));
		return bills;
	}
	
	//根据部门查询所有未审批信息
	@RequestMapping(value="listAllUnCheckBillByDeptId/{deptId}",method=RequestMethod.GET)
	public @ResponseBody List<CreateBill> listAllUnCheckBillByDeptId(@PathVariable("deptId") Integer deptId){
		List<CreateBill> bills = createBillService.listAllUnCheckBillByDeptId(deptId);
		logger.info("listAllUnCheckBillByDeptId/"+ deptId + JSON.toJSONString(bills));
		return bills;
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
	
	@RequestMapping(value="exportCheckBill/{bank}/{dept}/{currency}/{goods}/{contractId}/{crtDate}",method=RequestMethod.GET)
	public @ResponseBody List<CreateBill> exportCheckBill(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("bank")String bank,
			@PathVariable("dept")String dept,@PathVariable("currency")String currency,
			@PathVariable("goods")String goods,@PathVariable("contractId")String contractId,
			@PathVariable("crtDate")String crtDate) throws UnsupportedEncodingException{
		bank = new String(bank.getBytes("iso8859-1"),"UTF-8");
		dept = new String(dept.getBytes("iso8859-1"),"UTF-8");
		currency = new String(currency.getBytes("iso8859-1"),"UTF-8");
		goods = new String(goods.getBytes("iso8859-1"),"UTF-8");
		contractId = new String(contractId.getBytes("iso8859-1"),"UTF-8");
		crtDate = new String(crtDate.getBytes("iso8859-1"),"UTF-8");
//		System.out.println("crtDate:" + crtDate);
		
		String[] dateArr=crtDate.split("-");
		crtDate=dateArr[0];
		for(int i=1;i<dateArr.length;i++){
			crtDate=crtDate+"/"+dateArr[i];
		}
//		System.out.println("crtDate:" + crtDate);
		/*switch (currency) {
		case "CNY":
			currency="人民币"+"CNY";
			break;
		case "USD":
			currency="美元"+"USD";
			break;
		case "EUR":
			currency="欧元"+"EUR";
			break;
		case "JPY":
			currency="日元"+"JPY";
			break;
		case "CAD":
			currency="加拿大元"+"CAD";
			break;
		case "SGD":
			currency="新加坡元"+"SGD";
			break;
		default:
			break;
		}*/
		logger.info("===>bank:"+bank+";dept:"+dept+";currency:"+currency+";goods:"+goods+";contractId:"+contractId+";crtDate:"+crtDate);
		List<CreateBill> bills = createBillService.exportCheckBill(bank, dept, currency, goods, contractId, crtDate);
		logger.info("======>exportCheckBill:" + JSON.toJSONString(bills));
		
		System.out.println("####response:" + response);
		ExportExcel<CreateBill> ee=new ExportExcel<CreateBill>();
		//String[] headers={"合同号","银行","部门","商品类型","性质","代理客户","币种","开立金额","开立日期","期限","状态"};
		String[] headers={"开证银行","部门","商品","合同号","性质","代理客户","币种","开证金额","开证日期","开证期限","合同状态"};
		String fileName="信用证审批开立表";
		ee.exportExcel(headers, bills, fileName, response);
		return bills;
	}
	
	@RequestMapping(value="exportUnCheckBill/{bank}/{dept}/{currency}/{goods}/{contractId}/{crtDate}",method=RequestMethod.GET)
	public @ResponseBody List<CreateBill> exportUnCheckBill(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("bank")String bank,
			@PathVariable("dept")String dept,@PathVariable("currency")String currency,
			@PathVariable("goods")String goods,@PathVariable("contractId")String contractId,
			@PathVariable("crtDate")String crtDate) throws UnsupportedEncodingException{
		bank = new String(bank.getBytes("iso8859-1"),"UTF-8");
		dept = new String(dept.getBytes("iso8859-1"),"UTF-8");
		currency = new String(currency.getBytes("iso8859-1"),"UTF-8");
		goods = new String(goods.getBytes("iso8859-1"),"UTF-8");
		contractId = new String(contractId.getBytes("iso8859-1"),"UTF-8");
		crtDate = new String(crtDate.getBytes("iso8859-1"),"UTF-8");
//		System.out.println("crtDate:" + crtDate);
		
		String[] dateArr=crtDate.split("-");
		crtDate=dateArr[0];
		for(int i=1;i<dateArr.length;i++){
			crtDate=crtDate+"/"+dateArr[i];
		}
//		System.out.println("crtDate:" + crtDate);
		/*switch (currency) {
		case "CNY":
			currency="人民币"+"CNY";
			break;
		case "USD":
			currency="美元"+"USD";
			break;
		case "EUR":
			currency="欧元"+"EUR";
			break;
		case "JPY":
			currency="日元"+"JPY";
			break;
		case "CAD":
			currency="加拿大元"+"CAD";
			break;
		case "SGD":
			currency="新加坡元"+"SGD";
			break;
		default:
			break;
		}*/
		logger.info("===>bank:"+bank+";dept:"+dept+";currency:"+currency+";goods:"+goods+";contractId:"+contractId+";crtDate:"+crtDate);
		List<CreateBill> bills = createBillService.exportUnCheckBill(bank, dept, currency, goods, contractId, crtDate);
		logger.info("======>exportUnCheckBill:" + JSON.toJSONString(bills));
		
		System.out.println("####response:" + response);
		ExportExcel<CreateBill> ee=new ExportExcel<CreateBill>();
		//String[] headers={"合同号","银行","部门","商品类型","性质","代理客户","币种","开立金额","开立日期","期限","状态"};
		String[] headers={"开证银行","部门","商品","合同号","性质","代理客户","币种","开证金额","开证日期","开证期限","合同状态"};
		String fileName="信用证未审批开立表";
		ee.exportExcel(headers, bills, fileName, response);
		return bills;
	}
	
	@RequestMapping(value="exportCheckBillByDeptId/{bank}/{dept}/{currency}/{goods}/{contractId}/{crtDate}/{deptId}",method=RequestMethod.GET)
	public @ResponseBody List<CreateBill> exportCheckBillByDeptId(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("bank")String bank,
			@PathVariable("dept")String dept,@PathVariable("currency")String currency,
			@PathVariable("goods")String goods,@PathVariable("contractId")String contractId,
			@PathVariable("crtDate")String crtDate,@PathVariable("deptId") Integer deptId) 
					throws UnsupportedEncodingException{
		System.out.println("----------------->exportCheckBillByDeptId:"+deptId);
		bank = new String(bank.getBytes("iso8859-1"),"UTF-8");
		dept = new String(dept.getBytes("iso8859-1"),"UTF-8");
		currency = new String(currency.getBytes("iso8859-1"),"UTF-8");
		goods = new String(goods.getBytes("iso8859-1"),"UTF-8");
		contractId = new String(contractId.getBytes("iso8859-1"),"UTF-8");
		crtDate = new String(crtDate.getBytes("iso8859-1"),"UTF-8");
//		System.out.println("crtDate:" + crtDate);
		
		String[] dateArr=crtDate.split("-");
		crtDate=dateArr[0];
		for(int i=1;i<dateArr.length;i++){
			crtDate=crtDate+"/"+dateArr[i];
		}
//		System.out.println("crtDate:" + crtDate);
		/*switch (currency) {
		case "CNY":
			currency="人民币"+"CNY";
			break;
		case "USD":
			currency="美元"+"USD";
			break;
		case "EUR":
			currency="欧元"+"EUR";
			break;
		case "JPY":
			currency="日元"+"JPY";
			break;
		case "CAD":
			currency="加拿大元"+"CAD";
			break;
		case "SGD":
			currency="新加坡元"+"SGD";
			break;
		default:
			break;
		}*/
		logger.info("===>bank:"+bank+";dept:"+dept+";currency:"+currency+";goods:"+goods+";contractId:"+contractId+";crtDate:"+crtDate+";deptId:"+deptId);
		List<CreateBill> bills = createBillService.exportCheckBillByDeptId(bank, dept, currency, goods, contractId, crtDate,deptId);
		logger.info("======>exportCheckBillByDeptId:" + JSON.toJSONString(bills));
		for(CreateBill bill : bills){
			logger.info(bill.toString());
		}
		System.out.println("####response:" + response);
		ExportExcel<CreateBill> ee=new ExportExcel<CreateBill>();
		//String[] headers={"合同号","银行","部门","商品类型","性质","代理客户","币种","开立金额","开立日期","期限","状态"};
		String[] headers={"开证银行","部门","商品","合同号","性质","代理客户","币种","开证金额","开证日期","开证期限","合同状态"};
		String fileName="本部信用证审批开立表";
		ee.exportExcel(headers, bills, fileName, response);
		return bills;
	}
	
	@RequestMapping(value="exportUnCheckBillByDeptId/{bank}/{dept}/{currency}/{goods}/{contractId}/{crtDate}/{deptId}",method=RequestMethod.GET)
	public @ResponseBody List<CreateBill> exportUnCheckBillByDeptId(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("bank")String bank,
			@PathVariable("dept")String dept,@PathVariable("currency")String currency,
			@PathVariable("goods")String goods,@PathVariable("contractId")String contractId,
			@PathVariable("crtDate")String crtDate,@PathVariable("deptId") Integer deptId) 
					throws UnsupportedEncodingException{
		bank = new String(bank.getBytes("iso8859-1"),"UTF-8");
		dept = new String(dept.getBytes("iso8859-1"),"UTF-8");
		currency = new String(currency.getBytes("iso8859-1"),"UTF-8");
		goods = new String(goods.getBytes("iso8859-1"),"UTF-8");
		contractId = new String(contractId.getBytes("iso8859-1"),"UTF-8");
		crtDate = new String(crtDate.getBytes("iso8859-1"),"UTF-8");
//		System.out.println("crtDate:" + crtDate);
		
		String[] dateArr=crtDate.split("-");
		crtDate=dateArr[0];
		for(int i=1;i<dateArr.length;i++){
			crtDate=crtDate+"/"+dateArr[i];
		}
//		System.out.println("crtDate:" + crtDate);
		/*switch (currency) {
		case "CNY":
			currency="人民币"+"CNY";
			break;
		case "USD":
			currency="美元"+"USD";
			break;
		case "EUR":
			currency="欧元"+"EUR";
			break;
		case "JPY":
			currency="日元"+"JPY";
			break;
		case "CAD":
			currency="加拿大元"+"CAD";
			break;
		case "SGD":
			currency="新加坡元"+"SGD";
			break;
		default:
			break;
		}*/
		logger.info("===>bank:"+bank+";dept:"+dept+";currency:"+currency+";goods:"+goods+";contractId:"+contractId+";crtDate:"+crtDate+";deptId:"+deptId);
		List<CreateBill> bills = createBillService.exportUnCheckBillByDeptId(bank, dept, currency, goods, contractId, crtDate,deptId);
		logger.info("======>exportUnCheckBillByDeptId:" + JSON.toJSONString(bills));
		
		System.out.println("####response:" + response);
		ExportExcel<CreateBill> ee=new ExportExcel<CreateBill>();
		//String[] headers={"合同号","银行","部门","商品类型","性质","代理客户","币种","开立金额","开立日期","期限","状态"};
		String[] headers={"开证银行","部门","商品","合同号","性质","代理客户","币种","开证金额","开证日期","开证期限","合同状态"};
		String fileName="本部信用证未审批开立表";
		ee.exportExcel(headers, bills, fileName, response);
		return bills;
	}
}
