<script lang="ts">
	import * as Select from '$lib/components/ui/select';

	let {
		possibleSelections,
		selection,
		onSelectionChange
	}: { possibleSelections: string[]; selection: string; onSelectionChange: (v: string) => void } =
		$props();

	function handleSelectionChange(selection: string) {
		(onSelectionChange as (selection: string) => void)(selection);
	}
</script>

<Select.Root
	selected={selection ? { label: selection, value: selection } : undefined}
	onSelectedChange={(v) => {
                                if (v) {
                                    handleSelectionChange(v.value as string);
                                }
                            }}
>
	<Select.Trigger
		class="h-6 w-[180px] text-sm border-0 border-b-[1px] border-b-primary rounded-none m-0 p-0 py-1"
	>
		<Select.Value placeholder={selection as string} />
	</Select.Trigger>
	<Select.Content>
		{#each possibleSelections as possibleSelection}
			<Select.Item value={possibleSelection}>{possibleSelection}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
