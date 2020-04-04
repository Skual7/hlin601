import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-poule',
  templateUrl: './poule.component.html',
  styleUrls: ['./poule.component.css']
})
export class PouleComponent implements OnInit {
  @Input() teamArray: Array<object>;
  constructor() { }

  ngOnInit(): void {
  }

}
