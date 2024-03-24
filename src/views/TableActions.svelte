<script lang="ts">
    import Ellipsis from "lucide-svelte/icons/ellipsis";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import {Button, buttonVariants} from "$lib/components/ui/button";
    import * as Dialog from "$lib/components/ui/dialog";
    import {Input} from "$lib/components/ui/input";
    import {Label} from "$lib/components/ui/label";
    import {FilePenLine} from "lucide-svelte";

    export let id = '';
    let dialogOpen = false;

    const onEdit = () => {
        dialogOpen=true
    }

</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
        <Button
                variant="ghost"
                builders={[builder]}
                size="icon"
                class="relative h-8 w-8 p-0"
        >
            <span class="sr-only">Open menu</span>
            <Ellipsis class="h-4 w-4"/>
        </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Group>
            <DropdownMenu.Label>Actions</DropdownMenu.Label>
            <DropdownMenu.Item class="cursor-pointer" on:click={() => navigator.clipboard.writeText(id)}>
                Copy payment ID - {id}
            </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator/>
        <DropdownMenu.Item class="flex items-center gap-1 cursor-pointer" on:click={onEdit}>
            <FilePenLine  class="h-5 w-5" /> <span>Edit</span>
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>

<!-- 修改弹窗 -->
<Dialog.Root bind:open={dialogOpen}>
    <Dialog.Trigger />
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Description>
                Make changes to your profile here. Click save when you're done.
            </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right">Name</Label>
                <Input id="name" value="Pedro Duarte" class="col-span-3"/>
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
                <Label for="username" class="text-right">Username</Label>
                <Input id="username" value="@peduarte" class="col-span-3"/>
            </div>
        </div>
        <Dialog.Footer>
            <Button type="submit">Save changes</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
