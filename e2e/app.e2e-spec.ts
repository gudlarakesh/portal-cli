import { NgCliDemoPage } from './app.po';

describe('ng-cli-demo App', function() {
  let page: NgCliDemoPage;

  beforeEach(() => {
    page = new NgCliDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
