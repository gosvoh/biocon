import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useFetch(token: string | undefined) {
  return {
    POST: <T>(url: string, data: object | FormData | T) => {
      return fetch(url, {
        method: "POST",
        body: data instanceof FormData ? data : JSON.stringify(data),
        headers: {
          Authorization: `${token}`,
        },
      });
    },
    PATCH: <T>(url: string, data: object | FormData | T) => {
      return fetch(url, {
        method: "PATCH",
        body: data instanceof FormData ? data : JSON.stringify(data),
        headers: {
          Authorization: `${token}`,
        },
      });
    },
    DELETE: (url: string) => {
      return fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });
    },
  };
}

export function checkToken(token: string) {
  return fetch("/api/auth", {
    method: "POST",
    body: JSON.stringify({ token }),
  }).then((res) => res.status === 200);
}
