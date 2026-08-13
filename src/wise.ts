import {
  getData as getDataClient,
  postData as postDataClient,
  Data,
} from "./mockApi";

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
