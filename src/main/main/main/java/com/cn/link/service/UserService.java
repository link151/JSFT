package com.cn.link.service;

import com.cn.link.model.User;

public interface UserService {

	public int deleteByPrimaryKey(Integer id);

    public int insert(User record);

    public int insertSelective(User record);

    public User selectByPrimaryKey(Integer id);

    public int updateByPrimaryKeySelective(User record);

    public int updateByPrimaryKey(User record);
    
    public User queryByUsername(String username);
    
    public User queryLogin(String username,String password);
}
