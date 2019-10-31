import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

function sortBy(keys) {
  return (a, b) => {
    for (const key of keys) {
      if (a[key] !== b[key]) {
        return a[key] > b[key] ? 1 : -1;
      }
    }
    return 0;
  };
}

@Component({
  selector: 'app-file-browser-directory',
  template: `
  <div *ngFor="let item of items$ | async" tabindex="0">
    <ng-container [ngSwitch]="item.type">
      <div *ngSwitchCase="'directory'" (dblclick)="updateURI(item.uri)">
        <mat-icon>folder</mat-icon>
        <span class="name">{{ item.name }}</span>
        <button mat-icon-button aria-label="Options" [matMenuTriggerFor]="itemMenu">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #itemMenu xPosition="before">
          <button mat-menu-item>Item 1</button>
          <button mat-menu-item>Item 2</button>
        </mat-menu>
      </div>
      <div *ngSwitchCase="'file'">
        <mat-icon>music_note</mat-icon>
        <span class="name">{{ item.name }}</span>
        <span class="name">{{ item.album }}</span>
        <span class="name">{{ item.artist }}</span>
        <span class="duration">{{ item.duration | duration }}</span>
        <button mat-icon-button aria-label="Options" [matMenuTriggerFor]="itemMenu">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #itemMenu xPosition="before">
          <button mat-menu-item>Item 1</button>
          <button mat-menu-item>Item 2</button>
        </mat-menu>
      </div>
    </ng-container>
  </div>
  `,
  styles: [`
  :host {
    display: flex;
    flex-direction: column;
  }
  :host > div > div {
    display: flex;
    align-items: center;
    height: 48px;
    cursor: pointer;
  }
  :host > div > div:hover {
    background: #fafafa;
  }
  :host > div > div > span,
  :host > div > div > mat-icon {
    padding: 0 8px;
  }
  :host > div > div > span.name {
    flex-grow: 1;
  }
  `],
})
export class FileBrowserDirectoryComponent implements OnInit {
  items$ = this.store.pipe(
    select('files'),
    select('fileList'),
    map(v => v.map(b => ({uri: b.getUri(), name: b.getName(), type: b.getType()})).sort(sortBy(['type', 'name'])))
  );

  // items = Array.from(Array(10), (_, i) => {
  //   const type = Math.random() > 0.5 ? 'directory' : 'file';
  //   const duration = 120 * Math.random();
  //   if (type === 'directory') {
  //     const name = `Item ${i + 1}`;
  //     const uri = name.toLowerCase().replace(' ', '_');
  //     return { type, uri, duration, name };
  //   } else {
  //     return {
  //       type,
  //       duration,
  //       title: `Song ${i + 1}`,
  //       album: `Album ${i + 1}`,
  //       artist: `Artist ${i + 1}`,
  //     };
  //   }
  // }).sort(sortBy(['type', 'name']));

  constructor(
    public router: Router,
    public store: Store<{files: any}>,
  ) { }

  updateURI(uri: string) {
    this.router.navigate(['/files', uri]);
  }

  ngOnInit() {
  }

}
