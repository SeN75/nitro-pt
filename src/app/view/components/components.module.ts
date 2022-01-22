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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ArchivingInfoComponent } from './info-items/archiving-info/archiving-info.component';
import { RouterModule } from '@angular/router';
import { UplodeFileComponent } from './uplode-file/uplode-file.component';
import { EntriesAndRemainingComponent } from './entries-and-remaining/entries-and-remaining.component';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { PreviewImageOrVideoComponent } from './preview-image-or-video/preview-image-or-video.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { NgbDropdown, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DateHijriComponent } from './datepicker/date-hijri/date-hijri.component';
import { DateGregorianComponent } from './datepicker/date-gregorian/date-gregorian.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    PackageCardComponent,
    CategoryCardComponent,
    InfoItemComponent,
    PersonalDataComponent,
    SportsHealthSuberInfoComponent,
    BodyMeasurementsComponent,
    BodyPicInfoComponent,
    ArchivingInfoComponent,
    UplodeFileComponent,
    EntriesAndRemainingComponent,
    LoaderComponent,
    DeleteDialogComponent,
    PreviewImageOrVideoComponent,
    DatepickerComponent,
    DateHijriComponent,
    DateGregorianComponent,
    TableFilterComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    NgbModule,
    MatMenuModule

  ],
  exports: [
    PackageCardComponent,
    CategoryCardComponent,
    InfoItemComponent,
    PersonalDataComponent,
    SportsHealthSuberInfoComponent,
    BodyMeasurementsComponent,
    BodyPicInfoComponent,
    ArchivingInfoComponent,
    EntriesAndRemainingComponent,
    LoaderComponent,
    UplodeFileComponent,
    TableFilterComponent
  ]
})
export class ComponentsModule { }
