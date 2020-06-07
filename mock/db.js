const Mock = require('mockjs');

module.exports = function () {
    const data = {
        login: {},
        loginuser: {},

        infoTableData: {},
        details: {},
        ssotree: {},
    }

    loginuser["hrorganization"] = hrorganization;

    data.login = loginuser;
    data.loginuser = loginuser;
    data.ssotree = ssotree;
    data.infoTableData = infoTableData;
    data.details = details;
    return data;
}

const ssotree = {
    "success": true,
    "data": {
        "ssotree": [{
            "id": "C100",
            "text": "北京分公司",
            "leaf": true,
        },
        {
            "id": "C101",
            "text": "华北分公司",
            "leaf": true,
        },
        {
            "id": "C102",
            "text": "华中分公司",
            "leaf": true,
        },
        {
            "id": "C103",
            "text": "华南分公司",
            "leaf": true,
        }
        ]
    }
};

//人员详情数据
const details = {
    "success": true,
    "data": {
        "id": 1,
        "name": Mock.mock('@cname'),
        "gender": Mock.mock('@boolean'),//true-男，false-女
        "age": Mock.mock('@natural(18, 65)'),
        "birthday": Mock.mock('@datetime'),
        "email": Mock.mock('@email'),
        "address": Mock.mock('@county(true)'),
    },
}
//人员表格数据
const infoTableData = Mock.mock({
    "success": true,
    "data": {
        "total": 200,
        "infoTableData": function () {
            const res = [];
            for (let i = 1; i <= 50; i++) {
                res.push({
                    "id": i,
                    "name": Mock.mock('@cname'),
                    "gender": Mock.mock('@boolean'),//true-男，false-女
                    "age": Mock.mock('@natural(18, 65)'),
                    "birthday": Mock.mock('@datetime'),
                    "email": Mock.mock('@email'),
                    "address": Mock.mock('@county(true)'),
                });
            }
            return res;
        }
    }
});

const loginuser = {
    "success": true,
    "currentUser": {
        "id": 0,
        "username": "管理员",
        "companyId": "0",
        "companyFullName": "投资集团公司",
        "positionId": "G100",
        "position": "测试",
        "authorities": [
            "ROLE_ADMIN",
            "ROLE_EDIT",
            "ROLE_USER"
        ]
    },
    "users": [{
        "id": 1,                        // id
        "username": "管理员",                // 姓名，hr系统
        "mobile": 18222089781,          // 电话
        "position": "测试岗位",          // 岗位名称
        "authorities": [                // 用户权限集合
            "ROLE_ADMIN",
            "ROLE_EDIT",
            "ROLE_USER"
        ]
    }],
}

const hrorganization = {
    id: "C0",
    name: "XX集团",
    orderNumber: "1",
    parentId: "0",
    children: [
        {
            id: "T0",
            name: "总部",
            orderNumber: "2",
            parentId: "1",
            children: [
                {
                    id: "C1",
                    name: "董事会",
                    orderNumber: "3",
                    parentId: "2",
                    children: [
                        {
                            id: "D1001",
                            name: "办公室",
                            orderNumber: "4",
                            parentId: "3",
                            children: [
                                {
                                    id: "P100001",
                                    name: "主任",
                                    orderNumber: "5",
                                    parentId: "4",
                                    children: [
                                        {
                                            id: 1,
                                            name: "张三",
                                            mainPosition: true,
                                            positionId: "001",
                                        }
                                    ]
                                },
                                {
                                    id: "D100002",
                                    name: "副主任",
                                    orderNumber: "6",
                                    parentId: "4",
                                    children: [
                                        {
                                            id: 2,
                                            name: "李四",
                                            mainPosition: true,
                                            positionId: "002",
                                        }
                                    ]
                                },
                            ]
                        },
                    ]
                },
                {
                    id: "C2",
                    name: "监事会",
                    orderNumber: "7",
                    parentId: "2",
                    children: [
                        {
                            id: "D1002",
                            name: "审计部",
                            orderNumber: "8",
                            parentId: "7",
                            children: [
                                {
                                    id: "P100003",
                                    name: "部长",
                                    orderNumber: "9",
                                    parentId: "8",
                                    children: [
                                        {
                                            id: 3,
                                            name: "王五",
                                            mainPosition: true,
                                            positionId: "003",
                                        }
                                    ]
                                },
                                {
                                    id: "D100004",
                                    name: "副部长",
                                    orderNumber: "10",
                                    parentId: "8",
                                    children: [
                                        {
                                            id: 4,
                                            name: "成六",
                                            mainPosition: true,
                                            positionId: "004",
                                        }
                                    ]
                                },
                            ]
                        },
                    ]
                },
            ]
        },
        {
            id: "T1",
            name: "分公司",
            orderNumber: "3",
            parentId: "0",
            children: [

            ]
        }
    ]
}

const tree = {
    "id": 0,
    "type": 1,
    "name": "XX集团",
    "children": [{
        "id": 1,
        "type": 0,
        "name": "总部",
        "children": [
            {
                "id": 1,
                "type": 1,
                "name": "总部",
                "children": []
            },
            {
                "id": 2,
                "type": 1,
                "name": "监事会",
                "children": []
            },
            {
                "id": 3,
                "type": 1,
                "name": "监事会",
                "children": []
            }
        ]
    }, {
        "id": 10,
        "type": 0,
        "name": "区域经营指挥部",
        "children": [
            {
                "id": 12,
                "type": 1,
                "name": "华北指",
                "children": []
            },
            {
                "id": 13,
                "type": 1,
                "name": "华中指",
                "children": []
            },
            {
                "id": 14,
                "type": 1,
                "name": "华南指",
                "children": []
            }
        ]
    }, {
        "id": 12,
        "type": 0,
        "name": "区域分公司",
        "children": [
            {
                "id": 21,
                "type": 1,
                "name": "北京分公司",
                "children": []
            },
            {
                "id": 22,
                "type": 1,
                "name": "陕西分公司",
                "children": []
            },
            {
                "id": 23,
                "type": 1,
                "name": "河北分公司",
                "children": []
            }
        ]
    }, {
        "id": 13,
        "type": 0,
        "name": "事业部",
        "children": []
    }],
};

const logs = {
    "success": true,
    "total": 5,
    "page": 0,
    "results": [
        {
            "id": 1,
            "createtime": "2019-4-27 08:35:37",
            "providerOwner": "0",
            "userProviderId": "0",
            "username": "管理员",
            "ipaddr": "127.0.0.1",
            "position": "测试",
            "content": "测试新建",
            "useragent": 1
        },
        {
            "id": 2,
            "createtime": "2019-4-26 10:15:32",
            "providerOwner": "0",
            "userProviderId": "0",
            "username": "管理员",
            "ipaddr": "127.0.0.1",
            "position": "测试",
            "content": "测试修改操作",
            "useragent": 3
        },
        {
            "id": 3,
            "createtime": "2019-4-26 09:35:22",
            "providerOwner": "0",
            "userProviderId": "0",
            "username": "管理员",
            "ipaddr": "127.0.0.1",
            "position": "测试",
            "content": "测试日志输出",
            "useragent": 5
        },
        {
            "id": 4,
            "createtime": "2019-4-24 08:21:18",
            "providerOwner": "0",
            "userProviderId": "0",
            "username": "管理员",
            "ipaddr": "127.0.0.1",
            "position": "测试",
            "content": "新建编制表",
            "useragent": 4
        },
        {
            "id": 5,
            "createtime": "2019-4-20 15:20:18",
            "providerOwner": "0",
            "userProviderId": "0",
            "username": "管理员",
            "ipaddr": "127.0.0.1",
            "position": "测试",
            "content": "修改编制基本信息",
            "useragent": 3
        }
    ]
};

const positions = [
    {
        "key": "0",
        "id": 0,
        "type": 0,
        "fullName": "XX集团总部",
        "name": "总部",
        "leaf": false,
        "position": "董事长",
        "positionFullName": "总部/董事长",
        "children": [
            {
                "id": 101,
                "key": "0_101",
                "type": 3,
                "name": "华南分公司",
                "fullname": "XX集团华南分公司",
                "position": "部长",
                "positionFullName": "分公司/部长",
                "leaf": true,
                "children": []
            },
            {
                "id": 102,
                "key": "0_102",
                "type": 5,
                "name": "西南分公司",
                "fullname": "XX集团西南分公司",
                "position": "副部长",
                "positionFullName": "分公司/副部长",
                "leaf": true,
                "children": []
            },
            {
                "id": 103,
                "key": "0_103",
                "type": 5,
                "name": "北京分公司",
                "fullname": "XX集团北京分公司",
                "position": "处长",
                "positionFullName": "分公司/处长",
                "leaf": true,
                "children": []
            }
        ]
    }
];

const mywork = [
    {
        id: 1,
        status: 1,
        orgname: "单位1",
        workname: "事项名称1",
        author: "提交人1",
        worktype: 1,
        submittime: new Date,
        passtime: new Date,
    },
    {
        id: 2,
        status: 1,
        orgname: "单位2",
        workname: "事项名称2",
        author: "提交人2",
        worktype: 2,
        submittime: new Date,
        passtime: new Date,
    },
    {
        id: 3,
        status: 1,
        orgname: "单位3",
        workname: "事项名称3",
        author: "提交人3",
        worktype: 3,
        submittime: new Date,
        passtime: new Date,
    },
    {
        id: 4,
        status: 0,
        orgname: "单位4",
        workname: "事项名称4",
        author: "提交人4",
        worktype: 4,
        submittime: new Date,
        passtime: new Date,
    },
    {
        id: 5,
        status: 0,
        orgname: "单位5",
        workname: "事项名称5",
        author: "提交人5",
        worktype: 5,
        submittime: new Date,
        passtime: new Date,
    },
    {
        id: 6,
        status: 1,
        orgname: "单位6",
        workname: "事项名称6",
        author: "提交人6",
        worktype: 6,
        submittime: new Date,
        passtime: new Date,
    }
];

const flowlist = [
    {
        "id": 1,
        "active": 1,
        "exnode": "C0",
        "name": "测试流程1",
        "bz": "",
        "exprops": "",
        "createdate": "2019-04-24 12:11:13",
        "modifydate": "2019-04-24 12:11:13",
        "spcount": "0"
    },
    {
        "id": 2,
        "active": 1,
        "exnode": "C0",
        "name": "测试流程2",
        "bz": "",
        "exprops": "",
        "createdate": "2019-04-24 12:11:13",
        "modifydate": "2019-04-24 12:11:13",
        "spcount": "2"
    }
];

const flownode = {
    edit: true,
    selectNodeId: 1,
    flow: {
        id: 1,
        name: "测试流程1"
    },
    nodes: [
        {
            "id": 1,
            "flowid": 1,
            "type": 1,
            "name": "部门领导审批",
            "bz": "",
            "exprops": ""
        },
        {
            "id": 2,
            "flowid": 1,
            "type": 2,
            "name": "主管领导审批",
            "bz": "",
            "exprops": ""
        }
    ]
};

const flowstations = [
    {
        "id": 1,
        "nodeid": 1,
        "title": "李里",
        "objtype": 3,
        "objid": 1,
        "ignorelimit": 0,
        "exprops": ""
    },
    {
        "id": 2,
        "nodeid": 1,
        "title": "信息部部长",
        "objtype": 1,
        "objid": 1,
        "ignorelimit": 0,
        "exprops": ""
    }
];

const dictions = {
    "success": true,
    "results": [
        {
            "id": "DICT_BIANZHI_TYPE",
            "name": "编制模板类型",
            "leafonly": true,
            "levels": "2,4",
            "cellDisplay": 1,
            "codelength": 4,
            "editingDisplay": 1,
            "items": [
                {
                    "k": "10",
                    "v": "机构"
                },
                {
                    "k": "1010",
                    "v": "集团总部"
                },
                {
                    "k": "1020",
                    "v": "区域分公司"
                },
                {
                    "k": "1030",
                    "v": "区域经营指挥部"
                },
                {
                    "k": "1040",
                    "v": "事业部"
                },
                {
                    "k": "1050",
                    "v": "分子公司"
                },
                {
                    "k": "1060",
                    "v": "投资公司"
                },
                {
                    "k": "1099",
                    "v": "其他机构"
                },
                {
                    "k": "20",
                    "v": "项目部"
                },
                {
                    "k": "2010",
                    "v": "总包工程"
                },
                {
                    "k": "2020",
                    "v": "专业工程"
                }
            ]
        },
        {
            "id": "DICT_PROJECT_STATE",
            "name": "项目状态",
            "leafonly": true,
            "levels": null,
            "cellDisplay": 1,
            "codelength": 2,
            "editingDisplay": 1,
            "items": [
                {
                    "k": "10",
                    "v": "施工准备"
                },
                {
                    "k": "20",
                    "v": "在施"
                },
                {
                    "k": "30",
                    "v": "停工(待工)"
                },
                {
                    "k": "40",
                    "v": "下月竣工"
                }
            ]
        },
        {
            "id": "DICT_PROJECT_FEATURE",
            "name": "项目特殊属性",
            "leafonly": true,
            "levels": null,
            "cellDisplay": 1,
            "codelength": 2,
            "editingDisplay": 1,
            "items": [
                {
                    "k": "10",
                    "v": "超高层"
                },
                {
                    "k": "20",
                    "v": "铁路站房"
                },
                {
                    "k": "30",
                    "v": "海外工程"
                },
                {
                    "k": "40",
                    "v": "重点工程"
                }
            ]
        },
        {
            "id": "DICT_FLOW_STATUS",
            "name": "审批状态",
            "leafonly": true,
            "levels": null,
            "cellDisplay": 1,
            "codelength": 1,
            "editingDisplay": 1,
            "items": [
                {
                    "k": "0",
                    "v": "审批中"
                },
                {
                    "k": "1",
                    "v": "审批通过"
                },
                {
                    "k": "2",
                    "v": "未通过"
                },
                {
                    "k": "3",
                    "v": "终止审批"
                }
            ]
        },
        {
            "id": "DICT_OBJ_TYPE",
            "name": "岗位类型",
            "leafonly": true,
            "levels": null,
            "cellDisplay": 1,
            "codelength": 1,
            "editingDisplay": 1,
            "items": [
                {
                    "k": "1",
                    "v": "岗位审批"
                },
                {
                    "k": "2",
                    "v": "部门审批"
                },
                {
                    "k": "3",
                    "v": "用户审批"
                },
                {
                    "k": "4",
                    "v": "流程"
                }
            ]
        },
        {
            "id": "DICT_SF",
            "name": "是否",
            "leafonly": true,
            "levels": null,
            "cellDisplay": 1,
            "codelength": 1,
            "editingDisplay": 1,
            "items": [
                {
                    "k": "0",
                    "v": "否"
                },
                {
                    "k": "1",
                    "v": "是"
                }
            ]
        }
    ]
};