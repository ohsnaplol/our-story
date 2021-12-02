// constants
const DELIMITER = "**"

document.addEventListener('alpine:init', () => {
  Alpine.data('reactiveLines', () => ({
    playerInput: '',
    lines: [{
      text: "the **story** takes **place** here",
      options: { "story": ["read", "write"], "place": ["seek"]}
    },{
      text: "the **candle** burns",
      options: { "candle": ["put out", "douse"] }
    },],
    lineTokens(i) {
      return this.lines[i].text.split(/\s+/g).map(t => {
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
    onSelect(action, object) {
      this.sendInputToStory(`You ${action} ${object}`)
    },
    sendInputToStory(input, options) {
      this.lines.push({
        text: input,
        options
      });
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