<script lang="ts">
    import {createTable, Render, Subscribe, createRender} from "svelte-headless-table";
    import {addPagination, addTableFilter, addHiddenColumns, addSelectedRows} from "svelte-headless-table/plugins";
    import * as Table from "$lib/components/ui/table";
    import {Button} from "$lib/components/ui/button";
    import {Input} from "$lib/components/ui/input";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import {readable, writable} from "svelte/store";
    import TableActions from "./TableActions.svelte";
    import {ChevronDown} from "lucide-svelte";
    import TableCheckbox from "./TableCheckbox.svelte";
    import Image from "./Image.svelte";
    import {onMount} from "svelte";
    import {ProductService} from "~/service/product.service";

    //
    let tdata = writable([]);

    let table = createTable(tdata, {
        page: addPagination(),
        filter: addTableFilter({
            fn: ({filterValue, value}) =>
                value.toLowerCase().includes(filterValue.toLowerCase()),
        }),
        hide: addHiddenColumns(),
        select: addSelectedRows(),
    });

    const columns = table.createColumns([
        table.column({
            accessor: "id",
            header: (_, {pluginStates}) => {
                const {allPageRowsSelected} = pluginStates.select;
                return createRender(TableCheckbox, {
                    checked: allPageRowsSelected,
                });
            },
            cell: ({row}, {pluginStates}) => {
                const {getRowState} = pluginStates.select;
                const {isSelected} = getRowState(row);

                return createRender(TableCheckbox, {
                    checked: isSelected,
                });
            },
            plugins: {
                filter: {
                    exclude: true,
                },
            },
        }),
        table.column({
            accessor: "code",
            header: "Code",
            plugins: {
                filter: {
                    exclude: true,
                },
            },
        }),
        table.column({
            accessor: "name",
            header: "Name",

        }),
        table.column({
            accessor: "description",
            header: "Description",
            plugins: {
                filter: {
                    exclude: true,
                },
            },
        }),
        table.column({
            accessor: "category",
            header: "Category",
            plugins: {
                filter: {
                    exclude: true,
                },
            },
        }),
        table.column({
            accessor: "quantity",
            header: "Quantity",
            plugins: {
                filter: {
                    exclude: true,
                },
            },
        }),

        table.column({
            accessor: "inventoryStatus",
            header: "InventoryStatus",
            plugins: {
                filter: {
                    exclude: true,
                },
            },
        }),
        table.column({
            accessor: "rating",
            header: "Rating",
            plugins: {
                filter: {
                    exclude: true,
                },
            },
        }),
        table.column({
            accessor: "image",
            header: "Image",
            cell: ({ row,column, value}) => {
                return createRender(Image, {
                    url: value,
                });
            },
            plugins: {
                filter: {
                    exclude: true,
                },
            },
        }),

        table.column({
            accessor: "price",
            header: "Price",
            cell: ({value}) => {
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(value);
                return formatted;
            },
            plugins: {
                filter: {
                    exclude: true,
                },
            },
        }),
        table.column({
            accessor: ({id}) => id,
            header: "",
            cell: ({value}) => {
                return createRender(TableActions, {id: value});
            },
        }),
    ]);
    const {headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows} =
        table.createViewModel(columns);
    const {hasNextPage, hasPreviousPage, pageIndex} = pluginStates.page;
    const {filterValue} = pluginStates.filter;
    //
    const {hiddenColumnIds} = pluginStates.hide;
    const ids = flatColumns.map((col) => col.id);
    let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

    $: $hiddenColumnIds = Object.entries(hideForId)
        .filter(([, hide]) => !hide)
        .map(([id]) => id);

    const hidableCols = ["code", "description", "image",'price'];

    //
    const {selectedDataIds} = pluginStates.select;


    onMount(async () => {

        $tdata = await ProductService.getProductsMini()
    })


</script>

<div>
    <div class="flex items-center py-4">
        <Input
                class="max-w-sm"
                placeholder="Filter emails..."
                type="text"
                bind:value={$filterValue}
        />
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
                <Button variant="outline" class="ml-auto" builders={[builder]}>
                    Columns
                    <ChevronDown class="ml-2 h-4 w-4"/>
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                {#each flatColumns as col}
                    {#if hidableCols.includes(col.id)}
                        <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
                            {col.header}
                        </DropdownMenu.CheckboxItem>
                    {/if}
                {/each}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </div>
    <div class="rounded-md border">
        <Table.Root {...$tableAttrs}>
            <Table.Header>
                {#each $headerRows as headerRow}
                    <Subscribe rowAttrs={headerRow.attrs()}>
                        <Table.Row>
                            {#each headerRow.cells as cell (cell.id)}
                                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                                    <Table.Head {...attrs}>
                                        {#if cell.id === "price"}
                                            <div class="text-right">
                                                <Render of={cell.render()}/>
                                            </div>
                                        {:else}
                                            <Render of={cell.render()}/>
                                        {/if}
                                    </Table.Head>
                                </Subscribe>
                            {/each}
                        </Table.Row>
                    </Subscribe>
                {/each}
            </Table.Header>
            <Table.Body {...$tableBodyAttrs}>
                {#each $pageRows as row (row.id)}
                    <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
                        <Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && "selected"}>
                            {#each row.cells as cell (cell.id)}
                                <Subscribe attrs={cell.attrs()} let:attrs>
                                    <Table.Cell {...attrs}>
                                        {#if cell.id === "amount"}
                                            <div class="text-right font-medium">
                                                <Render of={cell.render()}/>
                                            </div>
                                        {:else if cell.id === "status"}
                                            <div class="capitalize">
                                                <Render of={cell.render()}/>
                                            </div>
                                        {:else}
                                            <Render of={cell.render()}/>
                                        {/if}
                                    </Table.Cell>
                                </Subscribe>
                            {/each}
                        </Table.Row>
                    </Subscribe>
                {/each}
            </Table.Body>
        </Table.Root>
    </div>
    <div class="flex items-center justify-end space-x-4 py-4">
        <div class="flex-1 text-sm text-muted-foreground">
            {Object.keys($selectedDataIds).length} of{" "}
            {$rows.length} row(s) selected.
        </div>
        <Button
                variant="outline"
                size="sm"
                on:click={() => ($pageIndex = $pageIndex - 1)}
                disabled={!$hasPreviousPage}>Previous
        </Button
        >
        <Button
                variant="outline"
                size="sm"
                disabled={!$hasNextPage}
                on:click={() => ($pageIndex = $pageIndex + 1)}>Next
        </Button
        >
    </div>
</div>
