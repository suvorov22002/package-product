export interface CreatePartnerReq{
    partcode: string
    partname: string
    account: string
    phones: string
    emails: string
    partnerNcpVersement: string
    utiCreation: string
    nameUtiCreation: string
}

export interface CancelTransaction{
  id: string,
  partnerCode: string,
  usercancel: string,
  cancelReason: string
}