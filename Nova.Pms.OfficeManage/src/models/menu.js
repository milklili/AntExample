const menu = [
  {
    id: '1',
    mpid: '-1',
    icon: 'home',
    name: '首页',
    route: '/dashboard',
  },
  {
    id: '2',
    bpid: '1',
    name: '办公管理',
    icon: 'notification',
  },
  {
    id: '21',
    mpid: '2',
    bpid: '2',
    name: '文档类别管理',
    route: '/officeManageList',
  },
  {
    id: '22',
    mpid: '2',
    bpid: '2',
    name: '会议类别管理',
    route: '/meetingCategoryList',
    quick: true,
  },
  {
    id: '23',
    mpid: '2',
    bpid: '2',
    name: '计划类别管理',
    route: '/planTypeList',
  },
  {
    id: '24',
    mpid: '2',
    bpid: '2',
    name: '文档资料管理',
    route: '/documentList',
    quick: true,
  },
  {
    id: '25',
    mpid: '2',
    bpid: '2',
    name: '会议记录',
    route: '/meeting',
  },
  {
    id: '26',
    mpid: '2',
    bpid: '2',
    name: '工作计划',
    route: '/workingPlanList',
  },
  {
    id: '3',
    bpid: '1',
    name: '人事管理',
    icon: 'laptop',
  },
  {
    id: '31',
    mpid: '3',
    bpid: '3',
    name: '考勤管理',
    route: '/workAttendanceList',
  },
  // {
  //   id: '4',
  //   bpid: '1',
  //   name: '合同管理',
  //   icon: 'laptop',
  //   route: '/contractList',
  // },
  {
    id: '5',
    bpid: '1',
    name: '保安消防',
    icon: 'laptop',
  },
  {
    id: '51',
    mpid: '5',
    bpid: '5',
    name: '安防区域及器材管理',
    route: '/securityEquipMentList',
  },
  {
    id: '52',
    mpid: '5',
    bpid: '5',
    name: '安防事件记录',
    route: '/securityEventsList',
    quick: true,
  },
  {
    id: '53',
    mpid: '5',
    bpid: '5',
    name: '来人来访',
    route: '/visitorRegistrationList',
    quick: true,
  },
  {
    id: '54',
    mpid: '5',
    bpid: '5',
    name: '物品出入登记',
    route: '/articleRegistrationList',
  },
  {
    id: '55',
    mpid: '5',
    bpid: '5',
    name: '保安岗管理',
    route: '/securityPositionList',
  },
  {
    id: '56',
    mpid: '5',
    bpid: '5',
    name: '值班方案',
    route: '/securityDutyPlanList',
  },
  {
    id: '57',
    mpid: '5',
    bpid: '5',
    name: '保安排班表',
    route: '/securityScheduleList',
  },

  {
    id: '6',
    bpid: '1',
    name: '保洁管理',
    icon: 'laptop',
  },
  {
    id: '58',
    mpid: '6',
    bpid: '6',
    name: '保洁区域',
    route: '/cleaningAreaList',
    quick: true,
  },
  {
    id: '59',
    mpid: '6',
    bpid: '6',
    name: '保洁记录',
    route: '/cleaningRecordList',
    quick: true,
  },
  {
    id: '60',
    mpid: '6',
    bpid: '6',
    name: '保洁检查',
    route: '/cleaningInspectList',
  },
  {
    id: '61',
    mpid: '6',
    bpid: '6',
    name: '保洁工具管理',
    route: '/cleaningToolList',
  },

  {
    id: '7',
    bpid: '1',
    name: '审批管理',
    icon: 'laptop',
  },
  {
    id: '62',
    mpid: '7',
    bpid: '7',
    name: '新建审批',
    route: '/createApproval',
    quick: true,
  },
  {
    id: '63',
    mpid: '7',
    bpid: '7',
    name: '我发起的',
    route: '/initiatedList',
  },
  {
    id: '64',
    mpid: '7',
    bpid: '7',
    name: '待我审批的',
    route: '/pendingApprovalList',
    quick: true,
  },
  {
    id: '65',
    mpid: '7',
    bpid: '7',
    name: '我已审批的',
    route: '/approvedList',
  },
  {
    id: '66',
    mpid: '7',
    bpid: '7',
    name: '抄送我的',
    route: '/sendApprovalList',
  },
]

const tabBar = [
  {
    name: '常用服务',
    menu: ['25', '56'],
  },
]

export default {
  menu,
  tabBar,
}
