export default [
  {
    text: '房屋租赁合同管理',
    menu: [
      {
        id: '11',
        mpid: '1',
        bpid: '1',
        name: '合同列表',
        route: '/Nova.Pms.Contract/Contract/Index',
        icon: null,
      },
      {
        id: '12',
        mpid: '1',
        bpid: '1',
        name: '销毁合同',
        route: '/Nova.Pms.Contract/Contract/SuperDelete',
        icon: null,
      },
      {
        id: '13',
        mpid: '1',
        bpid: '1',
        name: '生成合同费用',
        route: '/Nova.Pms.Contract/GenerateContractBill/Index',
        icon: null,
      },
      {
        id: '14',
        mpid: '1',
        bpid: '1',
        name: '合同收费',
        route: '/Nova.Pms.Contract/ContractCharge/Index',
        icon: null,
      },
      {
        id: '15',
        mpid: '1',
        bpid: '1',
        name: '合同到期预警列表',
        route: '/Nova.Pms.Contract/ContractExpiredWarning/Index',
        icon: null,
      },
      {
        id: '16',
        mpid: '1',
        bpid: '1',
        name: '合同收费催费单列表',
        route: '/Nova.Pms.Contract/ContractFeeNotice/Index',
        icon: null,
      },
    ],
  },
  {
    text: '收费管理',
    menu: [
      {
        id: '21',
        mpid: '2',
        bpid: '2',
        name: '收费导航',
        route: '/Nova.Pms.PropertyManagementSystem/PayNavigation/Index',
        icon: null,
      },
      {
        id: '22',
        mpid: '2',
        bpid: '2',
        name: '前台收费',
        route: null,
        icon: null,
      },
      {
        id: '221',
        mpid: '22',
        bpid: '22',
        name: '日常收费',
        route: '/Nova.Pms.PropertyManagementSystem/ChargeFeesWizard/Index',
        icon: null,
      },
      {
        id: '222',
        mpid: '22',
        bpid: '22',
        name: '预收费',
        route: '/Nova.Pms.PropertyManagementSystem/CustomerAccount/Index',
        icon: null,
      },
      {
        id: '223',
        mpid: '22',
        bpid: '22',
        name: '经营性收费',
        route: '/Nova.Pms.PropertyManagementSystem/TemporaryCharge/Index',
        icon: null,
      },
      {
        id: '224',
        mpid: '22',
        bpid: '22',
        name: '交款申请',
        route: '/Nova.Pms.PropertyManagementSystem/AccountStatement/Index',
        icon: null,
      },
      {
        id: '225',
        mpid: '22',
        bpid: '22',
        name: '收费历史记录',
        route: '/Nova.Pms.PropertyManagementSystem/PaymentHistory/Index',
        icon: null,
      },
      {
        id: '226',
        mpid: '22',
        bpid: '22',
        name: '损毁票据登记',
        route: '/Nova.Pms.PropertyManagementSystem/InvalidTicket/Index',
        icon: null,
      },
      {
        id: '227',
        mpid: '22',
        bpid: '22',
        name: '已收费用日报',
        route: '/Nova.Pms.PropertyManagementSystem/DayPaymentHistoryReport/Index',
        icon: null,
      },
      {
        id: '228',
        mpid: '22',
        bpid: '22',
        name: '客户零头账户明细',
        route: '/Nova.Pms.PropertyManagementSystem/CustomerSmallChangeAccount/Index',
        icon: null,
      },
      {
        id: '23',
        mpid: '2',
        bpid: '2',
        name: '应收管理',
        route: null,
        icon: null,
      },
      {
        id: '231',
        mpid: '23',
        bpid: '23',
        name: '已出账单',
        route: '/Nova.Pms.PropertyManagementSystem/ReceivableListDetailReport/Index',
        icon: null,
      },
      {
        id: '232',
        mpid: '23',
        bpid: '23',
        name: '未出账单',
        route: '/Nova.Pms.PropertyManagementSystem/GenerateBill/Index',
        icon: null,
      },
      {
        id: '233',
        mpid: '23',
        bpid: '23',
        name: '费用减免',
        route: '/Nova.Pms.PropertyManagementSystem/FeeDiscount/Index',
        icon: null,
      },
      {
        id: '234',
        mpid: '23',
        bpid: '23',
        name: '费用减免明细',
        route: '/Nova.Pms.PropertyManagementSystem/FeeDiscountReport/Index',
        icon: null,
      },
      {
        id: '235',
        mpid: '23',
        bpid: '23',
        name: '房间固定金额分摊',
        route: '/Nova.Pms.PropertyManagementSystem/CostAllocation/Index',
        icon: null,
      },
      {
        id: '24',
        mpid: '2',
        bpid: '2',
        name: '抄表管理',
        route: null,
        icon: null,
      },
      {
        id: '241',
        mpid: '24',
        bpid: '24',
        name: '仪表类型',
        route: '/Nova.Pms.PropertyManagementSystem/MeterType/Index',
        icon: null,
      },
      {
        id: '242',
        mpid: '24',
        bpid: '24',
        name: '房间仪表管理',
        route: '/Nova.Pms.PropertyManagementSystem/HouseMeter/Index',
        icon: null,
      },
      {
        id: '243',
        mpid: '24',
        bpid: '24',
        name: '房间仪表抄表',
        route: '/Nova.Pms.PropertyManagementSystem/HouseMeterReading/Index',
        icon: null,
      },
      {
        id: '244',
        mpid: '24',
        bpid: '24',
        name: '公摊仪表管理',
        route: '/Nova.Pms.PropertyManagementSystem/PublicMeter/Index',
        icon: null,
      },
      {
        id: '245',
        mpid: '24',
        bpid: '24',
        name: '公摊仪表抄表录入',
        route: '/Nova.Pms.PropertyManagementSystem/PublicMeterData/Index',
        icon: null,
      },
      {
        id: '25',
        mpid: '2',
        bpid: '2',
        name: '退款管理',
        route: null,
        icon: null,
      },
      {
        id: '251',
        mpid: '25',
        bpid: '25',
        name: '新建退款',
        route: '/Nova.Pms.PropertyManagementSystem/Deposit/Index',
        icon: null,
      },
      {
        id: '252',
        mpid: '25',
        bpid: '25',
        name: '退款历史记录',
        route: '/Nova.Pms.PropertyManagementSystem/Refund/Index',
        icon: null,
      },
      {
        id: '26',
        mpid: '2',
        bpid: '2',
        name: '收费参数设置',
        route: null,
        icon: null,
      },
      {
        id: '261',
        mpid: '26',
        bpid: '26',
        name: '收费项目类别',
        route: '/Nova.Pms.PropertyManagementSystem/ChargeItemCategory/Index',
        icon: null,
      },
      {
        id: '262',
        mpid: '26',
        bpid: '26',
        name: '收费项目定义',
        route: '/Nova.Pms.PropertyManagementSystem/ChargeItemType/Index',
        icon: null,
      },
      {
        id: '263',
        mpid: '26',
        bpid: '26',
        name: '收费标准设置',
        route: '/Nova.Pms.PropertyManagementSystem/ChargeItem/Index',
        icon: null,
      },
      {
        id: '264',
        mpid: '26',
        bpid: '26',
        name: '绑定收费标准',
        route: '/Nova.Pms.PropertyManagementSystem/HouseChargeSetting/Index',
        icon: null,
      },
      {
        id: '265',
        mpid: '26',
        bpid: '26',
        name: '自动账单日设置',
        route: '/Nova.Pms.PropertyManagementSystem/AutoGenerateBillSetting/Index',
        icon: null,
      },
      {
        id: '27',
        mpid: '2',
        bpid: '2',
        name: '财务管理',
        route: null,
        icon: null,
      },
      {
        id: '271',
        mpid: '27',
        bpid: '27',
        name: '票据管理',
        route: null,
        icon: null,
      },
      {
        id: '2711',
        mpid: '271',
        bpid: '271',
        name: '票据本管理',
        route: '/Nova.Pms.PropertyManagementSystem/Ticket/Index',
        icon: null,
      },
      {
        id: '2712',
        mpid: '271',
        bpid: '271',
        name: '当前在用票据',
        route: '/Nova.Pms.PropertyManagementSystem/CurrentUsedTicket/Index',
        icon: null,
      },
      {
        id: '272',
        mpid: '27',
        bpid: '27',
        name: '交款审批',
        route: '/Nova.Pms.PropertyManagementSystem/AccountStatement/Index',
        icon: null,
      },
      {
        id: '28',
        mpid: '2',
        bpid: '2',
        name: '财务汇总统计报表',
        route: null,
        icon: null,
      },
      {
        id: '281',
        mpid: '28',
        bpid: '28',
        name: '费用报表',
        route: null,
        icon: null,
      },
      {
        id: '2811',
        mpid: '281',
        bpid: '281',
        name: '综合报表',
        route: '/Nova.Pms.PropertyManagementSystem/ComprehensiveFinancialReport/Index',
        icon: null,
      },
      {
        id: '2812',
        mpid: '281',
        bpid: '281',
        name: '现金收款明细',
        route: '/Nova.Pms.PropertyManagementSystem/CashPayDetailReport/Index',
        icon: null,
      },
      {
        id: '2813',
        mpid: '281',
        bpid: '281',
        name: '预收转实收明细',
        route: '/Nova.Pms.PropertyManagementSystem/AdvancePayDetailReport/Index',
        icon: null,
      },
      {
        id: '2814',
        mpid: '281',
        bpid: '281',
        name: '微信支付明细',
        route: '/Nova.Pms.PropertyManagementSystem/WeChatPayDetailReport/Index',
        icon: null,
      },
      {
        id: '282',
        mpid: '28',
        bpid: '28',
        name: '月报表',
        route: null,
        icon: null,
      },
      {
        id: '2821',
        mpid: '282',
        bpid: '282',
        name: '应收月度统计',
        route: '/Nova.Pms.PropertyManagementSystem/ReceivableMonthReport/Index',
        icon: null,
      },
      {
        id: '2822',
        mpid: '282',
        bpid: '282',
        name: '欠费月度统计',
        route: '/Nova.Pms.PropertyManagementSystem/OwningMonthReport/Index',
        icon: null,
      },
      {
        id: '2823',
        mpid: '282',
        bpid: '282',
        name: '已收费用月统计',
        route: '/Nova.Pms.PropertyManagementSystem/MonthPaymentHistoryReport/Index',
        icon: null,
      },
      {
        id: '2824',
        mpid: '282',
        bpid: '282',
        name: '收入月度分摊',
        route: '/Nova.Pms.PropertyManagementSystem/ChargeMonthReport/Index',
        icon: null,
      },
      {
        id: '283',
        mpid: '28',
        bpid: '28',
        name: '年度报表',
        route: null,
        icon: null,
      },
      {
        id: '2831',
        mpid: '283',
        bpid: '283',
        name: '应收年度统计',
        route: '/Nova.Pms.PropertyManagementSystem/ReceivableYearReport/Index',
        icon: null,
      },
      {
        id: '2832',
        mpid: '283',
        bpid: '283',
        name: '欠费年度统计',
        route: '/Nova.Pms.PropertyManagementSystem/OwningYearReport/Index',
        icon: null,
      },
      {
        id: '2833',
        mpid: '283',
        bpid: '283',
        name: '已收费用年度统计',
        route: '/Nova.Pms.PropertyManagementSystem/ChargeYearReport/Index',
        icon: null,
      },
      {
        id: '2834',
        mpid: '283',
        bpid: '283',
        name: '收费率年度统计',
        route: '/Nova.Pms.PropertyManagementSystem/ChargeYearRateReport/Index',
        icon: null,
      },
      {
        id: '284',
        mpid: '28',
        bpid: '28',
        name: '欠费统计',
        route: null,
        icon: null,
      },
      {
        id: '285',
        mpid: '28',
        bpid: '28',
        name: '预付款收支明细',
        route: '/Nova.Pms.PropertyManagementSystem/AdvancePaymentIncomeAndPaidReport/Index',
        icon: null,
      },
      {
        id: '286',
        mpid: '28',
        bpid: '28',
        name: '押金统计',
        route: null,
        icon: null,
      },
      {
        id: '2861',
        mpid: '286',
        bpid: '286',
        name: '押金收退汇总',
        route: '/Nova.Pms.PropertyManagementSystem/DepositChargeReport/Index',
        icon: null,
      },
      {
        id: '2862',
        mpid: '286',
        bpid: '286',
        name: '押金收退明细',
        route: '/Nova.Pms.PropertyManagementSystem/DepositChargeDetailReport/Index',
        icon: null,
      },
      {
        id: '29',
        mpid: '2',
        bpid: '2',
        name: '打印房间费用通知单',
        route: '/Nova.Pms.PropertyManagementSystem/PrintFeeNotice/Index',
        icon: null,
      },
      {
        id: '210',
        mpid: '2',
        bpid: '2',
        name: 'Roles',
        route: '/Nova.Pms.Roles/Admin/Index',
        icon: null,
      },
    ],
  },
  {
    text: '基础信息',
    menu: [
      {
        id: '31',
        mpid: '3',
        bpid: '3',
        name: '房产管理',
        route: null,
        icon: null,
      },
      {
        id: '311',
        mpid: '31',
        bpid: '31',
        name: '楼宇档案',
        route: '/Nova.Pms.PropertyManagementSystem/Building/Index',
        icon: null,
      },
      {
        id: '312',
        mpid: '31',
        bpid: '31',
        name: '房产档案',
        route: '/Nova.Pms.PropertyManagementSystem/House/Index',
        icon: null,
      },
      {
        id: '313',
        mpid: '31',
        bpid: '31',
        name: '房产状态统计',
        route: '/Nova.Pms.PropertyManagementSystem/HousesummaryReport/Index',
        icon: null,
      },
      {
        id: '32',
        mpid: '3',
        bpid: '3',
        name: '客户管理',
        route: null,
        icon: null,
      },
      {
        id: '321',
        mpid: '32',
        bpid: '32',
        name: '客户档案',
        route: '/Nova.Pms.PropertyManagementSystem/Customer/Index',
        icon: null,
      },
      {
        id: '322',
        mpid: '32',
        bpid: '32',
        name: '交房登记',
        route: '/Nova.Pms.PropertyManagementSystem/HandOverHouse/Index',
        icon: null,
      },
      {
        id: '323',
        mpid: '32',
        bpid: '32',
        name: '接房登记',
        route: '/Nova.Pms.PropertyManagementSystem/ReceiveHouse/Index',
        icon: null,
      },
      {
        id: '324',
        mpid: '32',
        bpid: '32',
        name: '入住登记',
        route: '/Nova.Pms.PropertyManagementSystem/CustomerCheckIn/Index',
        icon: null,
      },
      {
        id: '33',
        mpid: '3',
        bpid: '3',
        name: '车位管理',
        route: null,
        icon: null,
      },
      {
        id: '331',
        mpid: '33',
        bpid: '33',
        name: '车库档案',
        route: '/Nova.Pms.PropertyManagementSystem/Carbarn/Index',
        icon: null,
      },
      {
        id: '332',
        mpid: '33',
        bpid: '33',
        name: '车位档案',
        route: '/Nova.Pms.PropertyManagementSystem/ParkingPlace/Index',
        icon: null,
      },
    ],
  },
  {
    text: '系统管理',
    menu: [
      {
        id: '41',
        mpid: '4',
        bpid: '4',
        name: '组织机构',
        route: '/Nova.Pms.PropertyManagementSystem/Company/Index',
        icon: null,
      },
      {
        id: '42',
        mpid: '4',
        bpid: '4',
        name: '用户管理',
        route: '/Nova.Pms.PropertyManagementSystem/Staff/Index',
        icon: null,
      },
      {
        id: '43',
        mpid: '4',
        bpid: '4',
        name: '打印设置',
        route: '/Nova.Pms.PropertyManagementSystem/PrintTemplate/Index',
        icon: null,
      },
      {
        id: '44',
        mpid: '4',
        bpid: '4',
        name: '系统初始化',
        route: '/Nova.Pms.PropertyManagementSystem/FastInitialization/Index',
        icon: null,
      },
      {
        id: '45',
        mpid: '4',
        bpid: '4',
        name: '系统参数设置',
        route: '/Nova.Pms.PropertyManagementSystem/DecimalDigitSetting/Index',
        icon: null,
      },
    ],
  },
]
