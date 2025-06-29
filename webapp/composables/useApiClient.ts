import { Configuration } from '~/api-client/runtime';
import { AppApi, UrlApi, UrlListApi } from '~/api-client';

export function useApiClient() {
  const config = useRuntimeConfig();
  const basePath = config.public.apiBaseUrl || 'http://localhost:3001';

  // Create API client configuration
  const configuration = new Configuration({
    basePath,
    // Add any needed headers, credentials, etc.
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Initialize the API clients
  const appApi = new AppApi(configuration);
  const urlApi = new UrlApi(configuration);
  const urlListApi = new UrlListApi(configuration);

  return {
    appApi,
    urlApi,
    urlListApi
  };
}
