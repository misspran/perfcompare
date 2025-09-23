import Grid from '@mui/material/Grid';

import RunValues from './RunValues';
import type { CompareResultsItem, CompareResultsMannWhitneyUItem } from '../../types/state';

function MannWhitneyUDistribution(props: MannWhitneyUDistributionProps) {
  const { result } = props;
  const {
    base_runs: baseRuns,
    new_runs: newRuns,
    base_runs_replicates: baseRunsReplicates,
    new_runs_replicates: newRunsReplicates,
    base_app: baseApplication,
    new_app: newApplication,
    mann_pvalue: pValue,
    base_mean: baseMean,
    new_mean: newMean,
    base_median: baseMedian,
    new_median: newMedian,
    base_stddev: baseStddev,
    new_stddev: newStddev,
    base_stddev_pct: baseStddevPercent,
    new_stddev_pct: newStddevPercent,
    base_measurement_unit: baseUnit,
    new_measurement_unit: newUnit,
  } = result;

  const baseValues =
    baseRunsReplicates && baseRunsReplicates.length
      ? baseRunsReplicates
      : baseRuns;

  const baseRevisionRuns = {
    name: 'Base',
    avg: baseMean,
    median: baseMedian,
    values: baseValues,
    application: baseApplication,
    stddev: baseStddev,
    stddevPercent: baseStddevPercent,
    measurementUnit: baseUnit,
  };

  const newValues =
    newRunsReplicates && newRunsReplicates.length ? newRunsReplicates : newRuns;

  const newRevisionRuns = {
    name: 'New',
    avg: newMean,
    median: newMedian,
    values: newValues,
    application: newApplication,
    stddev: newStddev,
    stddevPercent: newStddevPercent,
    measurementUnit: newUnit,
  };

  return (
    <Grid container spacing={4} sx={{ marginBottom: 2 }}>
      <Grid
        size={{
          xs: 12,
          sm: 6,
        }}
      >
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
        }}
      >
      </Grid>
    </Grid>
  );
}

interface MannWhitneyUDistributionProps {
  result: CompareResultsMannWhitneyUItem;
}

export default MannWhitneyUDistribution;
