import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-button-group',
  templateUrl: './action-button-group.component.html',
  styleUrls: ['./action-button-group.component.css']
})
export class ActionButtonGroupComponent implements OnInit {
  @Output()
  add:EventEmitter<any> = new EventEmitter<any>();
  @Output()
  delete: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  edit:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  onAdd(event: any){
this.add.emit(event);
  }
  onEdit(event:any){
this.edit.emit(event);
  }
  onDelete(event:any){
this.delete.emit(event);
  }

}
