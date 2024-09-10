import { Component } from '@angular/core';
import { HeaderCommonComponent } from "../../organisms/header-common/header-common.component";
import { FooterCommonComponent } from "../../organisms/footer-common/footer-common.component";

@Component({
  selector: 'lib-main-layout',
  standalone: true,
  imports: [HeaderCommonComponent, FooterCommonComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
