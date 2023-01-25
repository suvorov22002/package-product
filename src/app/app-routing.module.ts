import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from './shared/guards/permissions.guard';
import { GeneralParametersPageComponent } from './general-parameters/general-parameters-page/general-parameters-page.component';
import { DangoteDashboardComponent } from './partners/dangote/dangote-dashboard/dangote-dashboard.component';
import { DangotePartnerOnlyGuard } from './partners/dangote/guards/dangote-partner-only.guard';
import { DangoteListMarchandsComponent } from './partners/dangote/pages/dangote-list-marchands/dangote-list-marchands.component';
import { DangoteTransactionsPageComponent } from './partners/dangote/pages/dangote-transactions-page/dangote-transactions-page.component';
import { DangoteVersementsPageComponent } from './partners/dangote/pages/dangote-versements-page/dangote-versements-page.component';
import { MainLayoutPageComponent } from './partners/main-layout-page/main-layout-page.component';
import { MintransPartnerOnlyGuard } from './partners/mintrans/guards/mintrans-partner-only.guard';
import { MintransDashboardComponent } from './partners/mintrans/mintrans-dashboard/mintrans-dashboard.component';
import { MintransConfigurationsPageComponent } from './partners/mintrans/pages/mintrans-configurations-page/mintrans-configurations-page.component';
import { MintransSouscriptionsPageComponent } from './partners/mintrans/pages/mintrans-souscriptions-page/mintrans-souscriptions-page.component';
import { MintransTransactionsPageComponent } from './partners/mintrans/pages/mintrans-transactions-page/mintrans-transactions-page.component';
import { MintransVersementsPageComponent } from './partners/mintrans/pages/mintrans-versements-page/mintrans-versements-page.component';
import { PartnersDashboardPageComponent } from './partners/partners-dashboard-page/partners-dashboard-page.component';
import { TrustpayAbonnementComponent } from './partners/trustpay/pages/trustpay-abonnement/trustpay-abonnement.component';
import { TrustpayDashboardComponent } from './partners/trustpay/trustpay-dashboard/trustpay-dashboard.component';
import { TrustpayTransactionsPageComponent } from './partners/trustpay/pages/trustpay-transactions-page/trustpay-transactions-page.component';
import { TrustpayPartnerOnlyGuard } from './partners/trustpay/guards/trustpay-partner-only.guard';

const routes: Routes = [
  {
    path: '', component: MainLayoutPageComponent,/* canActivate: [PermissionsGuard],*/  children: [
      /* {
        path: '', pathMatch: 'full', redirectTo: '/partners-dashboard'
      }, */
      {
        path: 'partners-dashboard', component: PartnersDashboardPageComponent
      },
      {
        path: 'general-parameters', component: GeneralParametersPageComponent
      },
    ]
  },
  
  {
    path: 'mintrans-dashboard', component: MintransDashboardComponent,/* canActivate: [MintransPartnerOnlyGuard],*/ children: [
      {
        path: '', pathMatch: 'full', redirectTo: '/mintrans-dashboard/versements'
      },
      {
        path: 'transactions', component: MintransTransactionsPageComponent
      },
      {
        path: 'versements', component: MintransVersementsPageComponent
      },
      {
        path: 'souscriptions', component: MintransSouscriptionsPageComponent
      },
      {
        path: 'configurations', component: MintransConfigurationsPageComponent
      },
      
    ]
  },

  {
    path: 'dangote-dashboard', component: DangoteDashboardComponent, /*canActivate: [DangotePartnerOnlyGuard],*/ children: [
      {
        path: '', pathMatch: 'full', redirectTo: '/dangote-dashboard/versements'
      },
      {
        path: 'transactions', component: DangoteTransactionsPageComponent
      },
      {
        path: 'versements', component: DangoteVersementsPageComponent
      },
      {
        path: 'marchands', component: DangoteListMarchandsComponent
      }
    ]
  },

  {
    path: 'trustpay-dashboard', component: TrustpayDashboardComponent, /*canActivate: [TrustpayPartnerOnlyGuard],*/ children: [
      {
        path: '', pathMatch: 'full', redirectTo: '/trustpay-dashboard/souscription'
      },
      {
        path: 'transactions', component: TrustpayTransactionsPageComponent
      },
      {
        path: 'souscription', component: TrustpayAbonnementComponent
      },
      {
        path: 'marchands', component: TrustpayAbonnementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
