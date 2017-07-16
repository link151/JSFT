package com.cn.link.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.cn.link.service.BankService;

@Controller
public class BankController {

	private static Logger logger = Logger.getLogger(BankController.class);

	@Autowired
	private BankService bankService;

	@RequestMapping(value = "queryBank", method = RequestMethod.GET)
	public @ResponseBody List<String> queryBank() {
		logger.info("获取银行：" + JSON.toJSONString(bankService.queryBank()));
		return bankService.queryBank();
	}
}
