export function equalOrGreaterThanComparator(item, number) {
  return item >= number;
}

export function lessThanComparator(item, number) {
  return item < number;
}

export function itemsWithCertainValueConditionArr(
  dataArr,
  comparatorFx,
  number
) {
  return dataArr.filter((item) => comparatorFx(item, number));
}
