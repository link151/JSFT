package com.cn.link.test;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.poi.ss.formula.functions.T;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.xmlbeans.impl.xb.xsdschema.Public;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.alibaba.fastjson.JSON;
import com.cn.link.basic.ExportExcel;
import com.cn.link.model.Draft;
import com.cn.link.model.User;
import com.cn.link.service.CreateBillService;
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
	
	@Resource
	private CreateBillService billService= null;
	
//	@Test
//	public void test1() {
//		User user = userService.selectByPrimaryKey(1);
//		System.out.println("======test1 selectByPrimaryKey====>");
//		// System.out.println(user.getUserName());
//		// logger.info("值："+user.getUserName());
//		logger.info(JSON.toJSONString(user));
//	}
	
//	@Test
//	public void testinsert() {
//		User user = new User();
//		user.setId(2);
//		user.setUsername("testinsert");
//		user.setPassword("123456");
//		System.out.println("======test2 testinsert====>");
//		userService.insert(user);
//		// System.out.println(user.getUserName());
//		// logger.info("值："+user.getUserName());
//		logger.info(JSON.toJSONString(user));
//	}
	
//	@Test
//	public void testGetInfoFromDraftAndBill(){
//		String contractid = "111111";
//		System.out.println("======testGetInfoFromDraftAndAccept====>");
//		Draft draft = draftService.getInfoFromDraftAndBill(contractid);
//		logger.info(JSON.toJSONString(draft));
//	}
	
	@Test
	public void testExportCheckBill(){
		String bank = "广发银行";
//		String dept = "";
//		String currency = "";
//		String goods = "";
//		String contractId = "";
//		String crtDate = "";
		String dept = "201金属矿产部";
		String currency = "美元USD";
		String goods = "商品类型";
		String contractId = "jsft10161";
		String crtDate = "2016/11";
		System.out.println("======testExportCheckBill====>");
		logger.info(JSON.toJSONString(billService.exportCheckBill(bank, dept, currency, goods, contractId, crtDate)));
	}
	
	@Test
	public void testGetExportedFile() throws Exception{
		ExportExcel<T> ee = new ExportExcel<T>();
		XSSFWorkbook workbook = new XSSFWorkbook();
		String name="testGetExportedFile";
		
		String bank = "广发银行";
		String dept = "201金属矿产部";
		String currency = "美元USD";
		String goods = "商品类型";
		String contractId = "jsft10161";
		String crtDate = "2016/11";
		System.out.println("======###testGetExportedFile###====>");
		HttpServletResponse response=(HttpServletResponse) billService.exportCheckBill(bank, dept, currency, goods, contractId, crtDate);
		ee.getExportedFile(workbook, name, response);
	}
}
