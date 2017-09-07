const menu = [
  {
    id: '1',
    mpid: '-1',
    icon: 'user',
    name: '客户服务',
  },
  {
    id: '2',
    bpid: '1',
    name: '装修管理',
    icon: 'bulb',
  },
  {
    id: '21',
    mpid: '2',
    bpid: '2',
    name: '装修登记',
    route: '/Decorate',
  },
  {
    id: '3',
    bpid: '1',
    name: '报事报修',
    icon: 'tool',
  },
  {
    id: '31',
    mpid: '3',
    bpid: '3',
    name: '报事报修管理',
    route: '/RepairService',
  },
  {
    id: '32',
    mpid: '3',
    bpid: '3',
    name: '派工单管理',
    route: '/Dispatch',
  },
  {
    id: '33',
    mpid: '3',
    bpid: '3',
    name: '汇总管理',
    route: '/CustomerServiceReport',
  },
  {
    id: '4',
    bpid: '1',
    name: '车位租赁',
    icon: 'car',
  },
  {
    id: '41',
    mpid: '4',
    bpid: '4',
    name: '租赁办理',
    route: '/CarParkingRegistration',
  },
  {
    id: '42',
    mpid: '4',
    bpid: '4',
    name: '租赁折扣',
    route: '/ParkingPlaceDiscount',
  },
  {
    id: '43',
    mpid: '4',
    bpid: '4',
    name: '租赁报停',
    route: '/PauseParkingPlace',
  },
  {
    id: '44',
    mpid: '4',
    bpid: '4',
    name: '车位状态查询',
    route: '/CarParkingPlaceReport',
  },
  {
    id: '5',
    bpid: '1',
    name: '客服投诉',
    route: '/ComplaintHandle',
    icon: 'frown-o',
  },
  {
    id: '6',
    bpid: '1',
    name: '客服回访',
    route: '/CustomerReturnVisit',
    icon: 'customer-service',
  },
]

const prefix = '/Coevery.CustomerService'

export default menu.map(item => {
  if (item.route) item.route = `${prefix}${item.route}`
  return item
})
