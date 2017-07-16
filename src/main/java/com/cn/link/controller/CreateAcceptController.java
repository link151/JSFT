package com.cn.link.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.servlet.ServletOutputStream;
import javax.servlet.WriteListener;
import javax.servlet.http.Cookie;
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
import com.alibaba.fastjson.JSONObject;
import com.cn.link.model.CreateAccept;
import com.cn.link.model.CreateBill;
import com.cn.link.service.CreateAcceptService;

@Controller
public class CreateAcceptController {
	private static Logger logger = Logger.getLogger(UserController.class);
	
	@Autowired
	private CreateAcceptService createAcceptService;
	
	@RequestMapping(value="listAllAccept", method=RequestMethod.GET)
	public @ResponseBody List<CreateAccept> listAllAccept(){
		logger.info(JSON.toJSONString(createAcceptService.listAllAccept()));
		return createAcceptService.listAllAccept();
	}
	
	/*@RequestMapping(value="selectAcceptByKey/{contractId}", method=RequestMethod.GET)
	public @ResponseBody CreateAccept SelectAcceptByKey(@PathVariable("contractId") String contractId){
		logger.info(JSON.toJSONString(createAcceptService
				.selectByPrimaryKey(contractId)));
		return createAcceptService.selectByPrimaryKey(contractId);
	}*/
	@RequestMapping(value="selectAcceptByKey/{contractId}", method=RequestMethod.GET)
	public @ResponseBody CreateBill SelectAcceptByKey(@PathVariable("contractId") String contractId){
		logger.info(JSON.toJSONString(createAcceptService
				.selectByPrimaryKey(contractId)));
		return createAcceptService.selectByPrimaryKey(contractId);
	}
	
	@RequestMapping(value="updateAccept", method=RequestMethod.POST)
	public @ResponseBody int updateAccept(@RequestBody CreateAccept accept){
		logger.info(JSON.toJSONString(accept));
		return createAcceptService.updateAcceptByKeySelective(accept);
	}
	
	@RequestMapping(value="editAccept", method=RequestMethod.POST)
	public @ResponseBody int editAccept(@RequestBody JSONObject json){
		CreateAccept accept = new CreateAccept();
		accept.setId(json.getInteger("id"));
		accept.setContractid(json.getString("contractid"));
		accept.setBank(json.getString("bank"));
		accept.setCurrency(json.getString("currency"));
		accept.setDays(json.getInteger("days"));
		accept.setLockamount(json.getString("lockamount"));
		accept.setLockrate(json.getString("lockrate"));
		accept.setPayamount(json.getString("payamount"));
		accept.setPaydate(json.getString("paydate"));
		accept.setRegisterdate(json.getString("registerdate"));
		accept.setWeek(json.getString("week"));
		logger.info(JSON.toJSONString(accept));
		return createAcceptService.EditAcceptByKeySelective(accept);
	}
	
	@RequestMapping(value="updateLock/{id}/{contractId}/{lockAmount}/{lockRate}", method=RequestMethod.POST)
	public @ResponseBody int updateLock(@PathVariable("id") int id, @PathVariable("contractId") String contractId,
			@PathVariable("lockAmount") String lockAmount, @PathVariable("lockRate") String lockRate)
					throws UnsupportedEncodingException{
		JSONObject json = new JSONObject();
		contractId = new String(contractId.getBytes("iso8859-1"),"UTF-8");
		lockAmount = new String(lockAmount.getBytes("iso8859-1"), "UTF-8");
		lockRate = new String(lockRate.getBytes("iso8859-1"), "UTF-8");
		json.put("id", id);
		json.put("contractId", contractId);
		json.put("lockAmount", lockAmount);
		json.put("lockRate", lockRate);
		logger.info(json);
		return createAcceptService.updateLock(id, contractId, lockAmount, lockRate);
	}
	
	@RequestMapping(value="listAllAcceptByDate", method=RequestMethod.GET)
	public @ResponseBody List<CreateAccept> listAllAcceptByDate(){
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
		String today = sf.format(calendar.getTime());
		calendar.add(Calendar.DAY_OF_YEAR, +1);
		String nextDate = sf.format(calendar.getTime());
		logger.info(JSON.toJSONString(createAcceptService.listAllAcceptByDate(today, nextDate)));
		return createAcceptService.listAllAcceptByDate(today, nextDate);
	}
	
	@RequestMapping(value="getInfoFromBillAndAccept/{contractId}",method=RequestMethod.GET)
	public @ResponseBody List<CreateAccept> getInfoFromBillAndAccept(
			@PathVariable("contractId") String contractId){
		logger.info("==>getInfoFromBillAndAccept:" + JSON.toJSONString(createAcceptService.getInfoFromBillAndAccept(contractId)));
		return createAcceptService.getInfoFromBillAndAccept(contractId);
	}
	
	@RequestMapping(value="AcceptExportExcel", method=RequestMethod.POST)
	public @ResponseBody void AcceptExportExcel(@RequestBody JSONObject json, HttpServletResponse response){
		logger.info(JSON.toJSON(json));
		String contractid = json.getString("contractid");
		String bank = json.getString("bank");
		String currency = json.getString("currency");
		String paydate = json.getString("paydate");
		String registerdate = json.getString("registerdate");
		String payamount = json.getString("payamount");
		createAcceptService.AcceptExportExcel(contractid, bank, currency, paydate, registerdate, payamount,response);
	}
	
	@RequestMapping(value="AcceptDelete", method=RequestMethod.POST)
	public @ResponseBody void AcceptDelete(@RequestBody int[] ids,  HttpServletResponse response){
		logger.info(Arrays.toString(ids));
		createAcceptService.AcceptDelete(ids);
	}
}
