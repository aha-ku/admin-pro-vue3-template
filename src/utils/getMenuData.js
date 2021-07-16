function formatRelativePath(routes, breadcrumb, parent) {
    return routes.map(route => {
        // if (route.path.startsWith('/')) return route;
        if (parent) {
            route.path = `${parent.path || ''}/${route.path}`
        } else {
            route.path = `/${route.path}`
        }
        route.path = route.path.replace('//', '/');
        console.log(route)
        if (route.children && route.children.length > 0) {
            route.children = formatRelativePath(route.children, breadcrumb, route);
        }
        breadcrumb[route.path] = route;
        return route
    })
}
export function getMenuData(routes) {
    const breadcrumb = {}
    const childrenRoute = routes.find(route => route.path === '/')
    return {
        menuData: formatRelativePath(childrenRoute?.children || [], breadcrumb),
        breadcrumb
    }
}