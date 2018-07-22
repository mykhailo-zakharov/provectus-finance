import { uniq, map, filter, find } from 'lodash';
import { EN_VALUE, STATUSES_COLOR_MAP, FILTER_ALL_VALUE, UNDEFINED } from '../constants/quarterConstants';

export const getQuaterRecordData = (data) => {
  const {
        counterpartyName,
        receivingDate,
        usdRevenue,
        uahRevenue,
        exchRateUsdUahNBUatReceivingDate,
        paymentPurpose,
      } = data;

  const equivalentUAH = usdRevenue * exchRateUsdUahNBUatReceivingDate;
  const taxationSum = equivalentUAH + uahRevenue;
  const ep = taxationSum * EN_VALUE;

  return {
    counterpartyName,
    receivingDate,
    usdRevenue,
    uahRevenue,
    exchRateUsdUahNBUatReceivingDate,
    paymentPurpose,
    equivalentUAH,
    taxationSum,
    ep,
  };
};

export const getRowColor = status => STATUSES_COLOR_MAP[status];

export const getFilterItems = (quarterRecordsData) => {
  const statusesArray = map(quarterRecordsData, record => record.taxationStatus);

  return uniq(statusesArray);
};

export const getFilterdRecords = (allRecords, filterValue) =>
  (filterValue === FILTER_ALL_VALUE
        ? allRecords
        : filter(allRecords, record => record.taxationStatus === filterValue));

export const isAnyUndefinedRecord = taxRecords => find(taxRecords, record =>
record.taxationStatus === UNDEFINED);

export const getIdModeUpload = (id) => {
  const dataArray = id.split('_');

  return { mode: dataArray[1], guid: dataArray[0] };
};

export const changeRecordStatus = (allRecords, currentRecordId, newStatus) => {
  const newRecords = map(allRecords, (record) => {
    const newRecord = record;

    if (currentRecordId === newRecord.id) {
      newRecord.taxationStatus = newStatus;
    }

    return newRecord;
  });

  return newRecords;
};

export const getDateString = date => (new Date(date)).toDateString();

