import { PointEstimate } from "../../../types";

export const PointEstimateValues: Record<PointEstimate, number> = {
  [PointEstimate.Eight]: 8,
  [PointEstimate.Four]: 4,
  [PointEstimate.One]: 1,
  [PointEstimate.Two]: 2,
  [PointEstimate.Zero]: 0,
};

export const formatEstimatedPoints = (pointEstimated: PointEstimate) =>
  PointEstimateValues[pointEstimated];
