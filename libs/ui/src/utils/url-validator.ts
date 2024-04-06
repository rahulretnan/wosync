import http from 'http';
import https from 'https';

const urlRegex = /^(http[s]?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}\.?/;

export function isUrl(text: string) {
  return urlRegex.test(text);
}

export function checkUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export function isValidUrl(
  url: string,
  callback: (error: Error | null, isValid: boolean) => void,
) {
  const client = url.startsWith('https') ? https : http;
  client
    .get(url, (res) => {
      const { statusCode } = res;
      const isSuccessCode = Boolean(
        statusCode && statusCode >= 200 && statusCode < 400,
      );
      callback(null, isSuccessCode);
    })
    .on('error', (err) => {
      callback(err, false);
    });
}
