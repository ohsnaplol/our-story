
document.addEventListener('alpine:init', () => {
  Alpine.data('reactiveLines', () => ({
    playerInput: '',
    onSelect(action, object) {
      Alpine.store('lines').send(`You ${action} ${object}`)
    },
    submitInput() {
      Alpine.store('lines').send(this.playerInput);
      this.playerInput = '';
    }
  }))
});