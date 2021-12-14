// constants
const DELIMITER = "**"
document.addEventListener('alpine:init', () => {
  Alpine.store('lines', {
    lines: [{
      text: "the **story** takes **place** here",
      options: { "story": ["read", "write"], "place": ["seek"] }
    }, {
      text: "the **candle** burns",
      options: { "candle": ["put out", "douse"] }
    },],
    // Thanks to allain on Alpine.js Discord
    lineTokens(i) {
      return this.lines[i].text.split(/\s+/g).map(word => {
        if (word.startsWith(DELIMITER)) {
          const interactable = word.replaceAll(DELIMITER, "");
          return {
            type: "choice",
            name: interactable,
            options: this.lines[i].options[interactable]
          }
        }
        return {
          type: "text",
          text: word
        }
      })
    },
    onSelect(action, object) {
      this.send(`You ${action} ${object}`)
    },
    send(input, options) {
      this.lines.push({
        text: input,
        options
      });
      let recentLine = document.getElementById('scrolling-text-wrapper').lastElementChild
      recentLine.scrollIntoView();
    }
  })
})
