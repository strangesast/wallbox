import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListPageSubComponent } from './file-list-page-sub.component';

describe('FileListPageSubComponent', () => {
  let component: FileListPageSubComponent;
  let fixture: ComponentFixture<FileListPageSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileListPageSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListPageSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
