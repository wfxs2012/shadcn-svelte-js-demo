import NotFound from "./views/NotFound.svelte";
import Layout from "./views/Layout.svelte";
export default {
    '/': Layout,
    '/*': Layout,
    '*': NotFound
};
