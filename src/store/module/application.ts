
import applicationApi from '../../api/application'
const application = {
  state: {
    appList: [],
    currentAppName: "",
    currentAppId: ""
  },
  getters: {
    getCurrentAppConfig: (state: any) => {
      return {
        currentAppName: state.currentAppName,
        currentAppId: state.currentAppId
      }
    }
  },
  mutations: {
    getAllAppList: (state: { appList: any; }) => {
      applicationApi.get((res: any) => {
        state.appList = res.rows;
      })
      return state.appList;
    },
    addApp(state: any, obj: any) {
      if (state.appList == "") {
        state.appList = [];
      }
      state.appList.push(obj);
      applicationApi.add(obj);
    },
    setCurrentApp(state: any, obj: any) {
      state.currentAppName = obj.name;
      state.currentAppId = obj.id
      localStorage.setItem('currentAppId', obj.id)
    },
    edit(state: any, obj: any) {
      state.appList.forEach((item: any) => {
        if (item.id == obj.id) {
          item.name = obj.name;
        }
      });;
      applicationApi.edit(obj);
    },
    deleteById(state: any, id: string) {
      state.appList = state.appList.map((item: any) => {
        return item.id != id;
      })
      applicationApi.deleteById(id);
    }
  },

  Action: {

  }
}
export default application