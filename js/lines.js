import defaultExport from './parser.js'
// constants
const DELIMITER = "**"
const mystring = `
state: left_door.broken,right_door.open
interactables:left_door, right_door

// Events syntax👉 on interactable.state action "I'm a great writer, read this!" -> goto room_name or event or interactable.new_state?
on room_enter:"It is really creepy in here. There is a **door on the left** and a **door on the right**"
on left_door look:"It is halfway open and smoke is billowing out"
on left_door.broken open:"It won't budge and its really hot"
on left_door hit:"It opens up"->left_door.open
on left_door.open enter:"I walk through with smoke in my face"->goto room_2`
document.addEventListener('alpine:init', () => {
  let MyStory = new Story(mystring)
  Alpine.store('lines', {
    lines: [],
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