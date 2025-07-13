import SlimSelect from 'slim-select';
import 'slim-select/styles';
import { setCategoriesToSelect } from '../ui/categorySelectRenderer';

setCategoriesToSelect();

const baseSettings = {
  showSearch: false,
  allowDeselect: false,
  hideSelected: true,
  placeholderText: '',
  closeOnSelect: true,
};

new SlimSelect({
  select: '#filters-categories-select',
  settings: baseSettings,
});

new SlimSelect({
  select: '#filters-sort-select',
  settings: baseSettings,
});
