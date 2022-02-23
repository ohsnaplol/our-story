import Story from './parser.js'
// constants
const DELIMITER = "**"
const mystring = `
state: left_door.broken,right_door.open
interactables:left_door, right_door

// Events syntax👉 on interactable.state action "I'm a great writer, read this!" -> goto room_name or event or interactable.new_state?
on room_enter:"It is really creepy in here. There is a **left_door** and a **right_door**"
on left_door look:"It is halfway open and smoke is billowing out"
on left_door.broken open:"It won't budge and its really hot"
on left_door hit:"It opens up"->left_door.open
on left_door.open enter:"I walk through with smoke in my face"->goto room_2`
document.addEventListener('alpine:init', () => {
  Alpine.store('lines', {
    init() {
      this.MyStory = new Story(mystring)
      const result = this.MyStory.submit('room_enter')
      this.send(result.text, {"left_door" : ['open', 'look', 'hit', 'enter'], "right_door": ['fo', 'fum']})
    },
    MyStory: null,
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
      const result = this.MyStory.submit(action, object)
      this.send(result)
    },
    send(input, options) {
      this.lines.push({
        text: input,
        options // structure: { "thing1": ["option1", "option2"], "thing2": "option1"}
      });
      let recentLine = document.getElementById('scrolling-text-wrapper').lastElementChild
      recentLine.scrollIntoView();
    }
  })
})
