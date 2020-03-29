import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {
  @Input() pouleArray : Array<object>;
  constructor() { }

  ngOnInit(): void {
  }

}
