import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from 'src/app/components/card/card.component';
import { LazyImgDirective } from 'src/app/shared/directives/lazy-img.directive';
import { ElapsedTimePipe } from 'src/app/shared/pipes/elapsed-time.pipe';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    CardComponent,
    ElapsedTimePipe,
    LazyImgDirective,
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
