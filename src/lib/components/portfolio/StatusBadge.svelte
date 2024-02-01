<script lang="ts">
	export let active: boolean;
</script>

<span
	class="badge {active
		? 'variant-soft-success shadow shadow-black/5'
		: 'variant-soft-error shadow shadow-black/5'}"
>
	Development: {active ? 'Active' : 'Inactive'}
</span>
