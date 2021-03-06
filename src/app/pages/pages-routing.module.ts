import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyNumbersComponent } from './numbers/my-numbers/my-numbers.component';
import { BuyNumberComponent } from './numbers/buy-number/buy-number.component';
import { ChatComponent } from './chat/chat.component';
import { BulkMessagingComponent } from './bulk-messaging/bulk-messaging.component';
import { BulkMessagingCampaignComponent } from './bulk-messaging/campaign/bulk-messaging-campaign/bulk-messaging-campaign.component';
import { NumberConnectorComponent } from './numbers/number-connector/number-connector.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PlansComponent } from './subscription/plans/plans.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'number/my',
      component: MyNumbersComponent,
      pathMatch: 'full'
    },
    {
      path: 'number/buy',
      component: BuyNumberComponent,
      pathMatch: 'full'
    },
    {
      path: 'number/connector',
      component: NumberConnectorComponent,
      pathMatch: 'full'
    },
    {
      path: 'chat',
      component: ChatComponent
    },
    {
      path: 'chat/:id',
      component: ChatComponent
    },
    {
      path: 'bulk_messaging',
      component: BulkMessagingComponent
    },
    {
      path: 'bulk_messaging/:id',
      pathMatch: 'full',
      component: BulkMessagingCampaignComponent
    },
    {
      path: 'bulk_messaging/:id',
      pathMatch: 'full',
      component: BulkMessagingCampaignComponent
    },
    {
      path: 'subscription',
      pathMatch: 'full',
      component: SubscriptionComponent
    },
    {
      path: 'subscription/plans',
      pathMatch: 'full',
      component: PlansComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
