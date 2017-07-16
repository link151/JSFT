package com.cn.link.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cn.link.mapper.BankMapper;
import com.cn.link.service.BankService;

@Service
public class BankServiceImpl implements BankService {

	@Autowired
	private BankMapper bankMapper;

	@Override
	public List<String> queryBank() {
		return bankMapper.queryBank();
	}
}
