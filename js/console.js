document.addEventListener('alpine:init', () => {
  Alpine.data('reactiveLines', () => ({
    playerInput: '',
    lines: ['the story takes place here'],
    submitInput() {
      this.lines.push(this.playerInput);
      this.playerInput = '';
      // scroll input into view
      let element = document.getElementById('scrolling-text-wrapper').lastElementChild
      element.scrollIntoView();
    },
    buttonEnabled() {
      return !this.playerInput.length > 0;
    },
    buttonShow() {
      return this.playerInput.length > 0;
    }
  }))
});