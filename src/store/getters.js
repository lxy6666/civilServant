const getters = {
    sidebar: state => state.app.sidebar,
    language: state => state.app.language,
    size: state => state.app.size,
    device: state => state.app.device,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    nowindex: state => state.user.nowindex,
    token: state => state.user.token,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    addRouters: state => state.permission.addRouters,
    permission_routers: state => state.permission.routers,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    errorLogs: state => state.errorLog.logs,
    userInfo: state => state.user.userInfo,
}
export default getters