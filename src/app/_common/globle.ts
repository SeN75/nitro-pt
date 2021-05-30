export const sideMenu = [
    { name: "SETTINGS.nitro", img: "customer.svg", activeImg: "workout.svg", path: "..." },
    { name: "SUBSCRIBERS.subscribers", img: "customer.svg", activeImg: "workout.svg", path: "/dashboard/subscribers" },
    { name: "ORDERS.orders", img: "orders.svg", path: "/dashboard/orders" },
    { name: "CATEGORIES.categories", img: "protein.svg", path: "/dashboard/categories" },
    { name: "PACKAGES.packages", img: "subscription.svg", path: "/dashboard/packages" },
    { name: "DIETPLAN.dietplan", img: "settings.svg", path: "/dashboard/diet" },
    { name: "WORKSOUT.worksout", img: "workout.svg", path: "/dashboard/worksout" },
    { name: "SETTINGS.account-settings", img: "settings.svg", path: "/dashboard/settings" },
]



export const categories = [
    {
        title: "دجاج", type: "gram", unit: 1, compounds: [
            { title: "calories" },
            { title: "protein" },
            { title: "carp" },
            { title: "fat" },
        ]
    },
    {
        title: "دجاج", type: "gram", unit: 1, compounds: [
            { title: "calories" },
            { title: "protein" },
            { title: "carp" },
            { title: "fat" },
        ]
    }
]


export const packages = [
    { title: 'باقة الصيف', month: 6, price: 2000, accountNumber: "000000000", haveAttach: false, showOnWebsite: false, theme: 1, haveButton: false, },
    { title: 'باقة الطلاب', month: 6, price: 2000, accountNumber: "000000000", haveAttach: false, showOnWebsite: false, theme: 2, haveButton: false },
    { title: 'باقة التضخيم', month: 6, price: 2000, accountNumber: "000000000", haveAttach: false, showOnWebsite: false, theme: 3, haveButton: false },
    { title: 'باقة التضخيم', month: 6, price: 2000, accountNumber: "000000000", haveAttach: false, showOnWebsite: false, theme: 3, haveButton: false },
]

export const workout = [
    {
        type: 'workout name', exercises: [
            { name: 'exercies', link: 'http://localhost:4200/dashboard/worksout' },
            { name: 'exercies', link: 'http://localhost:4200/dashboard/worksout' },
        ]
    },
    {
        type: 'workout name', exercises: [
            { name: 'exercies', link: 'http://localhost:4200/dashboard/worksout' },
            { name: 'exercies', link: 'http://localhost:4200/dashboard/worksout' },
        ]
    },
]