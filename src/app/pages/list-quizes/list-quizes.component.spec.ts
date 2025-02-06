import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuizesComponent } from './list-quizes.component';

describe('ListQuizesComponent', () => {
  let component: ListQuizesComponent;
  let fixture: ComponentFixture<ListQuizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListQuizesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListQuizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
