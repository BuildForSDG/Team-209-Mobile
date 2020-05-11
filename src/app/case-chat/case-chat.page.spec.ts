import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaseChatPage } from './case-chat.page';

describe('CaseChatPage', () => {
  let component: CaseChatPage;
  let fixture: ComponentFixture<CaseChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaseChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
