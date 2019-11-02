import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileBrowserBreadcrumbsComponent } from './file-browser-breadcrumbs.component';

describe('FileBrowserBreadcrumbsComponent', () => {
  let component: FileBrowserBreadcrumbsComponent;
  let fixture: ComponentFixture<FileBrowserBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileBrowserBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileBrowserBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
