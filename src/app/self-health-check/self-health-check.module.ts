import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfHealthCheckPageRoutingModule } from './self-health-check-routing.module';

import { SelfHealthCheckPage } from './self-health-check.page';

import { SelfHealthCheckService } from './self-health-check.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfHealthCheckPageRoutingModule
  ],
  declarations: [SelfHealthCheckPage],
  providers: [SelfHealthCheckService]
})
export class SelfHealthCheckPageModule {}
