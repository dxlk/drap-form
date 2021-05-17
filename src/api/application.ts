// 应用管理相关接口 增删改查
interface application {
  id: string,
  name: string
}
interface result {
  code: string,
  status: number,
  msg: string,
  rows: []
}
// applicationList 应用列表
let applicationApi = {
  add(param: application) {
    let app = localStorage.getItem("applicationList");
    let appList: any = app && JSON.parse(app) || [];
    appList.push(param);
    localStorage.setItem("applicationList", JSON.stringify(appList))
    return {
      code: "200",
      status: 1,
      msg: "新增成功",
      rows: []
    }
  },
  deleteById(id: string) {
    let app = localStorage.getItem("applicationList") || "";
    let appList: any = app && JSON.parse(app);
    appList = appList.filter((item: application) => {
      return item.id != id;
    })
    localStorage.setItem("applicationList", JSON.stringify(appList));
    return {
      code: "200",
      status: 1,
      msg: "删除成功",
      rows: []
    }
  },
  edit(param: application) {
    let app = localStorage.getItem("applicationList") || "";
    let appList: any = JSON.parse(app);
    appList.forEach((item: application) => {
      if (item.id == param.id) {
        item.name = param.name;
      }
    })
    localStorage.setItem("applicationList", JSON.stringify(appList));
    return {
      code: "200",
      status: 1,
      msg: "修改成功",
      rows: []
    }
  },
  get(cb: any) {
    let app = localStorage.getItem("applicationList") || "";
    let appList: any = app && JSON.parse(app);
    console.log(appList)
    let res = {
      code: "200",
      status: 1,
      msg: "获取成功",
      rows: appList
    }
    cb && cb(res)
  }
}
export default applicationApi