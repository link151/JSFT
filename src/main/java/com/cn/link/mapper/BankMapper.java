package com.cn.link.mapper;

import java.util.List;

import com.cn.link.model.Bank;

public interface BankMapper {
	public int deleteByPrimaryKey(Integer id);

	public int insert(Bank record);

	public int insertSelective(Bank record);

	public Bank selectByPrimaryKey(Integer id);

	public int updateByPrimaryKeySelective(Bank record);

	public int updateByPrimaryKey(Bank record);
	
	public List<String> queryBank();
}