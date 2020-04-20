import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelfHealthCheckPage } from './self-health-check.page';

describe('SelfHealthCheckPage', () => {
  let component: SelfHealthCheckPage;
  let fixture: ComponentFixture<SelfHealthCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfHealthCheckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelfHealthCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
