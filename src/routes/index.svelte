<script>
	import linesStore from '../store';
  import { onDestroy } from 'svelte'

	let lines = [{}];
	let formValue = '';
	const unsubscribe = linesStore.subscribe((value) => (lines = value));

	function onSubmit() {
		linesStore.update((lines) => [...lines, { text: formValue, options: { story: ['test'] } }]);
		formValue = '';
	}

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
		<form on:submit|preventDefault={onSubmit}>
			<input
				bind:value={formValue}
				autocomplete="off"
				type="text"
				id="text-input"
				placeholder="Enter text here"
			/>
			<button
				type="submit"
				id="submit"
				x-show="playerInput.length"
				x-bind:disabled="playerInput.length < 0"
				x-transition>Submit</button
			>
		</form>
	</main>
</div>
