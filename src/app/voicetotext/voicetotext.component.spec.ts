import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicetotextComponent } from './voicetotext.component';

describe('VoicetotextComponent', () => {
  let component: VoicetotextComponent;
  let fixture: ComponentFixture<VoicetotextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoicetotextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoicetotextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
