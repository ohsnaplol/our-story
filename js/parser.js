const string = `
state: left_door.broken,right_door.open
interactables:left_door, right_door

// Events syntax👉 on interactable.state action "I'm a great writer, read this!" -> goto room_name or event or interactable.new_state?
on room_enter:"It is really creepy in here. There is a **door on the left** and a **door on the right**"
on left_door look:"It is halfway open and smoke is billowing out"
on left_door.broken open:"It won't budge and its really hot"
on left_door hit:"It opens up"->left_door.open
on left_door.open enter:"I walk through with smoke in my face"->goto room_2`

class Story {

  constructor(string) {
    const COMMAND_DELIMITER = '\n'
    const COMMENT_DELIMITER = '//'
    const KEYWORD_DELIMITER = ':'
    const STATE_VALUE_DELIMITER = '.'

    this.state
    this.interactables

    const lines = string.split(COMMAND_DELIMITER);
    const cleanLines = lines.filter(line => {
      if (line == '' || line.startsWith(COMMENT_DELIMITER)) {
        return false;
      }
      return true;
    })
    const commands = cleanLines.map(line => {
      return line.split(KEYWORD_DELIMITER)
    })
    commands.forEach((group, index) => {
      if (group.length != 2) {
        console.error('Syntax error on line ', group)
        return;
      }
      const keyword = group[0]
      const action = group[1]
      if (keyword === 'state') {
        const statesAsArray = action.split(',')
        const statesToObjectReducer = (previousValue, currentValue) => ({... previousValue, [currentValue.split(STATE_VALUE_DELIMITER)[0].trim()]: currentValue.split(STATE_VALUE_DELIMITER)[1].trim()})
        this.state = statesAsArray.reduce(statesToObjectReducer, {})
      }
      if (keyword === 'interactables') {
        const interactables = action.split(',')
        this.interactables = interactables.map(interactable => interactable.trim())
      }
      if (keyword.startsWith('on')) {
        const [on, event, verb] = keyword.split(' ')
        console.log('event\n', event, verb, '\n', action)
      }
    });
  }
}

