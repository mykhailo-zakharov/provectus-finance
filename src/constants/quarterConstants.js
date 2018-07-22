export const COLUMN_NAMES = ['Наименование Контрагента', 'Дата поступения денежных средств', 'Доллары', 'Гривна',
  'Курс НБУ на дату поступления', 'Эквивалент в гривне по курсу НБУ к налогообложению',
  'Сумма к налогообложению', 'Единый Налог', 'Назначение платежа', 'Actions'];

export const EN_VALUE = 0.05;

export const APPROVED = 'APPROVED';
export const REJECTED = 'REJECTED';
export const UNDEFINED = 'UNDEFINED';

export const STATUSES_COLOR_MAP =
  {
    APPROVED: 'lightgreen',
    REJECTED: '#EF9A9A',
    UNDEFINED: 'lightgray',
  };

export const FILTER_ALL_VALUE = 'ALL';

export const UPLOADER_APPEND_MODE = 'APPEND';
export const UPLOADER_FETCH_MODE = 'FETCH';

export const UNDEFINED_ERROR_MESSAGE = "У вас имеются записи с 'UNDEFINED' статусом, пожалуйста, установите статус 'APPROVED' или 'REJECTED' этим записям.";

