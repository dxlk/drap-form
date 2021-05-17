export default function myplugin() {//自定义插件的一个钩子
  // config 为 vite独特的钩子函数

  return {
    name: "my",
    resolveId() {

    },
    config: () => {

    },
    configureServer() {
      // 返回一个在内部中间件安装后被调用的后置钩子
      // server.middlewares.use((req, res, next) => {
      //   // 自定义请求处理...
      // })
    },
    load() {

    },
    transform() { }
  }
}