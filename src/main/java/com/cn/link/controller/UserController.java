package com.cn.link.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.cn.link.model.User;
import com.cn.link.service.UserService;

@Controller
public class UserController {

	private static Logger logger = Logger.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	private User user;

	@ModelAttribute
	public void setUser(User user) {
		this.user = user;
	}

	@RequestMapping(value = "findByName/{id}", method = RequestMethod.GET)
	public @ResponseBody User findByName(@PathVariable("id") Integer id) {
		if (userService.selectByPrimaryKey(id) == null) {
			return null;
		} else {
			logger.info(JSON.toJSONString(user));
			return userService.selectByPrimaryKey(id);
		}
	}

	@RequestMapping(value = "queryByUsername/{username}", method = RequestMethod.GET)
	public @ResponseBody User queryByUsername(
			@PathVariable("username") String username) {
		if (userService.queryByUsername(username) == null) {
			return null;
		} else {
			logger.info(JSON.toJSONString(userService.queryByUsername(username)));
			return userService.queryByUsername(username);
		}
	}

	@RequestMapping(value = "queryLogin/{username}/{password}", method = RequestMethod.GET)
	public @ResponseBody User queryLogin(
			@PathVariable("username") String username,
			@PathVariable("password") String password) {
		if (userService.queryLogin(username, password) == null) {
			return null;
		} else {
			logger.info(JSON.toJSONString(userService.queryLogin(username,
					password)));
			return userService.queryLogin(username, password);
		}
	}
	
	@RequestMapping(value="addUser",method=RequestMethod.POST)
	public @ResponseBody int addUser(@RequestBody User user){
		logger.info(JSON.toJSONString(user));
		return userService.insertSelective(user);
	}
	
	@RequestMapping(value="queryDept",method=RequestMethod.GET)
	public @ResponseBody List<String> queryDept(){
		logger.info("获取部门：" + JSON.toJSONString(userService.queryDept()));
		return userService.queryDept();
	}

}
