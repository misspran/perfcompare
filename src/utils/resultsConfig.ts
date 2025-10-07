import { getPlatformShortName } from './platform';
import { CompareResultsItem, MannWhitneyResultsItem } from '../types/state';
import {
  CompareResultsMannWhitneyTableConfig,
  CompareResultsTableConfig,
} from '../types/types';

export const EFFECT_SIZE = [
  { label: 'No value', key: 'none' },
  { label: 'Low', key: 'low' },
  { label: 'Medium', key: 'medium' },
  { label: 'High', key: 'high' },
];

export const OS_SYSTEMS = [
  { label: 'Windows', key: 'windows' },
  { label: 'macOS', key: 'osx' },
  { label: 'Linux', key: 'linux' },
  { label: 'Android', key: 'android' },
  { label: 'iOS', key: 'ios' },
];

export const CHANGES_DIRECTION = [
  { label: 'No changes', key: 'none' },
  { label: 'Improvement', key: 'improvement' },
  { label: 'Regression', key: 'regression' },
];

export const studentTConfigs: CompareResultsTableConfig = [
  {
    name: 'Platform',
    filter: true,
    key: 'platform',
    gridWidth: '2fr',
    possibleValues: OS_SYSTEMS,
    matchesFunction(result: CompareResultsItem, valueKey: string) {
      const label = this.possibleValues.find(
        ({ key }: { key: string }) => key === valueKey,
      )?.label;
      const platformName = getPlatformShortName(result.platform);
      return platformName === label;
    },
  },
  {
    name: 'Base',
    key: 'base',
    gridWidth: '1fr',
    tooltip: 'A summary of all values from Base runs using a mean.',
  },
  {
    key: 'comparisonSign',

    gridWidth: '0.2fr',
  },
  {
    name: 'New',
    key: 'new',
    gridWidth: '1fr',
    tooltip: 'A summary of all values from New runs using a mean.',
  },
  {
    name: 'Status',
    filter: true,
    key: 'status',
    gridWidth: '1.5fr',
    possibleValues: CHANGES_DIRECTION,
    matchesFunction(
      result: MannWhitneyResultsItem | CompareResultsItem,
      valueKey: string,
    ) {
      switch (valueKey) {
        case 'improvement':
          return result.is_improvement;
        case 'regression':
          return result.is_regression;
        default:
          return !result.is_improvement && !result.is_regression;
      }
    },
  },
  {
    name: 'Delta',
    key: 'delta',
    gridWidth: '1fr',
    sortFunction(resultA: CompareResultsItem, resultB: CompareResultsItem) {
      return (
        Math.abs(resultA.delta_percentage) - Math.abs(resultB.delta_percentage)
      );
    },
    tooltip: 'The percentage difference between the Base and New values',
  },
  {
    name: 'Confidence',
    filter: true,
    key: 'confidence',
    gridWidth: '1.5fr',
    tooltip:
      "Calculated using a Student's T-test comparison. Low is anything under a T value of 3, Medium is between 3 and 5, and High is anything higher than 5.",
    possibleValues: EFFECT_SIZE,
    matchesFunction(result: CompareResultsItem, valueKey: string) {
      switch (valueKey) {
        case 'none':
          return !result.confidence_text;
        default: {
          const label = this.possibleValues.find(
            ({ key }: { key: string }) => key === valueKey,
          )?.label;
          return result.confidence_text === label;
        }
      }
    },
    sortFunction(resultA: CompareResultsItem, resultB: CompareResultsItem) {
      const confidenceA =
        resultA.confidence_text && resultA.confidence !== null
          ? resultA.confidence
          : -1;
      const confidenceB =
        resultB.confidence_text && resultB.confidence !== null
          ? resultB.confidence
          : -1;
      return confidenceA - confidenceB;
    },
  },
];

export const mannWhitneyConfig: CompareResultsMannWhitneyTableConfig = [
  {
    name: 'Platform',
    filter: true,
    key: 'platform',
    gridWidth: '2fr',
    possibleValues: OS_SYSTEMS,
    matchesFunction(result: MannWhitneyResultsItem, valueKey: string) {
      const label = this.possibleValues.find(
        ({ key }: { key: string }) => key === valueKey,
      )?.label;
      const platformName = getPlatformShortName(result.platform);
      return platformName === label;
    },
  },
  {
    name: 'Base',
    key: 'base',
    gridWidth: '1fr',
    tooltip: 'A summary of all values from Base runs using a mean.',
  },
  {
    key: 'comparisonSign',

    gridWidth: '0.2fr',
  },
  {
    name: 'New',
    key: 'new',
    gridWidth: '1fr',
    tooltip: 'A summary of all values from New runs using a mean.',
  },
  {
    name: 'Status',
    filter: true,
    key: 'status',
    gridWidth: '1.5fr',
    possibleValues: CHANGES_DIRECTION,
    matchesFunction(result: MannWhitneyResultsItem, valueKey: string) {
      switch (valueKey) {
        case 'improvement':
          return result.is_improvement;
        case 'regression':
          return result.is_regression;
        default:
          return !result.is_improvement && !result.is_regression;
      }
    },
  },
  {
    name: `Cliff's Delta`,
    key: 'cliffs-delta',
    gridWidth: '1.5fr',
    sortFunction(
      resultA: MannWhitneyResultsItem,
      resultB: MannWhitneyResultsItem,
    ) {
      return (
        Math.abs(resultA?.cliffs_delta ?? 0) -
        Math.abs(resultB?.cliffs_delta ?? 0)
      );
    },
    tooltip: `Cliff's Delta is a way to measure how different two groups are.`,
  },
  {
    name: `P-Value`,
    key: 'p-value',
    gridWidth: '1.5fr',
    sortFunction(
      resultA: MannWhitneyResultsItem,
      resultB: MannWhitneyResultsItem,
    ) {
      if (!resultA.mann_whitney_test || !resultB.mann_whitney_test) return 0;
      return (
        Math.abs(resultA.mann_whitney_test?.pvalue) -
        Math.abs(resultB.mann_whitney_test?.pvalue)
      );
    },
    tooltip: `Cliff's Delta is a way to measure how different two groups are.`,
  },

  {
    name: 'CLES',
    filter: true,
    key: 'effect-size',
    gridWidth: '1.5fr',
    tooltip: '',
    possibleValues: EFFECT_SIZE,
    matchesFunction(result, valueKey) {
      switch (valueKey) {
        case 'none':
          return !result.cles?.effect_size;
        default: {
          const label = this.possibleValues.find(
            ({ key }) => key === valueKey,
          )?.label;
          return result.cles?.effect_size === label;
        }
      }
    },
    sortFunction(
      resultA: MannWhitneyResultsItem,
      resultB: MannWhitneyResultsItem,
    ) {
      if (!resultA.mann_whitney_test || !resultB.mann_whitney_test) return 0;
      return (
        Math.abs(resultA?.mann_whitney_test?.pvalue) -
        Math.abs(resultB?.mann_whitney_test?.pvalue)
      );
    },
  },
  {
    name: 'Total Runs',
    key: 'runs',
    gridWidth: '1fr',
    tooltip: 'The total number of tasks/jobs that ran for this metric.',
  },
  // We use the real pixel value for the buttons, so that everything is better aligned.
  { key: 'buttons', gridWidth: `calc(3.5 * 34px)` }, // 2 or 3 buttons, so at least 3*34px, but give more so that it can "breathe"
  { key: 'expand', gridWidth: '34px' }, // 1 button
];
