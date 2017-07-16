package com.cn.link.test;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.alibaba.fastjson.JSON;
import com.cn.link.model.Draft;
import com.cn.link.model.User;
import com.cn.link.service.DraftService;
import com.cn.link.service.UserService;

@RunWith(SpringJUnit4ClassRunner.class)		//表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class TestMyBatisUser {
	private static Logger logger = Logger.getLogger(TestMyBatisUser.class);
	
	@Resource
	private UserService userService = null;
	
	@Resource
	private DraftService draftService = null;
	
	@Test
	public void test1() {
		User user = userService.selectByPrimaryKey(1);
		System.out.println("======test1 selectByPrimaryKey====>");
		// System.out.println(user.getUserName());
		// logger.info("值："+user.getUserName());
		logger.info(JSON.toJSONString(user));
	}
	
	@Test
	public void testinsert() {
		User user = new User();
		user.setId(2);
		user.setUsername("testinsert");
		user.setPassword("123456");
		System.out.println("======test2 testinsert====>");
		userService.insert(user);
		// System.out.println(user.getUserName());
		// logger.info("值："+user.getUserName());
		logger.info(JSON.toJSONString(user));
	}
	
	@Test
	public void testGetInfoFromDraftAndBill(){
		String contractid = "111111";
		System.out.println("======testGetInfoFromDraftAndAccept====>");
		Draft draft = draftService.getInfoFromDraftAndBill(contractid);
		logger.info(JSON.toJSONString(draft));
	}
}
