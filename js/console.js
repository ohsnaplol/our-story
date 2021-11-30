// constants
const DELIMITER = "**"

document.addEventListener('alpine:init', () => {
  Alpine.data('reactiveLines', () => ({
    playerInput: '',
    lines: [{
      text: "the **story** takes **place** here",
      options: { "story": ["read", "write"], "place": ["seek"]},
      choices: {}
    },],
    get lineTokens() {
      return this.lines[0].text.split(/\s+/g).map(t => {
        if (t.startsWith(DELIMITER)) {
          const choiceName = t.replaceAll(DELIMITER, "");
          return {
            type: "choice",
            name: choiceName,
            options: this.line.options[choiceName]
          }
        }
        return {
          type: "text",
          text: t
        }
      })
    },
    sendInputToStory(input) {
      this.lines.push(input);
      // scroll input into view
      let element = document.getElementById('scrolling-text-wrapper').lastElementChild
      element.scrollIntoView();
    },
    submitInput() {
      this.sendInputToStory(this.playerInput);
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