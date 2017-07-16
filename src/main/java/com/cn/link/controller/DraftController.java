package com.cn.link.controller;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
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
import com.cn.link.model.Draft;
import com.cn.link.service.DraftService;

@Controller
public class DraftController {

	private Logger logger = Logger.getLogger(DraftController.class);

	@Autowired
	private DraftService draftService;

	@RequestMapping(value = "listAllDraftOrderByBank", method = RequestMethod.GET)
	public @ResponseBody List<Draft> listAllDraftOrderByBank() {
		logger.info(JSON.toJSONString(draftService.listAllDraftOrderByBank()));
		return draftService.listAllDraftOrderByBank();
	}

	@RequestMapping(value = "listDraftByDeptOrderByBank/{deptId}", method = RequestMethod.GET)
	public @ResponseBody List<Draft> listDraftByDeptOrderByBank(
			@PathVariable("deptId") String deptId) {
		// logger.info(JSON.toJSONString("deptId:" + deptId));
		logger.info(JSON.toJSONString(draftService
				.listDraftByDeptOrderByBank(deptId)));
		return draftService.listDraftByDeptOrderByBank(deptId);
	}

	@RequestMapping(value = "queryByContractId/{contractid}", method = RequestMethod.GET)
	public @ResponseBody Draft queryByContractId(
			@PathVariable("contractid") String contractid) {
		logger.info("queryByContractId："
				+ JSON.toJSONString(draftService.selectByPrimaryKey(contractid)));
		return draftService.selectByPrimaryKey(contractid);
	}

	@RequestMapping(value = "queryDraftById/{id}", method = RequestMethod.GET)
	public @ResponseBody Draft queryDraftById(@PathVariable("id") Integer id) {
		logger.info("queryDraftById："
				+ JSON.toJSONString(draftService.selectdraftByID(id)));
		return draftService.selectdraftByID(id);
	}

	@RequestMapping(value = "updateDraftByContractId", method = RequestMethod.POST)
	public @ResponseBody int updateDraftByContractId(@RequestBody Draft draft) {
		System.out.println("====updateDraftByContractId===>");
		logger.info(JSON.toJSONString(draft));
		return draftService.updateByPrimaryKeySelective(draft);
	}

	@RequestMapping(value = "addDraft", method = RequestMethod.POST)
	public @ResponseBody int addDraft(@RequestBody Draft draft) {
		System.out.println("====addDraft===>");
		logger.info("addDraft: " + JSON.toJSONString(draft));
		String contractid = draft.getContractid();
		logger.info("contractid: " + contractid);
		draftService.updateAcceptState(contractid);
		return draftService.insertSelective(draft);
	}

	@RequestMapping(value = "getInfoFromDraftAndBill/{contractid}", method = RequestMethod.GET)
	public @ResponseBody Draft getInfoFromDraftAndBill(
			@PathVariable("contractid") String contractid) {
		logger.info(JSON.toJSONString(draftService
				.getInfoFromDraftAndBill(contractid)));
		return draftService.getInfoFromDraftAndBill(contractid);
	}

	@RequestMapping(value = "getMaxBusinessCnt", method = RequestMethod.GET)
	public @ResponseBody Integer getMaxBusinessCnt() {
		logger.info(JSON.toJSONString("getMaxBusinessCnt: "
				+ draftService.getMaxBusinessCnt()));
		return draftService.getMaxBusinessCnt();
	}

	@RequestMapping(value = "getMaxFinancialCnt", method = RequestMethod.GET)
	public @ResponseBody Integer getMaxFinancialCnt() {
		logger.info(JSON.toJSONString("getMaxFinancialCnt: "
				+ draftService.getMaxFinancialCnt()));
		return draftService.getMaxFinancialCnt();
	}
	
	@RequestMapping(value = "deleteDraftById", method = RequestMethod.POST)
	public @ResponseBody void deleteDraftById(
			@RequestBody int[] ids) {
		logger.info("删除:"+ Arrays.toString(ids));
		for(int i = 0; i < ids.length; i++){
			draftService.deleteById(ids[i]);
		}
		
	}

	@RequestMapping(value = "selectDraftNotice", method = RequestMethod.GET)
	public @ResponseBody List<Draft> selectDraftNotice() {
		Date date = new Date();
		SimpleDateFormat sf = new SimpleDateFormat("yyyy/MM/dd");
		String nowDate = sf.format(date);
		Calendar calendar = Calendar.getInstance();
		try {
			calendar.setTime(sf.parse(nowDate));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		List<Draft> drafts0=new ArrayList<Draft>();
		String today = sf.format(calendar.getTime());
		drafts0=draftService.selectDraftNotice(today);
		
		List<Draft> drafts1=new ArrayList<Draft>();
		calendar.add(Calendar.DAY_OF_YEAR, +1);
		String nextDate = sf.format(calendar.getTime());
		drafts1=draftService.selectDraftNotice(nextDate);
		
//		List<Draft> drafts2=new ArrayList<Draft>();
//		calendar.add(Calendar.DAY_OF_YEAR, +1);
//		String thirdDate = sf.format(calendar.getTime());
//		drafts2=draftService.selectDraftNotice(thirdDate);
//		drafts2.addAll(drafts0);
		drafts1.addAll(drafts0);
//		logger.info(JSON.toJSONString(draftService.selectDraftNotice(nextDate)));
		return drafts1;
	}
	
	@RequestMapping(value="exportDraftA/{bank}/{certificate}/{currency}/{draftAmount}/{loanDate}/{refundDate}/{contractId}",method=RequestMethod.GET)
	public @ResponseBody List<Draft> exportDraftA(HttpServletRequest request, HttpServletResponse response1,
			@PathVariable("bank")String bank,
			@PathVariable("certificate")String certificate,@PathVariable("currency")String currency,
			@PathVariable("draftAmount")String draftAmount,@PathVariable("loanDate")String loanDate,
			@PathVariable("refundDate")String refundDate,@PathVariable("contractId")String contractId)
					throws UnsupportedEncodingException{
		bank = new String(bank.getBytes("iso8859-1"),"UTF-8");
//		dept = new String(dept.getBytes("iso8859-1"),"UTF-8");
		currency = new String(currency.getBytes("iso8859-1"),"UTF-8");
//		goods = new String(goods.getBytes("iso8859-1"),"UTF-8");
		contractId = new String(contractId.getBytes("iso8859-1"),"UTF-8");
		loanDate = new String(loanDate.getBytes("iso8859-1"),"UTF-8");
		String[] dateArr=loanDate.split("-");
		loanDate=dateArr[0];
		for(int i=1;i<dateArr.length;i++){
			loanDate=loanDate+"/"+dateArr[i];
		}
//		System.out.println("loanDate:" + loanDate);
		refundDate = new String(refundDate.getBytes("iso8859-1"),"UTF-8");
		String[] dateArr1=refundDate.split("-");
		refundDate=dateArr1[0];
		for(int i=1;i<dateArr1.length;i++){
			refundDate=refundDate+"/"+dateArr1[i];
		}
//		System.out.println("refundDate:" + refundDate);
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
		logger.info("===>bank:"+bank+";certificate:"+certificate+";currency:"+currency+";draftAmount:"+draftAmount
				+";loanDate:"+loanDate+";refundDate:"+refundDate+";contractId:"+contractId);
		List<Draft> drafts = draftService.exportDraftA(bank, certificate, currency, draftAmount, loanDate, refundDate, contractId);
		logger.info("======>exportDraftA:" + JSON.toJSONString(drafts));
		
		System.out.println("####DrafeResponse:" + response1);
		ExportExcel<Draft> ee=new ExportExcel<Draft>();
		String[] headers={"合同号","开证银行","凭证号","币种","押汇金额","押汇利率","期限","折人民币","合同号",
					"还款日","锁汇金额","锁汇汇率","业务部申请原因","财务部申请原因","Accept","Bill","财务部计数",
					"业务部计数","部门","部门编号","编号","序号"};
		String fileName="所有押汇信息";
		ee.exportExcel(headers, drafts, fileName, response1);
		return drafts;
	}
	@RequestMapping(value="exportDraftY/{bank}/{certificate}/{currency}/{draftAmount}/{loanDate}/{refundDate}/{contractId}/{deptId}",method=RequestMethod.GET)
	public @ResponseBody List<Draft> exportDraftY(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("bank")String bank,
			@PathVariable("certificate")String certificate,@PathVariable("currency")String currency,
			@PathVariable("draftAmount")String draftAmount,@PathVariable("loanDate")String loanDate,
			@PathVariable("refundDate")String refundDate,@PathVariable("contractId")String contractId,
			@PathVariable("deptId")String deptId) throws UnsupportedEncodingException{
		bank = new String(bank.getBytes("iso8859-1"),"UTF-8");
		deptId = new String(deptId.getBytes("iso8859-1"),"UTF-8");
		currency = new String(currency.getBytes("iso8859-1"),"UTF-8");
		contractId = new String(contractId.getBytes("iso8859-1"),"UTF-8");
		loanDate = new String(loanDate.getBytes("iso8859-1"),"UTF-8");
		String[] dateArr=loanDate.split("-");
		loanDate=dateArr[0];
		for(int i=1;i<dateArr.length;i++){
			loanDate=loanDate+"/"+dateArr[i];
		}
		refundDate = new String(refundDate.getBytes("iso8859-1"),"UTF-8");
		String[] dateArr1=refundDate.split("-");
		refundDate=dateArr1[0];
		for(int i=1;i<dateArr1.length;i++){
			refundDate=refundDate+"/"+dateArr1[i];
		}
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
		logger.info("===>bank:"+bank+";certificate:"+certificate+";currency:"+currency+";draftAmount:"+draftAmount
				+";loanDate:"+loanDate+";refundDate:"+refundDate+";contractId:"+contractId+";deptId:"+deptId);
		List<Draft> drafts = draftService.exportDraftY(bank, certificate, currency, draftAmount, loanDate, refundDate, contractId, deptId);
		logger.info("======>exportDraftY:" + JSON.toJSONString(drafts));
		
		System.out.println("####DrafeResponse:" + response);
		ExportExcel<Draft> ee=new ExportExcel<Draft>();
		String[] headers={"合同号","开证银行","凭证号","币种","押汇金额","押汇利率","期限","折人民币","合同号",
				"还款日","锁汇金额","锁汇汇率","业务部申请原因","财务部申请原因","Accept","Bill","财务部计数",
				"业务部计数","部门","部门编号","编号","序号"};
		String fileName="本部押汇信息";
		ee.exportExcel(headers, drafts, fileName, response);
		return drafts;
	}
}
