<script>
	import linesStore from '../store';
  import { onDestroy } from 'svelte';
  // @ts-ignore
  import story from '$lib/story.yaml'

	let lines = [{}];
	const unsubscribe = linesStore.subscribe((value) => (lines = value));

  eventManager('room_enter')

  function onChoice(e, object) {
    eventManager(object, e.target.value)
  }

  function eventManager(event, action) {
    console.log(event, action)
    if (!action) {
      const text = story.events[event]
      const stringArray = text.split(' ');
      let options = {}
      for (let index = 0; index < stringArray.length; index++) {
        const word = stringArray[index];
        if (story.events[word]) {
          options[word] = Object.keys(story.events[word])
        }
      }
      linesStore.update((lines) => [...lines, { text, options }]);
      return
    }
    const text = story.events[event][action];
    linesStore.update((lines) => [...lines, { text, options: {} }]);
  }

	onDestroy(unsubscribe);
</script>

<div id="container">
	<main id="hud">
		<ol>
			{#each lines as line, index}
				<li>
					{#each line.text.split(' ') as word}
						{#if line.options[word]}
							<select on:change={e => onChoice(e, word)} disabled={index !== lines.length - 1}>
								<option>{word}</option>
								{#each line.options[word] as choice}
									<option>{choice}</option>
								{/each}
							</select>
						{:else}
							{word}
						{/if}
						{' '}
					{/each}
				</li>
			{/each}
		</ol>
	</main>
</div>
