import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() customStyles: any;
  @Input() topMargin: boolean = true;
  @Input() backdrop: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
