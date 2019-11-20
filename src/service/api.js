const CONTACT_API = {
    //免登
    getUserInfoData: {
        method: 'post',
        url: '/user/getUserInfo'
    },
    // 获取商品列表
    getContactList: {
        method: 'post',
        url: '/deviceOrder/getDeviceList'
    },
    // 分类标签
    getClassListData: {
        method: 'post',
        url: '/deviceOrder/getClassList'
    },
    // 管理员新增商品标签列表
    ClassList: {
        method: 'post',
        url: '/deviceManage/getClassList'
    },
    // 获取商品详情
    getContactDetails: {
        method: 'post',
        url: '/deviceOrder/getDeviceDeatail'
    },


    // 获取管理员列表
    getAdminList: {
        method: 'post',
        url: '/user/getAdminList',
    },
    // 管理员获取当前设备列表
    getAdminGetDeviceList: {
        method: 'post',
        url: '/deviceManage/adminGetDeviceList',
    },
    // 管理员启用/禁用设备（1启用，0禁用）
    getEnableDevice: {
        method: 'post',
        url: '/deviceManage/enableDevice',
    },
    // 管理员添加设备
    getInsertDevice: {
        method: 'post',
        url: '/deviceManage/insertDevice',
    },
    // 管理员修改设备
    getUpdateDevice: {
        method: 'post',
        url: '/deviceManage/updateDevice',
    },
    // 管理员修改设备时拉取设备信息
    getDeviceMessageData: {
        method: 'post',
        url: '/deviceManage/getDeviceMessage',
    },
    // 管理员同意申请单
    getAcceptOrder: {
        method: 'post',
        url: '/deviceOrder/acceptOrder',
    },
    // 管理员获取订单详情
    getOrderDeatailData: {
        method: 'post',
        url: '/deviceOrder/getOrderDeatail',
    },
    // 管理员确认借出
    getLendDevice: {
        method: 'post',
        url: '/deviceOrder/lendDevice',
    },
    // 管理员确认归还
    getReturnDevice: {
        method: 'post',
        url: '/deviceOrder/returnDevice',
    },
    // 管理员拒绝/关闭
    getAdminCloseOrder: {
        method: 'post',
        url: '/deviceOrder/adminCloseOrder',
    },



    // 图片上传
    getUdpatePic: {
        method: 'post',
        url: '/udpate/udpatePic',
    },
    // 申请人获取历史记录列表(订单状态 0未受理 1已受理 2已借出 3已归还 4已拒绝 5已撤销 6管理员关闭(已关闭)如若查询全部订单则传空)
    getOrderListData: {
        method: 'post',
        url: '/deviceOrder/getOrderList',
    },
    // 获取购物车列表
    getCartList: {
        method: 'post',
        url: '/deviceCart/getCartListByUserid',
    },
    // 加入购物车
    addCart: {
        method: 'post',
        url: '/deviceCart/insertCartById',
    },
    // 购物车内删除商品
    deleteCart: {
        method: 'post',
        url: '/deviceCart/deleteCartById',
    },
    // 申请人提交申请单
    insertOrder: {
        method: 'post',
        url: '/deviceOrder/insertOrder',
    },
    // 申请人撤销申请单
    getCancelOrder: {
        method: 'post',
        url: '/deviceOrder/cancelOrder',
    },
    //申请人预览借用需要花多少钱
    getMoneyData: {
        method: 'post',
        url: '/deviceOrder/getMoney',
    },




    // 管理员/超级管理员获取 管理记录列表
    getAdminOrderListData: {
        method: 'post',
        url: '/deviceOrder/getAdminOrderList',
    },
    // 模糊查询
    getSearch: {
        method: 'post',
        url: '/user/getUserMessage',
    },
    // 设置成管理员
    getInsertAdmin: {
        method: 'post',
        url: '/user/insertAdmin',
    },
    // 删除管理员
    getDeleteAdmin: {
        method: 'post',
        url: '/user/deleteAdmin',
    },

    //超级管理员操作
    getCompanyListData: {
        method: 'post',
        url: '/deviceClass/getCompanyList',
    },
    //获取父类标签列表
    getParentListData: {
        method: 'post',
        url: '/deviceClass/getParentList',
    },
    //获取子类标签列表
    getdevClassListData: {
        method: 'post',
        url: '/deviceClass/getClassList',
    },
    //禁用父类标签
    deleteParentClassData: {
        method: 'post',
        url: '/deviceClass/deleteParentClass',
    },
    //禁用子类标签
    deleteClassData: {
        method: 'post',
        url: '/deviceClass/deleteClass',
    },
    //启用父类标签
    startParentClassData: {
        method: 'post',
        url: '/deviceClass/startParentClass',
    },
    //启用子类标签
    startClassData: {
        method: 'post',
        url: '/deviceClass/startClass',
    },
    //新增父类标签
    insertParentClassData: {
        method: 'post',
        url: '/deviceClass/insertParentClass',
    },
    //新增子类标签
    insertClassData: {
        method: 'post',
        url: '/deviceClass/insertClass',
    },
    //获取管理员所管理的父类标签列表
    getAdminParentClassListData: {
        method: 'post',
        url: '/user/getAdminParentClassList',
    },
   
    //更新管理员所管理的父类标签列表
    updateAdminParentClassListSuper: {
        method: 'post',
        url: '/user/updateAdminParentClassList',
    },
   
}
export default CONTACT_API