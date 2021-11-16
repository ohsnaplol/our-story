const string = `state: left_door.broken,right_door.open
interactables:left_door, right_door

// Events syntax👉 on interactable.state action "I'm a great writer, read this!" -> goto room_name or event or interactable.new_state?
on room_enter:"It is really creepy in here. There is a **door on the left** and a **door on the right**"
on left_door look:"It is halfway open and smoke is billowing out"
on left_door.broken open:"It won't budge and its really hot"
on left_door hit:"It opens up"->left_door.open
on left_door.open enter:"I walk through with smoke in my face"->goto room_2`

const lines = string.split('\n');
const cleanLines = lines.filter(line => {
  if (line == '' || line.startsWith('//')) {
    return false;
  }
  return true;
})
const commands = cleanLines.map(line => {
  return line.split(':')
})
commands.forEach((group, index) => {
  if (group.length != 2) {
    console.error('Syntax error on line ', group)
    return;
  }
  const keyword = group[0]
  const action = group[1]
  if (keyword === 'state') {
    const states = action.split(',')
    const trimmedStates = states.map(state => state.trim())
    console.log('states\n',trimmedStates)
  }
  if (keyword === 'interactables') {
    const interactables = action.split(',')
    const trimmedInteractables = interactables.map(interactable => interactable.trim())
    console.log('interactables\n', trimmedInteractables)
  }
  if (keyword.startsWith('on')) {
    const [on, event, verb] = keyword.split(' ')
    console.log('event\n', event, verb, '\n', action)
  }
});
