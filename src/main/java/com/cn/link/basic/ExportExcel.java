package com.cn.link.basic;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExportExcel<T> {

	public void exportExcel(String[] headers, Collection<T> dataset,
			String fileName, HttpServletResponse response) {

		XSSFWorkbook workbook = new XSSFWorkbook(); // 声明一个工作簿
		XSSFSheet sheet = workbook.createSheet(fileName); // 声明一个表格
		sheet.setDefaultColumnWidth((int) 20); // 设置表格列的默认宽度

		// 产生表格标题行
		XSSFRow row = sheet.createRow(0);
		for (int i = 0; i < headers.length; i++) {
			XSSFCell cell = row.createCell(i);
			XSSFRichTextString text = new XSSFRichTextString(headers[i]);
			System.out.println("headers[" + i + "]:" + headers[i]);
			cell.setCellValue(text);
		}

		try {
			Iterator<T> it = dataset.iterator();
			int index = 0;
			while (it.hasNext()) {
				index++;
				row = sheet.createRow(index);
				T t = (T) it.next();
				Field[] fields = t.getClass().getDeclaredFields();

				for (int i = 0; i < headers.length; i++) {
					XSSFCell cell = row.createCell(i);
					Field field = fields[i];
					String fieldName = field.getName();
					String getMethodName = "get"
							+ fieldName.substring(0, 1).toUpperCase()
							+ fieldName.substring(1);
					System.out.println("===>fieldName/getMethodName:"
							+ fieldName + "  ###  " + getMethodName);

					Class tCls = t.getClass();
					Method getMethod = tCls.getMethod(getMethodName,
							new Class[] {});
					Object value = getMethod.invoke(t, new Object[] {});
					String textValue = null;
					if (value != null && value != "") {
						textValue = value.toString();
//						System.out.println(textValue);
					}
					if (textValue != null) {
						XSSFRichTextString richString = new XSSFRichTextString(
								textValue);
						cell.setCellValue(richString);
					}
				}
			}
			// 获取数据正确
			getExportedFile(workbook, fileName, response);
		} catch (Exception e1) {
			System.out.println("el:" + e1.getMessage());
		}
	}

	public void getExportedFile(XSSFWorkbook workbook, String name,
			HttpServletResponse response) throws Exception {
		response.setContentType("application/octet-stream");
		//response.setContentType("octet/stream");
		response.setHeader("Content-Disposition", "attachment;filename=" + "chengdui"+".xls");
		OutputStream out = response.getOutputStream();
		response.flushBuffer();
		workbook.write(out);
		out.close();
		/*try{
			if(fileOut==null){
				fileOut=new FileOutputStream("E://"+FileName);
			}
			workbook.write(fileOut);
		}catch(IOException e ){
			e.printStackTrace();
		}finally{
			if(fileOut!=null){
				fileOut.close();
			}
		}*/
	}
}
