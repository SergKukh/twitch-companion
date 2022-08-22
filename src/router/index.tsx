import { ReactNode } from "react"
import Auth from "../pages/Auth"
import Login from "../pages/Login"
import Main from "../pages/Main"
import TopStreams from "../pages/TopStreams"

export interface IRoute {
    path: string
    element: ReactNode
}

export enum RouteNames {
    LOGIN = '/login',
    AUTH = '/auth',
    MAIN = '/',
    TOP_STREAMS = '/streams'
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, element: <Login /> },
    { path: RouteNames.AUTH, element: <Auth /> }
]

export const privateRoutes: IRoute[] = [
    { path: RouteNames.MAIN, element: <Main /> },
    { path: RouteNames.TOP_STREAMS, element: <TopStreams /> }
]