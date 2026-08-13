# Wise Pair Programming Exercise

## Promise retry behaviour — TypeScript example

This project contains a small TypeScript example based on the pair-programming exercise, together with Jest tests covering the retry behaviour.

The main purpose is to demonstrate the behaviour of await when returning a Promise from an async function, particularly the distinction between:

```
return await somePromise();
```

and:

```
return somePromise();
```

The examples focus specifically on the try/catch retry logic.

## Prerequisites
* Node.js
* npm

## Setup

Clone the repository and install the dependencies:

```
git clone <repository-url>
cd <repository-directory>
npm install
```

## Running the tests

Run the test suite with:

```
npm test
```

The tests cover:


* Calling getData
* Passing the returned data to postData
* Retrying getData after a rejected Promise
* Retrying getData multiple times
* Ensuring one retry occurs for each failure
* Retrying postData after a rejected Promise
* Retrying postData multiple times
* Ensuring one retry occurs for each failure

## The await behaviour being demonstrated

The retry functions are structured as follows:

```
async function getData() {
  try {
    return await getDataClient();
  } catch {
    return getData();
  }
}
```

The `await` in the `try` block is significant because without it the try/catch would only handle a synchronous exception thrown while calling getDataClient(). With `await` the rejected Promise is observed within the try block, allowing the catch to perform the retry.

## Is await necessary in the catch block?

The catch block currently contains:

```
catch {
  return getData();
}
```

An alternative is:

```
catch {
  return await getData();
}
```

For the retry behaviour demonstrated here, these have the same observable result.

`getData()` returns a Promise, and because the containing function is async, returning that Promise causes the outer Promise to adopt its eventual state and value.

The same applies to postData.

## Comparing the two versions

The tests can be used to compare:

```
catch {
  return getData();
}
```

with:

```
catch {
  return await getData();
}
```

Changing between these two forms does not change the results of the retry tests.

## What the tests demonstrate

The most relevant tests are the retry tests. For example:

```
jest
  .mocked(getData)
  .mockRejectedValueOnce(new Error("oops 1"))
  .mockRejectedValueOnce(new Error("oops 2"))
  .mockResolvedValue(data);

await handleData();

expect(getData).toHaveBeenCalledTimes(3);
```

This verifies that:

* The first call fails.
* The retry fails.
* The next retry succeeds.
* The successful data is subsequently passed to postData.

The equivalent postData tests verify the same behaviour for posting.

## Summary

The key distinction is:

```
try {
  return await getDataClient();
} catch {
  return getData();
}
```

* await inside the try allows Promise rejection to be handled by the catch.
* Returning the recursive Promise from the catch does not require another await for the Promise to be propagated through the async function.
* return getData() and return await getData() therefore produce the same relevant retry behaviour in this example.
* Whether postData(data) itself should be awaited by handleData is a separate question concerning whether the caller needs to wait for the posting operation to complete.

The project is intended as a reproducible demonstration of these Promise semantics rather than as an assertion that one particular coding style is universally preferable.