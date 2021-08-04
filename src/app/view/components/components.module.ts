import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { CategoryCardComponent } from "./category-card/category-card.component";
import { PackageCardComponent } from "./package-card/package-card.component";
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { InfoItemComponent } from "./info-item/info-item.component";
import { PersonalDataComponent } from './info-items/personal-data/personal-data.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { SportsHealthSuberInfoComponent } from './info-items/sports-health-suber-info/sports-health-suber-info.component';
import { BodyMeasurementsComponent } from './body-measurements/body-measurements.component';
import { BodyPicInfoComponent } from './info-items/body-pic-info/body-pic-info.component';

@NgModule({
  declarations: [
    PackageCardComponent,
    CategoryCardComponent,
    InfoItemComponent,
    PersonalDataComponent,
    SportsHealthSuberInfoComponent,
    BodyMeasurementsComponent,
    BodyPicInfoComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,

  ],
  exports: [
    PackageCardComponent,
    CategoryCardComponent,
    InfoItemComponent,
    PersonalDataComponent,
    SportsHealthSuberInfoComponent,
    BodyMeasurementsComponent,
    BodyPicInfoComponent,
  ]
})
export class ComponentsModule { }
