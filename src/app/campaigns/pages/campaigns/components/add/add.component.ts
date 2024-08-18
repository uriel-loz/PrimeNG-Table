import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'campaigns-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  ngOnInit() {
  }

}
