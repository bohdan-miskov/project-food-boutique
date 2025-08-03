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
  settings: { ...baseSettings, ariaLabel: 'Choose product category' },
});

document
  .querySelector<HTMLElement>('.ss-content')
  ?.setAttribute('aria-label', 'Choose product category');

new SlimSelect({
  select: '#filters-sort-select',
  settings: { ...baseSettings, ariaLabel: 'Choose products sort mode' },
});

const selectArray = <NodeListOf<HTMLElement>>(
  document.querySelectorAll('.ss-content')
);

if (selectArray.length < 2) {
  throw new Error('Filter selects is not found');
}

selectArray[0].setAttribute('aria-label', 'Choose product category');
selectArray[1].setAttribute('aria-label', 'Choose products sort mode');
