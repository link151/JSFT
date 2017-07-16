package com.cn.link.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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

	@RequestMapping(value = "selectDraftNotice", method = RequestMethod.GET)
	public @ResponseBody List<Draft> selectDraftNotice() {
		Date date = new Date();
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		String nowDate = sf.format(date);
		Calendar calendar = Calendar.getInstance();
		try {
			calendar.setTime(sf.parse(nowDate));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		calendar.add(Calendar.DAY_OF_YEAR, +2);
		String nextDate = sf.format(calendar.getTime());
		logger.info(JSON.toJSONString(draftService.selectDraftNotice(nextDate)));
		return draftService.selectDraftNotice(nextDate);
	}
}
