import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import Components
import Login from './components/Login.vue'
// import Dashboard from './components/dashboard/Dashboard.vue'
import Admin from './components/admin/pages/master/Admin.vue'
import Home from './components/admin/pages/master/Home.vue'
import User from './components/admin/pages/master/user/User.vue'
import Menu from './components/admin/pages/master/Menu.vue'
import Food from './components/admin/pages/master/Food.vue'

import SpecialMenu from './components/admin/pages/master/SpecialMenu.vue'
import Unauthorized from './components/Authorized/Unauthorized.vue'
import NotFound from './components/Authorized/NotFound.vue'
import OrderHistory from './components/admin/pages/master/order/OrderHistory.vue'
import Order from './components/admin/pages/master/order/Order.vue'

// Font Awesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css';
import Invoice from './components/admin/pages/master/order/Invoice.vue'
import Kithchen from './components/kitchen/Kithchen.vue'
import Test from './components/Test.vue'
import WomenCollectionPage from './components/dashboard/category/women.vue'
import MenCollectionPage from './components/dashboard/category/men.vue'
import BoyCollectionPage from './components/dashboard/category/boy.vue'
import GirlCollectionPage from './components/dashboard/category/girl.vue'
import Filter from './components/dashboard/category/filter.vue'
//product_list
// import Productdetailpage from './components/dashboard/product/productdetailpage.vue'
import List from './components/dashboard/product/list.vue'
import Create from './components/dashboard/product/create.vue'
import Edit from './components/dashboard/product/edit.vue'

// 
//order_list
import orderList from './components/dashboard/order/orderList.vue'
import OrderDetail from './components/dashboard/order/orderDetail.vue'
import calender from './components/dashboard/calender.vue'
import Categorylist from './components/dashboard/categorys/categorylist.vue'

import Createcategory from './components/dashboard/categorys/createcategory.vue'
import Dashboard from './components/dashboard/dashboard.vue'
import Customer from './components/dashboard/customer/customer.vue'
import Createcustomer from './components/dashboard/customer/createcustomer.vue'
import Sellerlist from './components/dashboard/Seller/sellerlist.vue'
import Createsellerlist from './components/dashboard/Seller/createsellerlist.vue'
import Productdetailpage from './components/dashboard/category/productdetailpage.vue'


// import Home from './components/dashboard/dashboard.vue'
//category

// Define Routes
const routes = [
    {
        path: '/',
        component: Login,
        name: 'Login',
    },
    {
        path: '/test',
        component: Test,
        name: 'Test',
    },
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'Dashboard',
        meta: { requiresAuth: true, roles: ['user', 'admin'] }
    },
//    {
//         path: '/productdeta',
//         component: Dashboard,
//         name: 'Dashboard',
//         meta: { requiresAuth: true, roles: ['user', 'admin'] }
//     },
//     {
//   path: '/product/:id',
//   name: 'Productdetailpage',
//   component: () => import('/dashboard/ProductDetailPage.vue'),
// },
    {
        path: '/women',
        component: WomenCollectionPage,
        name: 'WomenCollectionPage',
        meta: { requiresAuth: true, roles: ['user', 'admin'] }
    },
      {
        path: '/productdetailpage',
        component: Productdetailpage,
        name: 'ProductDetailPage',
        meta: { requiresAuth: true, roles: ['user', 'admin'] }
    },
    
 
      {
        path: '/men',
        component: MenCollectionPage,
        name: 'MenCollectionPage',
        meta: { requiresAuth: true, roles: ['user', 'admin'] }
    },
      {
        path: '/boy',
        component: BoyCollectionPage,
        name: 'BoyCollectionPage',
        meta: { requiresAuth: true, roles: ['user', 'admin'] }
    },
     {
        path: '/girl',
        component: GirlCollectionPage,
        name: 'GirlCollectionPage',
        meta: { requiresAuth: true, roles: ['user', 'admin'] }
    },
   

    {
        path: '/filter',
        component: Filter,
        name: 'Filter',
        meta: { requiresAuth: true, roles: ['user', 'admin'] }
    },
    {
        path: '/kitchen',
        component: Kithchen,
        name: 'Kitchen',
        meta: { requiresAuth: true, roles: ['seller', 'admin'] }
    },
    {
        path: '/admin',
        component: Admin,
        name: 'Admin',
        meta: { requiresAuth: true, roles: ['admin','seller'] },
        children: [
            {
                path: 'home',
                component: Home,
                name: 'Home',
                meta: { requiresAuth: true, roles: ['admin','seller'] },
            },
               {
                path: '/admin/products/list',
                component: List,
                name: 'List',
                meta: { requiresAuth: true, roles: ['admin','seller'] },
            },
            {
                path: '/admin/products/create',
                component: Create,
                name: 'Create',
                meta: { requiresAuth: true, roles: ['admin','seller'] },
            },
              {
                path: '/admin/products/edit',
                component: Edit,
                name: 'Edit',
                meta: { requiresAuth: true, roles: ['admin','seller'] },
            },
               {
                path: '/admin/order/orderList',
                component: orderList,
                name: 'orderlist',
                meta: { requiresAuth: true, roles: ['admin','seller'] },
            },
             {
                path: '/admin/order/orderDetail',
                component: OrderDetail,
                name: 'orderdetail',
                meta: { requiresAuth: true, roles: ['admin'] },
            },
              {
                path: '/admin/calendar',
                component: calender,
                name: 'calendar',
              
            },
            // /admin/seller/sellerlist
               {
                path: '/admin/seller/sellerlist',
                component: Sellerlist,
                name: 'Sellerlist',
                meta: { requiresAuth: true, roles: ['admin'] },
            },
                {
                path: '/admin/seller/createsellerlist',
                component: Createsellerlist,
                name: 'Createsellerlist',
                meta: { requiresAuth: true, roles: ['admin'] },
            },
             {
                path: '/admin/customer/customer',
                component: Customer,
                name: 'Customer',
                meta: { requiresAuth: true, roles: ['admin'] },
            },
            // {
            //     path: '/admin/customer/createcustomer',
            //     component: Createcustomer,
            //     name: 'Createcustomer',
            //     meta: { requiresAuth: true, roles: ['admin'] },
            // },
              {
                path: '/admin/categorys/categorylist',
                component: Categorylist,
                name: 'categorylist',
                meta: { requiresAuth: true, roles: ['admin'] },
            },
              {
                path: '/admin/categorys/createcategory',
                component: Createcategory,
                name: 'Createcategory',
                meta: { requiresAuth: true, roles: ['admin'] },
            },
              
  
 
  
           
             
 
            // {
            //     path: '/admin/orders/list',
            //     component: List,
            //     name: 'List',
            //     meta: { requiresAuth: true, roles: ['admin'] },
            // },
        //    {
        //         path: '/admin/products/details',
        //         component: Details,
        //         name: 'Details',
        //         meta: { requiresAuth: true, roles: ['admin'] },
        //     },
            //  {
            //     path: '/admin/order/list',
            //     component: List,
            //     name: 'List',
            //     meta: { requiresAuth: true, roles: ['admin'] },
            // },
            
            {
                path: 'user',
                component: User,
                name: 'User',
                meta: { requiresAuth: true, roles: ['admin'] },
            },
            
           
          
            {
                path: 'invoice',
                component: Invoice,
                name: 'Invoice',
                meta: { requiresAuth: true, role: ['admin'] },
            },
            
        ]
    },
    {
        path: '/unauthorized',
        component: Unauthorized,
        name: 'Unauthorized'
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
        name: 'NotFound'
    }
]

// Create Router
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// Global variable to control navigation
let allowNavigation = true;

// Function to allow navigation
export const allowRouteNavigation = () => {
    allowNavigation = true;
    router.push(router.currentRoute); // Trigger navigation
};

// Function to deny navigation
export const preventRouteNavigation = () => {
    allowNavigation = false;
};

router.beforeEach((to, _from, next) => {

    const role = sessionStorage.getItem('role');

    if (!allowNavigation) {
        console.log("Navigation cancelled by route guard");
        allowNavigation = true;
        next(false);
        return;
    }
    if (to.meta.requiresAuth) {
        if (!role) {
            console.log('User not authenticated. Redirecting to login.');
            next('/');
        } else if (to.meta.roles && !to.meta.roles.includes(role)) {
            console.log(`Role '${role}' is not authorized for this route.`);
            next('/unauthorized');
        } else {
            next();
        }
    } else {
        next();
    }
});


// Create App Instance
const app = createApp(App)

// Register Font Awesome Icon Component
app.component('font-awesome-icon', FontAwesomeIcon)

// Use Router
app.use(router)

// Mount App
app.mount('#app')