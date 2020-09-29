import request from './request.js';

// 手机号和密码登录
export function getUserByPhotoAndPassword(photo,password){
	var url = `http://localhost:3000/user?photo=${photo}&password=${password}`;
    return request({
        url
    })
}

// 微信登录时通过nickname获取用户信息(要nickname不重复，并自己定义到后台数据才能测试)
export function getUserByNickname(nickname){
	var url = `http://localhost:3000/user?nickname=${nickname}`;
	return request({
	    url
	})
}