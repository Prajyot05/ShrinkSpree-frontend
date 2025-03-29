import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import api from "../api/api";

interface ShortUrlData {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clickCount: number;
  createdDate: string;
}

export const useFetchMyShortUrls = (
  token: string,
  onError: (error: unknown) => void
) => {
  const options: UseQueryOptions<
    ShortUrlData[],
    unknown,
    ShortUrlData[],
    [string]
  > = {
    queryKey: ["my-shortenurls"],
    queryFn: async () => {
      const { data } = await api.get("/api/urls/myurls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("SHORTEN DATA: ", data);
      return data ?? [];
    },
    select: (data) =>
      [...data].sort(
        (a, b) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      ),
    staleTime: 5000,
    onError,
  };

  return useQuery(options);
};

interface TotalClicksData {
  clickDate: string;
  count: number;
}

export const useFetchTotalClicks = (
  token: string,
  onError: (error: unknown) => void
) => {
  const options: UseQueryOptions<
    TotalClicksData[],
    unknown,
    TotalClicksData[],
    [string]
  > = {
    queryKey: ["url-totalclick"],
    queryFn: async () => {
      const { data } = await api.get<Record<string, number>>(
        "/api/urls/totalClicks?startDate=2024-01-01&endDate=2025-12-31",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return Object.keys(data).map((key) => ({
        clickDate: key,
        count: data[key],
      }));
    },
    staleTime: 5000,
    onError,
  };

  return useQuery(options);
};
