type endpoint = string;
type methods = "GET" | "PUT" | "POST" | "DELETE";

const makeRequest = async (
  endpoint: endpoint,
  method?: methods,
  body?: any,
  accessKey?: string
) => {
  const url = `https://myqnoteapi.liara.run/api/${endpoint}`;
  const options: RequestInit = {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_API_KEY,
      Authorization: `Bearer ${accessKey || undefined}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    return { connectionError: "خطا در برقراری ارتباط" };
  }
};

export const get = (endpoint: endpoint, accessKey: string) =>
  makeRequest(endpoint, undefined, undefined, accessKey);

export const post = (
  endpoint: endpoint,
  body: Record<string, any>,
  accessKey: undefined | string
) => makeRequest(endpoint, "POST", body, accessKey);

export const put = (
  endpoint: endpoint,
  accessKey: string,
  body: Record<string, any>
) => makeRequest(endpoint, "PUT", body, accessKey);

export const del = (endpoint: endpoint, accessKey: string, body?: any) =>
  makeRequest(endpoint, "DELETE", body, accessKey);
