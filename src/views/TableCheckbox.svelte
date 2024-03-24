<script lang="ts">
    import { Checkbox } from "$lib/components/ui/checkbox";
    export let checked = false;
</script>

<Checkbox bind:checked={$checked} />
