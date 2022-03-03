export default class Story {

  constructor(string) {
    const COMMAND_DELIMITER = '\n'
    const COMMENT_DELIMITER = '//'
    const KEYWORD_DELIMITER = ':'
    const STATE_VALUE_DELIMITER = '.'
    const ACTION_DELIMITER = '->'

    // object with properties being the object and the value being the state
    this.state
    // array of objects
    this.interactables
    // array of objects with properties event, verb, action
    // used to print interactables, manage state changes on interactions, or call new objects (i.e. changing rooms)
    this.events = {}

    // Split string up into an array of commands
    const lines = string.split(COMMAND_DELIMITER);
    // Remove commented lines from our array of commands
    const cleanLines = lines.filter(line => {
      if (line == '' || line.startsWith(COMMENT_DELIMITER)) {
        return false;
      }
      return true;
    })
    // Convert array of commands into an array of commands split up by the keyword delimiter
    const commands = cleanLines.map(line => {
      return line.split(KEYWORD_DELIMITER)
    })
    // For each command...
    commands.forEach((group, index) => {
      // If the line split generated a group larger than two, there must have been a mistake
      if (group.length != 2) {
        console.error('Syntax error on line ', group)
        return;
      }
      const keyword = group[0]
      const action = group[1]
      // Extract state, interactables, and events into data structures
      if (keyword === 'state') {
        // Convert the state array to an object
        const statesAsArray = action.split(',')
        const statesToObjectReducer = (previousValue, currentValue) => ({... previousValue, [currentValue.split(STATE_VALUE_DELIMITER)[0].trim()]: currentValue.split(STATE_VALUE_DELIMITER)[1].trim()})
        this.state = statesAsArray.reduce(statesToObjectReducer, {})
      }
      if (keyword === 'interactables') {
        const interactables = action.split(',')
        this.interactables = interactables.map(interactable => interactable.trim())
      }
      if (keyword.startsWith('on')) {
        const [interactable, verb] = keyword.split(' ').filter(word => word != 'on')
        const [text, gameAction] = action.split(ACTION_DELIMITER)
        const [object, state] = interactable.split(STATE_VALUE_DELIMITER)
        if (this.events[object]) {
          this.events[object] = [ {verb, requiredState: state, text, gameAction}, ...this.events[object]]
        } else {
          this.events[object] =  [ { verb, requiredState: state, text, gameAction } ]
        }
      }
    });
  }

  submit(action, object) {
    // search through events array for object and its corresponding action
    const { realACtion, state, text, verb } = this.events[action]
    return { realACtion, state, text, verb }
  }
}

