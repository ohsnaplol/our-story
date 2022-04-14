import { writable } from 'svelte/store';

const linesStore = writable([{
  text: "here is my story",
  options: {
    story: ['keyboard', 'mouse']
  }
}])

export default linesStore;