# OpenAPI Generator Setup

This project uses OpenAPI Generator to generate TypeScript clients for the backend API. The setup fetches the API specification from `http://localhost:3001/api-yaml` and generates a TypeScript client that can be used throughout the application.

## Setup

The OpenAPI Generator has been configured with the following components:

1. **OpenAPI Generator CLI** installed as a dev dependency
2. **openapitools.json** configuration file for the generator
3. **npm scripts** for generating the API client
4. **Composables** for using the generated API client in Vue components

## How to Use

### Generating API Client Code

To generate or update the API client code based on the latest API specification:

```bash
npm run generate:api
```

To continuously watch for changes and regenerate (during development):

```bash
npm run generate:api:watch
```

### Using the Generated API Client

Import and use the API client in your Vue components:

```typescript
import { useApiClient } from '~/composables/useApiClient';

// In your component setup function
const { urlListApi, urlApi, appApi } = useApiClient();

// Using the API
const fetchUrlLists = async () => {
  try {
    const lists = await urlListApi.urlListControllerFindAll();
    // Handle the data
  } catch (err) {
    // Handle error
  }
};
```

### API Client Methods

The generated client contains interfaces and methods that match your OpenAPI specification. For example:

- `urlListApi.urlListControllerFindAll()`
- `urlListApi.urlListControllerFindOne({ id: "some-id" })`
- `urlListApi.urlListControllerCreate({ createUrlListDto: { name: "My List" } })`
- `urlApi.urlControllerCreate({ createUrlDto: { title: "GitHub", url: "https://github.com", urlListId: "some-list-id" } })`

## Customization

You can customize the API client generation by modifying the `openapitools.json` file. For more information, refer to the [OpenAPI Generator CLI documentation](https://www.npmjs.com/package/@openapitools/openapi-generator-cli).

## API Base URL

The API base URL is configured in the Nuxt configuration (`nuxt.config.ts`) and can be overridden by setting the `API_BASE_URL` environment variable.
