import { api } from "./index";
import { IUser } from "@/store/slices/auth";

export type RegisterUser = {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  address: string;
  password: string;
  userType: string;
};

export type Res = {
  farmer_name: string;
  farmer_surname: string;
  farmer_email: string;
  phone_number: string;
  gov_id: string;
  farm_location: string;
  farm_name: string;
  password: string;
  crops: null;
  profile_image: null;
  farmer_id: number;
};

export type Res2 = {
  buyer_name: string;
  buyer_surname: string;
  email: string;
  phone_number: string;
  address: string;
  password: string;
  buyer_id: number;
};

export type Res3 = {
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJudXJ6aGFuOS56aGFraWFAZ21haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwiaWF0IjoxNzMzMTA2NDU4LCJleHAiOjE3MzMxMTAwNTh9.pcJJi4XJjy8qu7o4LakyaKEwz_9wWmxdRubv2Qb5u38";
  id: number;
  role: string;
  user: {
    buyer_id: number;
    buyer_name: string;
    buyer_surname: string;
    email: string;
    phone_number: string;
    address: string;
    password: string;
  };
};

export type Res4 = {
  accessToken: string;
  id: number;
  role: string;
  user: {
    farmer_id: number;
    farmer_name: string;
    farmer_surname: string;
    farmer_email: string;
    phone_number: string;
    gov_id: string;
    crops: null;
    profile_image: null;
    farm_location: string;
    farm_name: string;
    password: string;
  };
};

export type LoginUser = Pick<IUser, "email"> & {
  password: string;
};

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<IUser, RegisterUser>({
      query: (body) => ({
        url: `auth/register/`,
        method: "POST",
        body,
      }),
      transformResponse: (res: any) => {
        if (res.farmer_name) {
          const r: IUser = {
            name: res.farmer_name,
            surname: res.farmer_surname,
            email: res.farmer_email,
            userType: "farmer",
            phone: res.phone_number,
            token: "",
            id: res.farmer_id,
            govId: res.gov_id,
            farmName: res.farm_name,
            farmLocation: res.farm_location,
            avatar: res.profile_image,
          };
          return r;
        } else {
          const r: IUser = {
            name: res.buyer_name,
            surname: res.buyer_surname,
            email: res.email,
            userType: "buyer",
            phone: res.phone_number,
            token: "",
            id: res.buyer_id,
            govId: "",
            farmName: "",
            farmLocation: "",
            avatar: "",
          };
          return r;
        }
      },
    }),
    login: build.mutation<IUser, LoginUser>({
      query: (body) => ({
        url: "auth/login/",
        method: "POST",
        body,
      }),
      transformResponse: (res: any) => {
        if (res.farmer_name) {
          const r: IUser = {
            name: res.user.farmer_name,
            surname: res.user.farmer_surname,
            email: res.user.farmer_email,
            userType: "farmer",
            phone: res.user.phone_number,
            token: "",
            id: res.user.farmer_id,
            govId: res.user.gov_id,
            farmName: res.user.farm_name,
            farmLocation: res.user.farm_location,
            avatar: res.user.profile_image,
          };
          return r;
        } else {
          const r: IUser = {
            name: res.user.buyer_name,
            surname: res.user.buyer_surname,
            email: res.user.email,
            userType: "buyer",
            phone: res.user.phone_number,
            token: "",
            id: res.user.buyer_id,
            govId: "",
            farmName: "",
            farmLocation: "",
            avatar: "",
          };
          return r;
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useRegisterMutation } = authApi;
