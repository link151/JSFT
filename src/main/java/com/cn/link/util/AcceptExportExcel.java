package com.cn.link.util;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.cn.link.model.CreateAccept;

public class AcceptExportExcel {
	// 第一步，创建一个webbook，对应一个Excel文件  
	public HSSFWorkbook generateExcel(){
		return new HSSFWorkbook();
	}
	
	public HSSFWorkbook generateSheet(HSSFWorkbook wb, String sheetName, String[] fields, List<CreateAccept> list){
		// 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet   
		HSSFSheet sheet = wb.createSheet(sheetName);
		// 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short  
		HSSFRow row = sheet.createRow(0);
		// 第四步，创建单元格，并设置值表头设置表头居中
		HSSFCellStyle style = wb.createCellStyle();
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
		//设置表头字段名
		HSSFCell cell;
		int m = 0;
		for(String fieldName: fields){
			cell = row.createCell(m);
			cell.setCellValue(fieldName);
			cell.setCellStyle(style);
			m++;
		}
		for(int i = 0; i < list.size(); i++){
			row = sheet.createRow(i + 1);
			CreateAccept accept = list.get(i);
			row.createCell(0).setCellValue(accept.getContractid());
			row.createCell(1).setCellValue(accept.getBank());
			row.createCell(2).setCellValue(accept.getCurrency());
			row.createCell(3).setCellValue(accept.getPayamount());
			row.createCell(4).setCellValue((accept.getDays() == null) ? "" : accept.getDays().toString());
			row.createCell(5).setCellValue(accept.getWeek());
			row.createCell(6).setCellValue(accept.getPaydate());
			row.createCell(7).setCellValue(accept.getRegisterdate());
			row.createCell(8).setCellValue(accept.getLockamount());
			row.createCell(9).setCellValue(accept.getLockrate());
			row.createCell(10).setCellValue(accept.getState());
		}
		return wb;
	}
	
	//实现文件下载保存
	public void export(HSSFWorkbook wb, HttpServletResponse response){
		try{
			response.setContentType("application/octet-stream");
			//response.setContentType("octet/stream");
			response.setHeader("Content-Disposition", "attachment;filename=" + "chengdui"+".xls");
			OutputStream out = response.getOutputStream();
			response.flushBuffer();
			//ByteArrayOutputStream bios = new ByteArrayOutputStream();
			wb.write(out);
			//byte[] xlsBytes = bios.toByteArray();
			//out.write(xlsBytes);
			//out.flush();
			//System.out.println(wb.toString());
			out.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}
}
