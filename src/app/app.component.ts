import { Component } from '@angular/core';
import { HsConfig } from 'hslayers-ng';
import { MainService } from '../main.service';

@Component({
  selector: 'hs-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(
    public HsConfig: HsConfig,
    private mainService: MainService
  ) {}
  title = 'Atlas Regionálních specialit';

  ngOnInit(): void {
    this.mainService.init();
  }
}
