import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-save-cancel-button',
  templateUrl: './save-cancel-button.component.html',
  styleUrls: ['./save-cancel-button.component.css']
})
export class SaveCancelButtonComponent implements OnInit {

  constructor() { }


@Input()
disabled!:boolean;
@Output()
cancel:EventEmitter<any>=new EventEmitter<any>();

  ngOnInit(): void {
  }
onCancel(event:any){
  this.cancel.emit(event);
}
}
