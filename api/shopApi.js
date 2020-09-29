import request from './request.js';

// 获取对应分类的商家
export function getShopListByClassId(classId,page,limit=10){
    return request({
        url:`http://localhost:3000/shoplist?classId=${classId}&_page=${page}&_limit=${limit}`
    })
}

// 获取对应分类的商家(按销量高排序)
export function getHighSalesshoplist(classId,page,limit=10){
	return request({
	    url:`http://localhost:3000/shoplist?classId=${classId}&_page=${page}&_limit=${limit}&_sort=grade&_order=desc`
	})
}