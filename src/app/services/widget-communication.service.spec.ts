import { TestBed } from '@angular/core/testing';

import { WidgetCommunicationService } from './widget-communication.service';

describe('WidgetCommunicationService', () => {
  let service: WidgetCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
