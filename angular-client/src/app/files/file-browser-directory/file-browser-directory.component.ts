import { Component, OnInit } from '@angular/core';

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
  <div *ngFor="let item of items" tabindex="0">
    <ng-container [ngSwitch]="item.type">
      <ng-container *ngSwitchCase="'directory'">
        <mat-icon>folder</mat-icon>
        <span class="name">{{ item.name }}</span>
        <button mat-icon-button aria-label="Options" [matMenuTriggerFor]="itemMenu">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #itemMenu xPosition="before">
          <button mat-menu-item>Item 1</button>
          <button mat-menu-item>Item 2</button>
        </mat-menu>
      </ng-container>
      <ng-container *ngSwitchCase="'file'">
        <mat-icon>music_note</mat-icon>
        <span class="name">{{ item.title }}</span>
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

      </ng-container>
    </ng-container>
  </div>
  `,
  styles: [`
  :host {
    display: flex;
    flex-direction: column;
  }
  :host > div {
    display: flex;
    align-items: center;
    height: 48px;
  }
  :host > div > span, :host > div > mat-icon {
    padding: 0 8px 0 8px;
  }
  :host > div > span.name {
    flex-grow: 1;
  }
  `],
})
export class FileBrowserDirectoryComponent implements OnInit {
  items = Array.from(Array(10), (_, i) => {
    const type = Math.random() > 0.5 ? 'directory' : 'file';
    const duration = 120 * Math.random();
    if (type === 'directory') {
      return {
        type,
        duration,
        name: `Item ${i + 1}`,
      };
    } else {
      return {
        type,
        duration,
        title: `Song ${i + 1}`,
        album: `Album ${i + 1}`,
        artist: `Artist ${i + 1}`,
      };
    }
  }).sort(sortBy(['type', 'name']));

  constructor() { }

  ngOnInit() {
  }

}
