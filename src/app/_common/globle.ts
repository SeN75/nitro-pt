export const sideMenu = [
  { name: "SUBSCRIBERS.subscribers", img: "customer.svg", activeImg: "customer_active.svg", path: "/dashboard/subscribers" },
  { name: "ORDERS.orders", img: "orders.svg", activeImg: "orders_active.svg", path: "/dashboard/orders", root: 'orders' },
  { name: "CATEGORIES.categories", img: "protein.svg", activeImg: "protein_active.svg", path: "/dashboard/categories", root: 'categories' },
  { name: "PACKAGES.packages", img: "subscription.svg", activeImg: "subscription_active.svg", path: "/dashboard/packages", root: 'packages' },
  { name: "DIETPLAN.dietplan", img: "Color.svg", activeImg: "colorires_active.svg", path: "/dashboard/diet", root: 'diet' },
  { name: "WORKSOUT.worksout", img: "workout.svg", activeImg: "workout_active.svg", path: "/dashboard/worksout", root: 'worksout' },
  { name: "SETTINGS.account-settings", img: "settings.svg", activeImg: "settings_active.svg", path: "/dashboard/account-settings", root: 'account-settings' },
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

export const categoriesWithcompounds = [
  { catType: 'protein', categories: categories },
  { catType: 'fat', categories: categories },
  { catType: 'carp', categories: categories },
]


export const measuring_units = ['gram', 'cup']

export const packages = [

  {
    "name": "student package",
    "name_ar": "باقة الطلاب",
    "description": "student package",
    "description_ar": "باقة الطلاب",
    "period": 10,
    "price": "1440.00",
    "iban_id": "5e4b3655-9de3-4085-be5e-6de910fa9e1d",
    "attach_required": true,
    "attachments_ids": [4, 2]
  },
  {
    "name": "student package",
    "name_ar": "باقة التضخيم",
    "description": "student package",
    "description_ar": "باقة التضخيم",
    "period": 10,
    "price": "1440.00",
    "iban_id": "5e4b3655-9de3-4085-be5e-6de910fa9e1d",
    "attach_required": true,
    "attachments_ids": [4, 2]
  }
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

export const subscribers = [

  {
    subStartDate: "2021/1/1",
    subEndDate: "2021/1/1",
    subAmount: "1500",
    subStatus: "newly",
    subNo: "#100213",
    personalData: {
      name: "محمد شلبي",
      number: "0551594683",
      birthday: "2020-02-21",
      socialStatus: "اعزب",
      gender: "ذكر",
      height: "180",
      weight: "80",
      city: "jeddah"
    },
    subscriber: {
      workType: "مكتبي",
      healthProblem: "لا يوجد",
      useSupplements: "لا",
      goalOfProgeam: "تضخيم",
      sleepingHoures: "8",
      wakeupTime: "8:00",
      bedTime: "23:00",
      numberOfmeals: "5",
      currentProgram: "برنامج كيتو يومي",
      nonPrefrredFood: "سلمون و تونا ",
      allergenicFood: "الفستق و اللوز",
      recentOperations: "استئصال الزائده",
    },
    bodyMeasurements: {
      upperChest: 0,
      lowerChest: 0,
      hips: 0,
      abs: 0,
      quadriceps: 0,
      hamstrings: 0,
      calves: 0,
      biceps: 0,
      weight: 85
    },
    ditePlan: {
      planName: ''
    },
    archives: [
      {
        recordDate: "2020/1/4",
        personalData: {
          name: "محمد شلبي",
          number: "0551594683",
          birthday: "2020-02-21",
          socialStatus: "اعزب",
          gender: "ذكر",
          height: "180",
          weight: "80",
          city: "jeddah"
        },
        subscriber: {
          workType: "مكتبي",
          healthProblem: "لا يوجد",
          useSupplements: "لا",
          goalOfProgeam: "تضخيم",
          sleepingHoures: "8",
          wakeupTime: "8:00",
          bedTime: "23:00",
          numberOfmeals: "5",
          currentProgram: "برنامج كيتو يومي",
          nonPrefrredFood: "سلمون و تونا ",
          allergenicFood: "الفستق و اللوز",
          recentOperations: "استئصال الزائده",
        },
        bodyMeasurements: {
          upperChest: 0,
          lowerChest: 0,
          hips: 0,
          abs: 0,
          quadriceps: 0,
          hamstrings: 0,
          calves: 0,
          biceps: 0,
          weight: 85
        },
        ditePlan: {
          planName: ''
        },
        bodyPic: {
          front: '../../../../../assets/images/noImage.png',
          back: '../../../../../assets/images/noImage.png',
          right: '../../../../../assets/images/noImage.png',
          left: '../../../../../assets/images/noImage.png'
        },
      }
    ]
  },
  {
    subStartDate: "2021/1/1",
    subEndDate: "2021/1/1",
    subAmount: "1500",
    subStatus: "active",
    subNo: "#100606",
    personalData: {
      name: "بشر يغمور",
      number: "0551594683",
      birthday: "2020-02-21",
      socialStatus: "اعزب",
      gender: "ذكر",
      height: "180",
      weight: "80",
      city: "jeddah"
    },
    subscriber: {
      workType: "مكتبي",
      healthProblem: "لا يوجد",
      useSupplements: "لا",
      goalOfProgeam: "تضخيم",
      sleepingHoures: "8",
      wakeupTime: "8:00",
      bedTime: "23:00",
      numberOfmeals: "5",
      currentProgram: "برنامج كيتو يومي",
      nonPrefrredFood: "سلمون و تونا ",
      allergenicFood: "الفستق و اللوز",
      recentOperations: "استئصال الزائده",
    },
    bodyMeasurements: {
      upperChest: 0,
      lowerChest: 0,
      hips: 0,
      abs: 0,
      quadriceps: 0,
      hamstrings: 0,
      calves: 0,
      biceps: 0,
      weight: 85
    },
    ditePlan: {
      planName: ''
    },
    archives: [
      {
        recordDate: "2020/1/4",
        personalData: {
          name: "محمد شلبي",
          number: "0551594683",
          birthday: "2020-02-21",
          socialStatus: "اعزب",
          gender: "ذكر",
          height: "180",
          weight: "80",
          city: "jeddah"
        },
        subscriber: {
          workType: "مكتبي",
          healthProblem: "لا يوجد",
          useSupplements: "لا",
          goalOfProgeam: "تضخيم",
          sleepingHoures: "8",
          wakeupTime: "8:00",
          bedTime: "23:00",
          numberOfmeals: "5",
          currentProgram: "برنامج كيتو يومي",
          nonPrefrredFood: "سلمون و تونا ",
          allergenicFood: "الفستق و اللوز",
          recentOperations: "استئصال الزائده",
        },
        bodyMeasurements: {
          upperChest: 0,
          lowerChest: 0,
          hips: 0,
          abs: 0,
          quadriceps: 0,
          hamstrings: 0,
          calves: 0,
          biceps: 0,
          weight: 85
        },
        ditePlan: {
          planName: ''
        },
        bodyPic: {
          front: '../../../../../assets/images/noImage.png',
          back: '../../../../../assets/images/noImage.png',
          right: '../../../../../assets/images/noImage.png',
          left: '../../../../../assets/images/noImage.png'
        },
      },
      {
        recordDate: "2020/1/4",
        personalData: {
          name: "محمد شلبي",
          number: "0551594683",
          birthday: "2020-02-21",
          socialStatus: "اعزب",
          gender: "ذكر",
          height: "180",
          weight: "80",
          city: "jeddah"
        },
        subscriber: {
          workType: "مكتبي",
          healthProblem: "لا يوجد",
          useSupplements: "لا",
          goalOfProgeam: "تضخيم",
          sleepingHoures: "8",
          wakeupTime: "8:00",
          bedTime: "23:00",
          numberOfmeals: "5",
          currentProgram: "برنامج كيتو يومي",
          nonPrefrredFood: "سلمون و تونا ",
          allergenicFood: "الفستق و اللوز",
          recentOperations: "استئصال الزائده",
        },
        bodyMeasurements: {
          upperChest: 0,
          lowerChest: 0,
          hips: 0,
          abs: 0,
          quadriceps: 0,
          hamstrings: 0,
          calves: 0,
          biceps: 0,
          weight: 85
        },
        ditePlan: {
          planName: ''
        },
        bodyPic: {
          front: '../../../../../assets/images/noImage.png',
          back: '../../../../../assets/images/noImage.png',
          right: '../../../../../assets/images/noImage.png',
          left: '../../../../../assets/images/noImage.png'
        },
      }
    ]
  },
  {
    subStartDate: "2021/1/1",
    subEndDate: "2021/1/1",
    subAmount: "1500",
    subStatus: "expired",
    subNo: "#100793",
    personalData: {
      name: "صالح",
      number: "0551594683",
      birthday: "2020-02-21",
      socialStatus: "اعزب",
      gender: "ذكر",
      height: "180",
      weight: "80",
      city: "jeddah"
    },
    subscriber: {
      workType: "مكتبي",
      healthProblem: "لا يوجد",
      useSupplements: "لا",
      goalOfProgeam: "تضخيم",
      sleepingHoures: "8",
      wakeupTime: "8:00",
      bedTime: "23:00",
      numberOfmeals: "5",
      currentProgram: "برنامج كيتو يومي",
      nonPrefrredFood: "سلمون و تونا ",
      allergenicFood: "الفستق و اللوز",
      recentOperations: "استئصال الزائده",
    },
    bodyMeasurements: {
      upperChest: 0,
      lowerChest: 0,
      hips: 0,
      abs: 0,
      quadriceps: 0,
      hamstrings: 0,
      calves: 0,
      biceps: 0,
      weight: 85
    },
    ditePlan: {
      planName: ''
    },
    archives: [
    ]
  },
  {
    subStartDate: "2021/1/1",
    subEndDate: "2021/1/1",
    subAmount: "1000",
    subStatus: "need-update",
    subNo: "#100201",
    personalData: {
      name: "فهد",
      number: "0551594683",
      birthday: "2020-02-21",
      socialStatus: "اعزب",
      gender: "ذكر",
      height: "180",
      weight: "80",
      city: "jeddah"
    },
    subscriber: {
      workType: "مكتبي",
      healthProblem: "لا يوجد",
      useSupplements: "لا",
      goalOfProgeam: "تضخيم",
      sleepingHoures: "8",
      wakeupTime: "8:00",
      bedTime: "23:00",
      numberOfmeals: "5",
      currentProgram: "برنامج كيتو يومي",
      nonPrefrredFood: "سلمون و تونا ",
      allergenicFood: "الفستق و اللوز",
      recentOperations: "استئصال الزائده",
    },
    bodyMeasurements: {
      upperChest: 0,
      lowerChest: 0,
      hips: 0,
      abs: 0,
      quadriceps: 0,
      hamstrings: 0,
      calves: 0,
      biceps: 0,
      weight: 85
    },
    ditePlan: {
      planName: ''
    },
    archives: [
    ]
  }
]


export const newOrders = [
  { orderNo: 1, name: "Customer", orderType: "new sub", orderStatus: "tt", orderDate: '2021-02-21' },
  { orderNo: 2, name: "Customer", orderType: "new sub", orderStatus: "tt", orderDate: '2021-02-21' },
  { orderNo: 3, name: "Customer", orderType: "new sub", orderStatus: "tt", orderDate: '2021-02-21' },
  { orderNo: 4, name: "Customer", orderType: "new sub", orderStatus: "tt", orderDate: '2021-02-21' },
  { orderNo: 5, name: "Customer", orderType: "new sub", orderStatus: "tt", orderDate: '2021-02-21' },
]
export const completedOrders = [
  { orderNo: 1, name: "Customer", orderType: "new sub", orderStatus: "tt", orderDate: '2021-02-21' },
  { orderNo: 2, name: "Customer", orderType: "new sub", orderStatus: "tt", orderDate: '2021-02-21' },
  { orderNo: 3, name: "Customer", orderType: "new sub", orderStatus: "tt", orderDate: '2021-02-21' },
  { orderNo: 4, name: "Customer", orderType: "new sub", orderStatus: "tt", orderDate: '2021-02-21' },
  { orderNo: 5, name: "Customer", orderType: "new sub", orderStatus: "tt", orderDate: '2021-02-21' },
]
