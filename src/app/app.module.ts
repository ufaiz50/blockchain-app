import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule} from '@angular/fire/firestore'
import { environment } from '../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockViewComponent } from './components/block-view/block-view.component';
import { BlockchainViewerComponent } from './pages/blockchain-viewer/blockchain-viewer.component';

import { BlockchainService } from './services/blockchain.service';
import { SettingsComponent } from './pages/settings/settings.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { CreateTransactionComponent } from './pages/create-transaction/create-transaction.component';
import { PendingTransactionsComponent } from './pages/pending-transactions/pending-transactions.component';
import { WalletBalanceComponent } from './pages/wallet-balance/wallet-balance.component';
import { AllBlockViewerComponent } from './pages/all-block-viewer/all-block-viewer.component';
import { AllTransactionViewerComponent } from './pages/all-transaction-viewer/all-transaction-viewer.component';
import { DetailBlockViewerComponent } from './pages/detail-block-viewer/detail-block-viewer.component';
import { DetailTransactionViewerComponent } from './pages/detail-transaction-viewer/detail-transaction-viewer.component';
import { OrganizationViewerComponent } from './pages/organization-viewer/organization-viewer.component';
import { BlockchainModuleService } from './services/blockchain-module.service';
import { DetailOrganizationViewerComponent } from './pages/detail-organization-viewer/detail-organization-viewer.component';
import { LoginComponent } from './page/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { AlertComponent } from './page/_components/alert/alert.component';
import { HomeComponent } from './page/home/home.component';
import { RegisterComponent } from './page/register';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from './page/_helpers';
import { TryLoginComponent } from './pages/login/login.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchdataComponent } from './components/searchdata/searchdata.component';


@NgModule({
  declarations: [
    AppComponent,
    BlockViewComponent,
    BlockchainViewerComponent,
    SettingsComponent,
    TransactionsTableComponent,
    CreateTransactionComponent,
    PendingTransactionsComponent,
    WalletBalanceComponent,
    AllBlockViewerComponent,
    AllTransactionViewerComponent,
    DetailBlockViewerComponent,
    DetailTransactionViewerComponent,
    OrganizationViewerComponent,
    DetailOrganizationViewerComponent,
    LoginComponent,
    SearchComponent,
    AlertComponent,
    TryLoginComponent,

    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    SearchdataComponent
  ],
  imports: [
    BrowserModule,

    ReactiveFormsModule,
    HttpClientModule,
    
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,

    Ng2SearchPipeModule
  ],
  providers: [
    BlockchainService,
    BlockchainModuleService,
    
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
