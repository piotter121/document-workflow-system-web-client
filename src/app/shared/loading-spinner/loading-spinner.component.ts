import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loading-spinner',
  template: '<div class="loader"></div>',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
