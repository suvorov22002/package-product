import { OperatorStatus, TransactionStatus, TransportType } from "./enums"

export interface ModalInfo<T>{
  data: T,
  callback: (data?: T) => void
}

export interface Partner{
    id?: string | null
    partcode?: string | null,
    partname?: string | null,
    account?: string | null,
    phones?: string | null,
    emails?: string | null,
    sizeKey?: number | null,
    typekey?: string | null,
    pwd?: string | null,
    actif?: boolean | null,
    kycPartner?: boolean | null,
    comptabilisationTransit?: boolean | null,
    utiCreation?: string | null,
    nameUtiCreation?: string | null,
    utiMod?: string | null,
    nameUtiMod?: string | null,
    host?: string | null,
    port?: number,
    protocole?: string | null,
    path?: string | null,
    apiKey?: string | null,
    partnerNcpVersement?: string | null,
   
}


export interface Transaction{
  id: string | null,
  reference: string | null,
  referenceBill: string | null,
  referenceOperator: string | null,
  statusTrans: TransactionStatus | null,
  transactionMode: string | null,
  typeOperation: string | null,
  amount: number | null,
  accountDebit: string | null,
  idOperator?: string | null,
  cancelReason: string | null,
  usercancel: string | null,
  nomOperator: string | null,
  userCaisse: string | null,
  ageCaisse: string | null,
  accountCredit: string | null,
  referencenumber: string | null,
  segment: string | null,
  typeJustificatif: string | null,
  activity: string | null,
  adresseOperator: string | null,
  divisionAdministratif: string | null,
  categorieJustificatif: string | null,
  eveid: string | null,
  usermail: string | null,
  validfrom: number | string | null,
  validto: number | null,
  partieVersante: string | null,
  telephone: string | null,
  partnerCode: string | null,
  reason: string | null,
  details: string | null,
  dco: number | null,
  amountReceived: number | null,
  errorsMsg: string | null,
  exceptionlib: string | null,
  exceptionCode: string | null,
  libelleAgence: string 
  reportdata: string | null
  userConfirmation: string | null
  dateConfirmation: string | null
  codeReason: string | null
  idMarchand: string | null
  nomMarchand: string | null
}

export interface Versement extends Transaction {
 
}

export interface CreateSouscription{
  codeClient?: string,
  clientName?: string,
  customerNamePartner?: string,
  customerCniPartner?: string,
  customerNiuPartner?: string,
  emails?: string,
  agenceSous?: string,
  partnerCode?: string,
  partnerName?: string,
  utiunitiate?: string,
  operatorStatus: OperatorStatus,
}

export interface Souscription{
      id?: string,
      code?: string,
      codeClient?: string,
      clientName?: string,
      cni?: string,
      libelleAgenceSous?: string,
      customerReferencePartner?: string,
      customerNamePartner?: string,
      customerCniPartner?: string,
      customerNiuPartner?: string,
      emails?: string,
      agenceSous?: string,
      partnerCode?: string,
      partnerName?: string,
      customerAddress?: string,
      customerRegion?: string,
      customerCountry?: string,
      valid?: boolean,
      utiunitiate?: string,
      utivalidate?: string,
      datevalidate?: number,
      operatorStatus?: OperatorStatus,
      uticancel?: string,
      datecancel?: number,
      validTo?: number,
      validfrom?: number,
      phones: string,
      accounts: string,
      txtPhones: string[],
      txtAccounts: string[],
      errorsMsg?: string,
      bordereauSouscription?: string,
      nameUtiunitiate?: string,
      
    
}


export interface PaymentFees{
  id?: string
  code?: string
  actif?: boolean
  libelle?: string
  categorie?: string
  partnerCode?: string
  amount?: number
  typeForfait?: string
  validfrom?: number
  validTo?: number
}

export interface UserInfo{
  matricule?: string,
  accountNo?: string,
  accountName?: string,
  customerName?: string,
  sexe?: "M" | "F",
  adresse?: string,
  dataNaissance?: string,
  lieuNaissance?: string,
  departNaissance?: string,
  situation?: string,
  typePiece?: string,
  numCNI?: string,
  niu?: string,
  dateDelivrance?: string,
  lieuDelivrance?: string,
  dateExpiration?: string,
  ville?: string,
  codeGestionnaire?: string,
  loginGestionnaire?: string,
  comptes?: string [],
  telephones?:string [],
  adresseMails?:string []
}

export interface TypeOfFees{
  id: string,
  code: string,
  libelle: string,
  segment: TransportType,
  partnerCode: string
  actif: boolean
}

export interface TypeOfFeesClass extends TypeOfFees{
  id: string,
  code: string,
  libelle: string,
  typeForfait: string,
  partnerCode: string
}

/**
 * Model de l'utilisateur que l'on rappel via le NIU/N° de contribuable
 */
export interface UserCashInData{
  partnerCode: string,
  referenceOperator: string,
  nomOperator: string,
  segment: TransportType,
  typeJustificatif: string,
  categorieJustificatif: string,
  divisionAdministratif: string,
  activity: string,
  adresseOperator: string
}


export interface GeneralParameter{
  id: string,
  code?: string,
  value?: string,
  description?: string
}

export interface DepartmentDelegation{
  id: number,
  code: string,
  codeCategorie: string,
  categorie: string,
  libelle: string
}

/* Dangote model */

export interface DangoteMerchantData{
  id: number,
  merchandName: string,
  customerAddress: string,
  customerRegion: string,
  customerCountry: string,
  divisionAdministratif: string,
  valid: boolean
}