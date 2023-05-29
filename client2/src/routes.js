import UserPosts from './pages/UserPosts'
import Account from "./pages/Account";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import AllAds from "./pages/AllAds";
import OneAd from "./pages/OneAd";

import {LOGIN_ROUTE, 
        REGISTRATION_ROUTE, 
        ACCOUNT_ROUTE, 
        POSTS_ROUTE, 
        FAVORITES_ROUTE,
        AD_ROUTE,
        ALL_ADS_ROUTE} from './utils/consts'


//массив доступных страниц авторизованному пользователю
export const authRoutes=[
    {
        path:ACCOUNT_ROUTE,
        Component:Account
    },
    {
        path:POSTS_ROUTE,
        Component:UserPosts
    },
    {
        path:FAVORITES_ROUTE,
        Component:Favorites
    }

]
//массив доступных страниц неавторизованному пользователю
export const publicRoutes=[
    {
        path:REGISTRATION_ROUTE,
        Component:Auth
    },
    {
        path:LOGIN_ROUTE,
        Component:Login
    },
    {
        path:ALL_ADS_ROUTE,
        Component:AllAds
    },
    {
        path:AD_ROUTE +"/:id",
        Component:OneAd
    }
]
     

