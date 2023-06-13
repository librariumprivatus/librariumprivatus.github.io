
// import * as Config from "./config-production.json";

//import * as ConfigValues from "./config-production-local.json";

// import * as ConfigValues from "./config-dev-local.json";


// import * as ConfigValues from "./config-production-local.json";
import * as ConfigValues from "./config-dev-local.json";
// import * as ConfigValues from "./config-dev-small-local.json";


export const Values = ConfigValues



export const repo_url = new URL(ConfigValues.hostname)
export const store_url = new URL(ConfigValues.store_dir, repo_url)
export const covers_dir_url = new URL(ConfigValues.covers_dir, store_url)
export const jsons_dir_url = new URL(ConfigValues.jsons_dir, store_url)

export const base_url = new URL(document.baseURI)


export const jsons = [
    {
        "url": new URL('elements.json', jsons_dir_url),
        "context_name": "elements"
    },
    {
        "url": new URL('tree.json', jsons_dir_url),
        "context_name": "tree"
    },
    {
        "url": new URL('books.json', jsons_dir_url),
        "context_name": "books"
    },
    {
        "url": new URL('booksByMonths.json', jsons_dir_url),
        "context_name": "booksByMonths"
    },
    {
        "url": new URL('months.json', jsons_dir_url),
        "context_name": "months"
    },
]

export const cookies_gridSize = "gridSize"

export const cookies_sharepointWelcomeUrl = "sharepointWelcomeUrl"






