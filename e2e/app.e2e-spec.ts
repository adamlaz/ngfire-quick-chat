import { NgfireQuickChatPage } from './app.po';

describe('ngfire-quick-chat App', () => {
  let page: NgfireQuickChatPage;

  beforeEach(() => {
    page = new NgfireQuickChatPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
