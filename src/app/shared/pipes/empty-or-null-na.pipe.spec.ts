import { EmptyOrNullNaPipe } from './empty-or-null-na.pipe';

describe('EmptyOrNullNaPipe', () => {
  it('create an instance', () => {
    const pipe = new EmptyOrNullNaPipe();
    expect(pipe).toBeTruthy();
  });
});
