import { parse } from "papaparse";

export async function csvToJson<T>(file: File): Promise<T[]> {
  return new Promise((resolve, reject) => {
    parse<T>(file, {
      header: true,
      complete(results) {
        if (results.errors.length < 0) {
          reject("Error parsing file");
        }
        resolve(results.data);
      },
    });
  });
}
