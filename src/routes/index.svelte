<script>
	import linesStore from '../store';
  import { onDestroy } from 'svelte'
  import mystory from '$lib/story.yaml'

	let lines = [{}];
	let formValue = '';
	const unsubscribe = linesStore.subscribe((value) => (lines = value));

  function onChoice(e) {
    console.log(e.target.value)
    const text = `You chose ${e.target.value}`
		linesStore.update((lines) => [...lines, { text, options: { story: [] } }]);
  }

	onDestroy(unsubscribe)
</script>

<div id="container">
	<main id="hud">
		<ol>
			{#each lines as line}
				<li>
					{#each line.text.split(' ') as word}
						{#if line.options[word]}
							<select on:change={e => onChoice(e)}>
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
