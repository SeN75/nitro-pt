import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { PackageCardComponent } from "./package-card/package-card.component";

@NgModule({
    declarations: [PackageCardComponent],
    imports: [BrowserModule],
    exports: [PackageCardComponent]
})
export class ComponentsModule { }