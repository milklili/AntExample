const menu = [
  {
    id: '1',
    mpid: '-1',
    icon: 'copy',
    name: '房屋合同',
  },
  {
    id: '2',
    bpid: '1',
    name: '合同列表',
    icon: 'file-text',
    route: '/Contract',
  },
  {
    id: '3',
    bpid: '1',
    name: '销毁合同',
    icon: 'file-excel',
    route: '/Contract/SuperDelete',
  },
  {
    id: '4',
    bpid: '1',
    name: '生成合同费用',
    icon: 'export',
    route: '/GenerateContractBill',
  },
  {
    id: '5',
    bpid: '1',
    name: '合同收费',
    icon: 'pay-circle-o',
    route: '/ContractCharge',
  },
  {
    id: '6',
    bpid: '1',
    name: '合同到期预期列表',
    icon: 'schedule',
    route: '/ContractExpiredWarning',
  },
  {
    id: '7',
    bpid: '1',
    name: '合同收费催费单列表',
    icon: 'exception',
    route: '/ContractFeeNotice',
  },
]

const prefix = '/Coevery.Contract'

export default menu.map(item => {
  if (item.route) item.route = `${prefix}${item.route}`
  return item
})
