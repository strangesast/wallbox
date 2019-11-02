import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileBrowserDirectoryComponent } from './file-browser-directory.component';

describe('FileBrowserDirectoryComponent', () => {
  let component: FileBrowserDirectoryComponent;
  let fixture: ComponentFixture<FileBrowserDirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileBrowserDirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileBrowserDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
