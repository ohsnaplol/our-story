// constants
const DELIMITER = "**"

document.addEventListener('alpine:init', () => {
  Alpine.data('reactiveLines', () => ({
    init() {
      this.lines.push(this.renderLine(line1))
    },
    playerInput: '',
    lines: [],
    renderLine: function(line){
      const words = line.text.split(" ")
      const wrappedWords = words.map(word => {
        if (word.startsWith(DELIMITER)) {
          const wordWithoutDelimiters = word.substring(DELIMITER.length, word.length - DELIMITER.length)
          const choices = line.choices[wordWithoutDelimiters]
          const choicesAsOptions = [`<option value="">${wordWithoutDelimiters}</option>`, ...choices.map(choice => `<option value="${choice}">${choice}</option>`)]
          const wordAsHTMLDropdown = `<select class="choice-dropdown">${choicesAsOptions.join("")}</select>`
          return wordAsHTMLDropdown
        }
        return word
      })
      return wrappedWords.join(" ")
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

  const line1 = { 
    text: "the **story** takes **place** here",
    choices: { "story": ["read", "write"], "place": ["seek"]}
  }
});