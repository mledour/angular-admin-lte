import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {
  public test: string = '';
  constructor() { }

  ngOnInit() {
  }

  onChange($event) {
    console.log($event);
  }
}
