export interface Subscription {
  city?: number,
  birthday_Hiri?: string,
  birthday_Gregorian?: string,
  height?: number,
  weight?: number,
  nature_of_daily_stress?: string,
  health_problems?: string,
  supplement_use?: string,
  goal?: string,
  sleep_hours?: string,
  wakeup_time?: string,
  bed_time?: string,
  number_of_meals?: number,
  current_diet_program?: string,
  unfavorable_food?: string,
  chest_circumrefence?: number,
  lower_chest?: number,
  waist?: number,
  belly?: number,
  buttocks?: number,
  thigh?: number,
  calf?: number,
  humerus?: number,
  front_image?: File,
  back_image?: File,
  right_image?: File,
  left_image?: File,
  inbody_attachment?: File,
  payment_invoice?: File,
  package_id?: string,
  social_status?: number,
  method_measurement?: number,
  gender?: number,
  other_attachment?: File,
  Allergens_food?: string,
  surgeries_history?: string,
  is_approved?: boolean,
  request_id?: string,
}


export interface PersonalDetails {
  birthday_Gregorian: string,
  birthday_Hiri: string,
  city: number,
  gender: string,
  height: number,
  name: string,
  phone_number: string
  social_status: string,
  weight: number
}

export interface HealthInfo {
  Allergens_food: string,
  bed_time: string,
  current_diet_program: string,
  goal: string,
  health_problems: string,
  nature_of_daily_stress: string,
  number_of_meals: number
  sleep_hours: number
  supplement_use: string
  surgeries_history: string
  unfavorable_food: string
  wakeup_time: string
}

export interface FinanceInfo {
  account_owner: string,
  bank: string,
  iban: string,
  package: string,
  price: number
}

export interface RequestInfo {
  created_date: string,
  request_id: number,
  request_type: string,
  status: string,
}

export interface MediaInfo {
  back_image: string,
  front_image: string,
  inbody_attachment: string,
  left_image: string,
  other_attachment: string,
  right_image: string
}

export interface BodyInfo {
  belly: number,
  buttocks: number,
  calf: number,
  chest_circumrefence: number,
  humerus: number,
  lower_chest: number,
  method_measurement?: string,
  weight: number,
  thigh: number,
  waist: number,
}
export interface RequestDetails {
  health_info: HealthInfo,
  finance_info: FinanceInfo,
  request_info: RequestInfo,
  media: MediaInfo,
  personal_info: PersonalDetails,
  body_info: BodyInfo
}
export interface SubscrioptionDetails {
  health_info: HealthInfo,
  finance_info: FinanceInfo,
  subscription_info: SubscriptionInfo,
  media: MediaInfo,
  personal_info: PersonalDetails,
  body_info: BodyInfo
}

export interface SubscriptionInfo {
  date_from: string,
  date_to: string,
  price: number,
  status: string,
  subscription_id: string
}

export interface Package {
  account_owner_name?: string,
  attach_required?: boolean,
  bank_account_id: string,
  bank_name?: string,
  bank_name_ar?: string,
  description: string,
  description_ar: string,
  external_id: string,
  iban: string,
  name: string,
  name_ar: string,
  period: number,
  price: number,
  required_attachments: PackageAttachment[]
}
export interface PackageAttachment {
  attach_name: string,
  attach_name_ar: string,
  id: number,

}


export interface CategoryFood {
  name: string,
  name_ar: string,
  id: number,
  pos?: number,
  total_items?: number
}


export interface MemberProfile {
  prfile: {
    username: string,
    full_name: string,
    mobile: string,
    email: string
  },
  subscription: {
    id: string,
    client: string,
    start_date: string,
    end_date: string,
    price: number,
    status: string
  },
  new_request: {},
  closed_requests: ClosedRequest[]
}


export interface ClosedRequest {
  id: string,
  client: string,
  type: string,
  created_date: string,
  status: string
}


export interface ResetPassword {
  uid: string,
  token: string,
  new_password: string,
  phone_number?: string,
  re_new_password: string
}

type Status = 'Error' | 'Success' | 'Wait' | 'Warning' | 'Failed'
export interface MessageRespones {
  status: Status;
  message: any,
  method: string
}
