import { TestBed } from '@angular/core/testing';

import { PublishSubscribeService } from './publish-subscribe.service';

describe('PublishSubscribeService', () => {
  let service: PublishSubscribeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublishSubscribeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
