import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';

export default function RussianDatePicker({ value, onChange }) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      locale={ru}
      dateFormat="dd.MM.yyyy"
      placeholderText="Выберите дату"
      className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white w-full"
      calendarStartDay={1} 
    />
  );
}
