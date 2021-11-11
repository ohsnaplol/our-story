document.addEventListener('alpine:init', () => {
  Alpine.data('reactiveLines', () => ({
    playerInput: '',
    lines: ['the story takes place here','asd','123','asd','123'],
    submitInput() {
      this.lines.push(this.playerInput);
      this.playerInput = '';
    },
    buttonEnabled() {
      return !this.playerInput.length > 0;
    },
    buttonShow() {
      return this.playerInput.length > 0;
    }
  }))
});