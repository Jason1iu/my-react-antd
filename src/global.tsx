export const styledTheme = {
    tipColor: '#f5f5dc',
    linkColor: '#1890ff',
    linkHoverColor: '#903e59',
    btnColor: 'rgba(64, 169, 255, 1)',
    btnColor2: 'rgb(0, 27, 160)',
    titleHeight: 45,
    treeWidth: 260,
    navWidth: 160,
    marginWidth: 5,
    toolbarHeight: 48,
    marginWidth2: 1,
    toolbarHeight2: 48,
};

/**
 * 设置左侧树隐藏与显示
 */
export const appnav_collapsed_key = "__appnav_collapsed";
export const apptree_collapsed_key = "__apptree_collapsed";

/**
 * 设置每页默认显示100条记录
 */
export const defaultPageSize = 50;

/**
 * 审批状态常量:-1-拟稿,0-审批中,1-审批通过,2-未通过,3-终止审批,4-申请修改,
 */
export enum FlowStatus {
    /*-1-拟稿 */
    Nigao = -1,
    /*0-审批中 */
    Shenpizhong = 0,
    /*1-审批通过 */
    Shenpitongguo = 1,
    /*2-未通过 */
    Shenpiweitongguo = 2,
    /*3-终止审批 */
    Zhongzhishenpi = 3,
    /*4-申请修改 */
    shenqingxiugai = 4,
}