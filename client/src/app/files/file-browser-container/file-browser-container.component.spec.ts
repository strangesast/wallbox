import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileBrowserContainerComponent } from './file-browser-container.component';

describe('FileBrowserContainerComponent', () => {
  let component: FileBrowserContainerComponent;
  let fixture: ComponentFixture<FileBrowserContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileBrowserContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileBrowserContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
