import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { CategoryCardComponent } from "./category-card/category-card.component";
import { PackageCardComponent } from "./package-card/package-card.component";
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    declarations: [PackageCardComponent, CategoryCardComponent],
    imports: [
        BrowserModule,
        TranslateModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [PackageCardComponent, CategoryCardComponent]
})
export class ComponentsModule { }