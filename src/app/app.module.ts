import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Materials

import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSelectModule} from '@angular/material/select'
import {MatButtonModule} from '@angular/material/button'
import {MatRippleModule, MatNativeDateModule} from '@angular/material/core'
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MintransDashboardComponent } from './partners/mintrans/mintrans-dashboard/mintrans-dashboard.component';
import { MintransVersementsPageComponent } from './partners/mintrans/pages/mintrans-versements-page/mintrans-versements-page.component';
import { MintransTransactionsPageComponent } from './partners/mintrans/pages/mintrans-transactions-page/mintrans-transactions-page.component';
import { MintransSouscriptionsPageComponent } from './partners/mintrans/pages/mintrans-souscriptions-page/mintrans-souscriptions-page.component';
import { MintransValidationSouscriptionsPageComponent } from './partners/mintrans/pages/mintrans-validation-souscriptions-page/mintrans-validation-souscriptions-page.component';
import { PartnersDashboardPageComponent } from './partners/partners-dashboard-page/partners-dashboard-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewClientSubscriptionDialogComponent } from './partners/mintrans/dialogs/new-client-subscription-dialog/new-client-subscription-dialog.component';
import { CreatePartnerDialogComponent } from './partners/mintrans/dialogs/create-partner-dialog/create-partner-dialog.component';
import { EmptyOrNullNaPipe } from './shared/pipes/empty-or-null-na.pipe';
import { PendingTransactionsComponent } from './partners/mintrans/components/pending-transactions/pending-transactions.component';
import { AllTransactionsComponent } from './partners/mintrans/components/all-transactions/all-transactions.component';
import { CashInRecapDialogComponent } from './partners/mintrans/dialogs/cash-in-recap-dialog/cash-in-recap-dialog.component';
import { MoneyFormatPipe } from './shared/pipes/money-format.pipe';
import { TransactionConfirmValidationRecapDialogComponent } from './partners/mintrans/dialogs/transaction-confirm-validation-recap-dialog/transaction-confirm-validation-recap-dialog.component';
import { RemoveUnderscorePipe } from './shared/pipes/remove-underscore.pipe';
import { MintransConfigurationsPageComponent } from './partners/mintrans/pages/mintrans-configurations-page/mintrans-configurations-page.component';
import { DatePipe } from './shared/pipes/date.pipe';
import { GeneralParametersPageComponent } from './general-parameters/general-parameters-page/general-parameters-page.component';
import { MainLayoutPageComponent } from './partners/main-layout-page/main-layout-page.component';
import { EditPartnerDialogComponent } from './partners/mintrans/dialogs/edit-partner-dialog/edit-partner-dialog.component';
import { MintransReceiptDialogComponent } from './partners/mintrans/dialogs/mintrans-receipt-dialog/mintrans-receipt-dialog.component';
import { TypeOfFeesConfigComponent } from './partners/mintrans/components/type-of-fees-config/type-of-fees-config.component';
import { CreateEditTypeOfFeesDialogComponent } from './partners/mintrans/dialogs/create-edit-type-of-fees-dialog/create-edit-type-of-fees-dialog.component';
import { CreateEditPaymentFeesDialogComponent } from './partners/mintrans/dialogs/create-edit-payment-fees-dialog/create-edit-payment-fees-dialog.component';
import { PaymentFeesConfigComponent } from './partners/mintrans/components/payment-fees-config/payment-fees-config.component';
import { TypeOfFeesClassConfigComponent } from './partners/mintrans/components/type-of-fees-class-config/type-of-fees-class-config.component';
import { CreateEditTypeOfFeesClassDialogComponent } from './partners/mintrans/dialogs/create-edit-type-of-fees-class-dialog/create-edit-type-of-fees-class-dialog.component';
import { CreateEditGeneralParametersDialogComponent } from './general-parameters/dialogs/create-edit-general-parameters-dialog/create-edit-general-parameters-dialog.component';
import { CancelTransactionDialogComponent } from './partners/mintrans/dialogs/cancel-transaction-dialog/cancel-transaction-dialog.component';
import intraClient from './shared/intra-client/src/intra-client';
import { AuthService } from './shared/services/auth.service';
import { APP_PERMISSIONS } from './shared/utils/permissions';

import { DangoteAllTransactionsComponent } from './partners/dangote/components/dangote-all-transactions/dangote-all-transactions.component';
import { DangoteMyTransactionsComponent } from './partners/dangote/components/dangote-my-transactions/dangote-my-transactions.component';
import { DangotePendingTransactionsComponent } from './partners/dangote/components/dangote-pending-transactions/dangote-pending-transactions.component';
import { DangoteDashboardComponent } from './partners/dangote/dangote-dashboard/dangote-dashboard.component';
import { DangoteConfirmPayInDialogComponent } from './partners/dangote/dialogs/dangote-confirm-pay-in-dialog/dangote-confirm-pay-in-dialog.component';
import { DangotePayInRecapDialogComponent } from './partners/dangote/dialogs/dangote-pay-in-recap-dialog/dangote-pay-in-recap-dialog.component';
import { DangoteReceiptViewerDialogComponent } from './partners/dangote/dialogs/dangote-receipt-viewer-dialog/dangote-receipt-viewer-dialog.component';
import { DangoteConfigurationsPageComponent } from './partners/dangote/pages/dangote-configurations-page/dangote-configurations-page.component';
import { DangoteListMarchandsComponent } from './partners/dangote/pages/dangote-list-marchands/dangote-list-marchands.component';
import { DangoteTransactionsPageComponent } from './partners/dangote/pages/dangote-transactions-page/dangote-transactions-page.component';
import { DangoteVersementsPageComponent } from './partners/dangote/pages/dangote-versements-page/dangote-versements-page.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TrustpayAbonnementComponent } from './partners/trustpay/pages/trustpay-abonnement/trustpay-abonnement.component';
import { TrustpayAllTransactionsComponent } from './partners/trustpay/components/trustpay-all-transactions/trustpay-all-transactions.component';
import { TrustpayPendingTransactionsComponent } from './partners/trustpay/components/trustpay-pending-transactions/trustpay-pending-transactions.component';
import { TrustpayConfigurationsPageComponent } from './partners/trustpay/pages/trustpay-configurations-page/trustpay-configurations-page.component';
import { TrustpayCustomersPageComponent } from './partners/trustpay/pages/trustpay-customers-page/trustpay-customers-page.component';
import { TrustpayDashboardComponent } from './partners/trustpay/trustpay-dashboard/trustpay-dashboard.component';
import { TrustpayConfirmEnrollComponent } from './partners/trustpay/dialogs/trustpay-confirm-enroll/trustpay-confirm-enroll.component';
import { TrustpayReceiptViewerComponent } from './partners/trustpay/dialogs/trustpay-receipt-viewer/trustpay-receipt-viewer.component';
import { TrustpayVentilationTransactionsComponent } from './partners/trustpay/components/trustpay-ventilation-transactions/trustpay-ventilation-transactions.component';
import { TrustpayTransactionsPageComponent } from './partners/trustpay/pages/trustpay-transactions-page/trustpay-transactions-page.component';
import { NewMarchandEnrollComponent } from './partners/trustpay/dialogs/new-marchand-enroll/new-marchand-enroll.component';
import { NewPingDialogComponent } from './partners/trustpay/dialogs/new-ping-dialog/new-ping-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    MintransDashboardComponent,
    MintransVersementsPageComponent,
    MintransTransactionsPageComponent,
    MintransSouscriptionsPageComponent,
    MintransValidationSouscriptionsPageComponent,
    PartnersDashboardPageComponent,
    NewClientSubscriptionDialogComponent,
    CreatePartnerDialogComponent,
    EmptyOrNullNaPipe,
    PendingTransactionsComponent,
    AllTransactionsComponent,
    CashInRecapDialogComponent,
    MoneyFormatPipe,
    TransactionConfirmValidationRecapDialogComponent,
    RemoveUnderscorePipe,
 
    MintransConfigurationsPageComponent,
      DatePipe,
      GeneralParametersPageComponent,
      MainLayoutPageComponent,
      EditPartnerDialogComponent,
      MintransReceiptDialogComponent,
      TypeOfFeesConfigComponent,
      CreateEditTypeOfFeesDialogComponent,
      CreateEditPaymentFeesDialogComponent,
      PaymentFeesConfigComponent,
      TypeOfFeesClassConfigComponent,
      CreateEditTypeOfFeesClassDialogComponent,
      CreateEditGeneralParametersDialogComponent,
      CancelTransactionDialogComponent,

      DangoteDashboardComponent,
      DangoteVersementsPageComponent,
      DangoteConfigurationsPageComponent,
      DangoteTransactionsPageComponent,
      DangotePendingTransactionsComponent,
      DangotePayInRecapDialogComponent,
      DangoteAllTransactionsComponent,
      DangoteConfirmPayInDialogComponent,
      DangoteReceiptViewerDialogComponent,
      DangoteListMarchandsComponent,
      DangoteMyTransactionsComponent,
      TrustpayAbonnementComponent,
      TrustpayAllTransactionsComponent,
      TrustpayPendingTransactionsComponent,
      TrustpayConfigurationsPageComponent,
      TrustpayCustomersPageComponent,
      TrustpayDashboardComponent,
      TrustpayConfirmEnrollComponent,
      TrustpayReceiptViewerComponent,
      TrustpayVentilationTransactionsComponent,
      TrustpayTransactionsPageComponent,
      NewMarchandEnrollComponent,
      NewPingDialogComponent,
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    // Materials
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTabsModule,
    MatBadgeModule,
    MatIconModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatAutocompleteModule,
    PdfViewerModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
  /*  {
      provide: APP_INITIALIZER,
      useFactory: initializeAppCustomLogic,
      deps: [AuthService],
      multi: true,
    },*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 
}

export function initializeAppCustomLogic(
  authService: AuthService
): () => Promise<void> {
  return () =>
    new Promise((resolve) => {
      intraClient.initialize({
        moduleName: 'digital-first',
        moduleAlias: 'digital-first',
        moduleImageUrl: '/o/digital-first-0.0.0/digital-first/assets/imgs/logo.png',
        moduleImage: '',
        moduleLink: '',
        moduleInternal: true,
        permissions: APP_PERMISSIONS,
      
      }, async () => {
        const user = await intraClient.getUser()
        authService.liferayUser = user
        resolve()
      })
    });
}
