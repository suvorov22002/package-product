import { DangoteMerchantData, DepartmentDelegation, GeneralParameter, Partner, PaymentFees, Souscription, Transaction, TypeOfFees, TypeOfFeesClass, UserCashInData, UserInfo, Versement } from ".."

interface RequestResponse<T>{
    codeResponse: string
    error: string
    message: string
    datas: T
}

export interface PartnerListResponse 
extends RequestResponse<Partner[]>{}

export interface TransactionListResponse 
extends RequestResponse<Transaction[]>{}

export interface SouscriptionListResponse 
extends RequestResponse<Souscription[]>{}

export interface SouscriptionResponse 
extends RequestResponse<Souscription>{}

export interface PaymentFeesListResponse
extends RequestResponse<PaymentFees[]>{}

export interface UserInfoResponse
extends RequestResponse<UserInfo[]>{}

export interface VersementResponse
extends RequestResponse<Versement[]>{}


export interface TypeOfFeesListResponse
extends RequestResponse<TypeOfFees[]>{}

export interface TypeOfFeesClassListResponse
extends RequestResponse<TypeOfFeesClass[]>{}

export interface UserCashInDataResponse
extends RequestResponse<UserCashInData[]>{}

export interface GeneralParameterListResponse
extends RequestResponse<GeneralParameter []>{}

export interface DepartmentDelegationListResponse
extends RequestResponse<DepartmentDelegation[]>{}

/**  Dangote response */

interface DangoteResponse<T>{
    reponseCode: string
    errorMessage: string
    data: T
}

export interface MerchantResponse
extends DangoteResponse<DangoteMerchantData>{}

export interface MerchantListResponse
extends DangoteResponse<DangoteMerchantData[]>{}

export interface TransactionResponse
extends DangoteResponse<Versement>{}

export interface TransactionListResponses 
extends DangoteResponse<Transaction[]>{}

export interface ReportResponses 
extends DangoteResponse<any>{}
