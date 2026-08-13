import {
  getData as getDataClient,
  postData as postDataClient,
  Data,
} from "./mockApi";

/*
 * 1. Original code developed during pair programming exercise
 */
async function getData() {
  try {
    return await getDataClient();
  } catch {
    return getData();
  }
}

async function postData(data: Data) {
  try {
    return await postDataClient(data);
  } catch {
    return postData(data);
  }
}

export async function handleData() {
  const data = await getData();
  postData(data);
}

/*
 * 2. Refactored code discussed briefly at the end
 */
// async function retryOnError<T>(fn: () => T): Promise<T> {
//   try {
//     return await fn();
//   } catch {
//     return fn();
//   }
// }

// export async function handleData() {
//   const data = await retryOnError(getDataClient);
//   retryOnError(() => postDataClient(data));
// }
