export type Data = { data: string };
export function getData(): Promise<Data> {
  return Promise.resolve({ data: "data" });
}
export function postData(data: Data): Promise<void> {
  return Promise.resolve();
}
