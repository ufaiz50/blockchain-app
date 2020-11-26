import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockchainViewerComponent } from './pages/blockchain-viewer/blockchain-viewer.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CreateTransactionComponent } from './pages/create-transaction/create-transaction.component';
import { PendingTransactionsComponent } from './pages/pending-transactions/pending-transactions.component';
import { WalletBalanceComponent } from './pages/wallet-balance/wallet-balance.component';
import { AllBlockViewerComponent } from './pages/all-block-viewer/all-block-viewer.component';
import { AllTransactionViewerComponent } from './pages/all-transaction-viewer/all-transaction-viewer.component';
import { DetailBlockViewerComponent } from './pages/detail-block-viewer/detail-block-viewer.component';
import { DetailTransactionViewerComponent } from './pages/detail-transaction-viewer/detail-transaction-viewer.component';
import { OrganizationViewerComponent } from './pages/organization-viewer/organization-viewer.component';

const routes: Routes = [
  {path: '', component: BlockchainViewerComponent },
  {path: 'settings', component: SettingsComponent},
  {path: 'new/transaction', component: CreateTransactionComponent },
  {path: 'new/transaction/pending', component: PendingTransactionsComponent },
  {path: 'wallet/:address', component: WalletBalanceComponent },
  {path: 'allblock', component: AllBlockViewerComponent},
  {path: 'alltransaction', component: AllTransactionViewerComponent},
  {path: 'detailblock/:address', component: DetailBlockViewerComponent},
  {path: 'detailtransaction/:address', component: DetailTransactionViewerComponent},
  {path: 'organization', component: OrganizationViewerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
