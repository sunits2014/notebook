import { TestBed } from '@angular/core/testing';

import { PicUploadService } from './pic-upload.service';

describe('PicUploadService', () => {
  let service: PicUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
