<script>
    import {Separator} from "$lib/components/ui/separator/index.js";

    import Page2 from "./Page2.svelte";
    import Router from "svelte-spa-router";
    import Page3 from "./Page3.svelte";
    import Page4 from "./Page4.svelte";
    import Page from "./Page.svelte";
    import SidebarNav from "../components/SidebarNav.svelte";


    const prefix = '/'
    const routes = {
        '/': Page,
        '/page2': Page2,
        '/page3/': Page3,
        '/page4/': Page4
    }

    const sidebarNavItems= [
        {
            title: "Page1",
            href: "/",
        },{
            title: "Page2",
            href: "/page2",
        },{
            title: "Page3",
            href: "/page3",
        },{
            title: "Page4",
            href: "/page4",
        },
    ]

</script>


<div class=" space-y-6 p-10 pb-16 md:block">
    <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
        <p class="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
        </p>
    </div>
    <Separator class="my-6"/>
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside class="-mx-4 lg:w-1/5">
           <SidebarNav items={sidebarNavItems}/>
        </aside>
        <div class="flex-1 ">
            <Router {routes}/>
        </div>
    </div>
</div>
