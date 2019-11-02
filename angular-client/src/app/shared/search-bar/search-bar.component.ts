import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  template: `
  <form (ngSubmit)="doSearch()">
    <input name="value" [(ngModel)]="value" required type="text" placeholder="search"/>
    <button mat-icon-button aria-label="Search">
      <mat-icon>search</mat-icon>
    </button>
  </form>
  `,
  styles: [`
  :host > form {
    display: grid;
    grid-template-columns: auto 40px;
    grid-template-rows: min-content;
    margin: 0 12px;
  }
  :host > form > input {
    background: #fafafa;
    font-size: 1.2em;
    padding: 8px 40px 8px 8px;
    margin: 4px 0;
    grid-row: 1 / 2;
    grid-column: 1 / 3;
    outline: none;
    border: 1px solid transparent;
  }
  :host > form > input:focus, :host > input:valid {
    background: none;
    border-color: lightgrey;
  }
  :host > form > button {
    align-self: center;
    justify-self: center;
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }
    `],
})
export class SearchBarComponent implements OnInit {
  value = '';

  @Output()
  search = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  doSearch() {
    if (this.value !== '') {
      this.search.emit(this.value);
    }
  }

}
