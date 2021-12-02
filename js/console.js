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
      return this.lines[i].text.split(/\s+/g).map(word => {
        if (word.startsWith(DELIMITER)) {
          const interactable = word.replaceAll(DELIMITER, "");
          return {
            type: "choice",
            name: interactable,
            options: this.line.options[interactable]
          }
        }
        return {
          type: "text",
          text: word
        }
      })
    },
    onSelect(action, object) {
      this.sendToStory(`You ${action} ${object}`)
    },
    sendToStory(input, options) {
      this.lines.push({
        text: input,
        options
      });
      // scroll input into view
      let element = document.getElementById('scrolling-text-wrapper').lastElementChild
      element.scrollIntoView();
    },
    submitInput() {
      this.sendToStory(this.playerInput);
      this.playerInput = '';
    }
  }))
});