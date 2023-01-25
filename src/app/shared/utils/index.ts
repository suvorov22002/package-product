import {map, delay} from 'rxjs/operators'
import { MatSnackBar } from "@angular/material/snack-bar"
import * as moment from 'moment'


//@ts-ignore
import * as fs from 'file-saver'
import { Transaction } from '../models'

//import {jsPDF} from 'jspdf'
import { transition } from '@angular/animations'
import { Workbook } from 'exceljs'
import intraClient from '../intra-client/src/intra-client'


export let API_URL = intraClient.backendBaseUrl //"http://172.21.10.48:8060/rest/api/paypartnerservices"

export enum TaskStatus{
    Initial = "Initial",
    Pending = "Pending",
    Success = "Success",
    Failed = "Failed"
  }
  
  
  export interface TaskResult<D, E>{
    status: TaskStatus
    data: D,
    error: E
  
  }
  
  
  export class TaskResultFactory{
    private static generate<D, E>(status: TaskStatus, data: D, error: E){
      return {status, data, error}
    }
  
    static initial<D, E>(data: D, error: E){
      return this.generate(TaskStatus.Initial, data, error)
    }
    static pending<D, E>(data: D, error: E){
      return this.generate(TaskStatus.Pending, data, error)
    }
  
    static success<D, E>(data: D, error: E){
      return this.generate(TaskStatus.Success, data, error)
    }
  
    static failed<D, E>(data: D, error: E){
      return this.generate(TaskStatus.Failed, data, error)
    }
  }
  


  export const partnerCodeNamespaceMappper : {
    [key: string] : string
  } = {
    "MINTRANS" : 'mintrans',
    "DANG" : 'dangote',
    "TRUPAY": 'trustpay'
  }


  export function openSnackBar(snackbar: MatSnackBar, message: string, 
    action: string = "OK", duration: number = 3000){
    snackbar.open(message, action).afterOpened().pipe(
      delay(duration),
      map( _ => snackbar.dismiss())
    ).subscribe()
  }

  export function isEmpty(data: any[]){
    return data.length == 0
  }

  export function getDate(date: Date){
    return moment(date).format().split('T')[0]
  }

  export function getDateToString(date: Date){
    return moment(date).format('DDMMYYYY')
  }

  export function errorStatutResolver(message: string){
    return message.split(':')[1]
  }

  export function downloadAsPdf(data: string, title: string, inBinary = true){
    const url = "data:application/pdf;base64," + (inBinary ? window.atob(data) : data)  
    fetch(url)
        .then(res => res.blob())
        .then(res => fs.saveAs(res, `${title}.pdf`))
  }

  export const errorStatusToMessageMapper: {[key: string]: string} = {
    "AUCUNE_CAISSE_OUVERTE": "Votre caisse n'est pas ouverte.",
    "ELEMENT_ALREADY_EXIST": "L'élément existe déjà !",
    "EMPTY_LIST": "Aucune transaction n'a encore été postée."
  }


  function drawPdfText(doc: any, xStart: number, screenWidth: number, y: number, title: string, value: string ){
    doc.setFontSize(10)
    doc.setFont('courier', 'normal', 'bold')
    doc.text(`${title}`, xStart, y)
    doc.setFont('courier', 'normal', 'normal')
    doc.text(`${value}`, xStart, y+4)
  }


  /* export async function createMintransReceipt(data: Transaction, agence: string){

    const today = new Date().toLocaleString()
    const xStart = 4
    //@ts-ignore
    const doc : any = new jsPDF('p', 'px', 'a5')
    
    const width = doc.canvas.width
    doc.setFontSize(10)
    doc.setFont('courier', 'normal', 'bold')
    doc.text("Edité le: " + today, width / 2 + width / 3, 6)

    doc.setFontSize(16)

    const imageBase64 = window.URL.createObjectURL(
      await fetch('../../assets/imgs/Logo_Afriland.png')
    .then(res => res.blob())
    )

    doc.addImage(imageBase64, 'png', xStart, 5, 35, 8, undefined, undefined);

    var centeredText = function(text: any, y: any) {
      var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
      doc.text(textOffset, y, text);
    }

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal', 'bold')
    centeredText("Reçu MINTRANSPORT".toUpperCase(), 30);
    centeredText((data.reason ?? "").toUpperCase(), 35);
    doc.setFont('helvetica', 'normal', 'normal')

    drawPdfText(doc, xStart + 10, width, 48, 'Agence', agence!)
    drawPdfText(doc, xStart + 120, width, 48, 'Caissière', data.userCaisse!)

    drawPdfText(doc, xStart + 10, width, 60, "Noms & Prénoms de l'usager", data.nomOperator!)
    drawPdfText(doc, xStart + 120, width, 60, 'Montant', data.amount!.toString()+ ' XAF')

    drawPdfText(doc, xStart + 10, width, 72, 'N° Contribuable / NUI', data.referenceOperator!)
    drawPdfText(doc, xStart + 120, width, 72, 'Devise', 'XAF')
    
    drawPdfText(doc, xStart + 10, width, 84, 'N° de reference', data.referenceBill ?? "N/A")
    drawPdfText(doc, xStart + 120, width, 84, 'Adresse', data.adresseOperator!)

    drawPdfText(doc, xStart + 10, width, 96, "Profession / Secteur d'activité", data.activity!)
    
    doc.rect(10, 116, 40, 22)
    doc.rect(82, 116, 40, 22)

    doc.setFont('courier', 'normal', 'bold')
    doc.text("Client", 10, 114)
    doc.text("Guichet", 67 + (xStart + width / 4 + 60) / 4 - 10, 114)

    const docName = `RECU__${data.ageCaisse}_${data.referenceOperator}_${getDate(new Date())}.pdf`
    doc.save(docName)
  } */


  export function generateExcelFile(
    data: any[],
    titles: string[],
    fields: string[],
    filename: string
  ){
    const worksheetName = filename

    const values: any[] = [...data].reduce((acc, it)=> {
      let item: any  = {}
      fields.forEach(e => item[e] = it[e])
      //@ts-ignore
      acc.push(Object.values(item));
      return acc;
      }, [])
    let workbook = new Workbook()
    let worksheet = workbook.addWorksheet(worksheetName);
    worksheet.addRow(titles)
    values.forEach(i => {
      worksheet.addRow(i)
    })

    //@ts-ignore
    workbook.xlsx.writeBuffer().then((buffer) => {
      let blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, `${filename}.xlsx`);
    })
  }