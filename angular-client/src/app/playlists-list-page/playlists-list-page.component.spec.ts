import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsListPageComponent } from './playlists-list-page.component';

describe('PlaylistsListPageComponent', () => {
  let component: PlaylistsListPageComponent;
  let fixture: ComponentFixture<PlaylistsListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistsListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
