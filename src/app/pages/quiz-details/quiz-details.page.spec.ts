import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDetailsPage } from './quiz-details.page';

describe('QuizDetailsPage', () => {
  let component: QuizDetailsPage;
  let fixture: ComponentFixture<QuizDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
