function request(options) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: options.url,
            method: options.method || 'get', //请求（如果有传值的话就用前面的 没有的话就默认传get）
            data: options.data,
            success(res) {
                resolve(res.data);
            },
            fail(err){
                reject(err);
            },
        })
    })
}
export default request;