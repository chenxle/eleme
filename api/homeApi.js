import request from './request.js';

// 列表
export function getShopList(){
    return request({
        url:`http://localhost:3000/shoplist`
    })
}

// 宫格
export function getGongge(){
    return request({
        url:`http://localhost:3000/gongge`
    })
}

// 热门推荐
export function getHotSearch(){
	return request({
		url:`http://localhost:3000/hotSearch`
	})
}

// classId 商家列表