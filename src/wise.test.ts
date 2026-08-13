import { postData, getData } from "./mockApi";
import { handleData } from "./wise";

jest.mock("./mockApi");

const data = { data: "data" };

beforeEach(() => {
  jest.resetAllMocks();
});

describe("handleData", () => {
  it("calls getData", async () => {
    await handleData();
    expect(getData).toHaveBeenCalled();
  });

  it("calls postData with the data", async () => {
    jest.mocked(getData).mockResolvedValue(data);
    await handleData();
    expect(postData).toHaveBeenCalledWith(data);
  });

  it("retries getData if there is an error", async () => {
    jest
      .mocked(getData)
      .mockRejectedValueOnce(new Error("oops"))
      .mockResolvedValue(data);
    await handleData();
    expect(postData).toHaveBeenCalledWith(data);
  });

  it("retries getData multiple times if there is a persistent error", async () => {
    jest
      .mocked(getData)
      .mockRejectedValueOnce(new Error("oops 1"))
      .mockRejectedValueOnce(new Error("oops 2"))
      .mockResolvedValue(data);
    await handleData();
    expect(postData).toHaveBeenCalledWith(data);
  });

  it("retries getData once per error", async () => {
    jest
      .mocked(getData)
      .mockRejectedValueOnce(new Error("oops 1"))
      .mockRejectedValueOnce(new Error("oops 2"))
      .mockResolvedValue(data);
    await handleData();
    expect(getData).toHaveBeenCalledTimes(3);
  });

  it("retries postData if there is an error", async () => {
    jest.mocked(getData).mockResolvedValue(data);
    jest
      .mocked(postData)
      .mockRejectedValueOnce(new Error("oops"))
      .mockResolvedValue();
    await handleData();
    expect(postData).toHaveBeenCalledWith(data);
  });

  it("retries postData multiple times if there is a persistent error", async () => {
    jest.mocked(getData).mockResolvedValue(data);
    jest
      .mocked(postData)
      .mockRejectedValueOnce(new Error("oops"))
      .mockRejectedValueOnce(new Error("oops"))
      .mockResolvedValue();
    await handleData();
    expect(postData).toHaveBeenCalledWith(data);
  });

  it("retries postData once per error", async () => {
    jest.mocked(getData).mockResolvedValue(data);
    jest
      .mocked(postData)
      .mockRejectedValueOnce(new Error("oops"))
      .mockResolvedValue();
    await handleData();
    expect(postData).toHaveBeenCalledTimes(2);
  });
});
