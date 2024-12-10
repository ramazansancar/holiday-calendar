import type { PickerLocale } from 'antd/es/date-picker/generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    locale: 'tr_TR',
    yearFormat: 'YYYY',
    dayFormat: 'D',
    cellMeridiemFormat: 'A',
    monthBeforeYear: true,
    placeholder: 'Tarih seç',
    yearPlaceholder: 'Yıl seç',
    quarterPlaceholder: 'Çeyrek seç',
    monthPlaceholder: 'Ay seç',
    weekPlaceholder: 'Hafta seç',
    rangePlaceholder: ['Başlangıç tarihi', 'Bitiş tarihi'],
    rangeYearPlaceholder: ['Başlangıç yılı', 'Bitiş yılı'],
    rangeMonthPlaceholder: ['Başlangıç ayı', 'Bitiş ayı'],
    rangeWeekPlaceholder: ['Başlangıç haftası', 'Bitiş haftası'],

    today: 'Bugün',
    now: 'Şimdi',
    backToToday: 'Bugüne Geri Dön',
    ok: 'Tamam',
    clear: 'Temizle',
    month: 'Ay',
    year: 'Yıl',
    timeSelect: 'Zaman Seç',
    dateSelect: 'Tarih Seç',
    monthSelect: 'Ay Seç',
    yearSelect: 'Yıl Seç',
    decadeSelect: 'On Yıl Seç',

    dateFormat: 'DD/MM/YYYY',

    dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',

    previousMonth: 'Önceki Ay (PageUp)',
    nextMonth: 'Sonraki Ay (PageDown)',
    previousYear: 'Önceki Yıl (Control + Sol)',
    nextYear: 'Sonraki Yıl (Control + Sağ)',
    previousDecade: 'Önceki On Yıl',
    nextDecade: 'Sonraki On Yıl',
    previousCentury: 'Önceki Yüzyıl',
    nextCentury: 'Sonraki Yüzyıl',
    shortWeekDays: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
    shortMonths: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
  },
  timePickerLocale: {
    placeholder: 'Zaman seç',
    rangePlaceholder: ['Başlangıç zamanı', 'Bitiş zamanı'],
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;