import { LocalStatsRepo } from "@domain/stats/LocalStatsRepo";
import { NoopStatsRepo } from "@domain/stats/NoopStatsRepo";
import type { StatsRepo } from "@domain/stats/StatsRepo";

const shouldWriteInDev = import.meta.env.VITE_ENABLE_STATS_WRITE === "true";

export const statsRepo: StatsRepo =
  import.meta.env.DEV && !shouldWriteInDev
    ? new NoopStatsRepo()
    : new LocalStatsRepo();
