package com.cn.link.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cn.link.mapper.UserMapper;
import com.cn.link.model.User;
import com.cn.link.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserMapper userMapper;
	
	@Override
	public int deleteByPrimaryKey(Integer id){
		return userMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insert(User record){
		return userMapper.insert(record);
	}

	@Override
	public int insertSelective(User record){
		return userMapper.insertSelective(record);
	}

	@Override
	public User selectByPrimaryKey(Integer id){
		return userMapper.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(User record){
		return userMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(User record){
		return userMapper.updateByPrimaryKey(record);
	}

	@Override
	public User queryByUsername(String username) {
		return userMapper.queryByUsername(username);
	}

	@Override
	public User queryLogin(String username, String password) {
		return userMapper.queryLogin(username, password);
	}

	@Override
	public List<String> queryDept() {
		return userMapper.queryDept();
	}
}
