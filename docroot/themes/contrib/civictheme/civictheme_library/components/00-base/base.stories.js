// phpcs:ignoreFile
//
// Shared JS helpers for Storybook stories.
//

import { boolean } from '@storybook/addon-knobs';
import { LoremIpsum } from 'lorem-ipsum';
import CivicThemeTextfield from '../01-atoms/textfield/textfield.twig';
import CivicThemeSelect from '../01-atoms/select/select.twig';
import CivicThemeCheckbox from '../01-atoms/checkbox/checkbox.twig';
import CivicThemeRadio from '../01-atoms/radio/radio.twig';
import CivicThemeFormElement from '../02-molecules/field/field.twig';
import CivicThemeLabel from '../01-atoms/label/label.twig';
import CivicThemeDropdownFilter
  from '../02-molecules/dropdown-filter/dropdown-filter.twig';

export const getThemes = () => ({
  light: 'Light',
  dark: 'Dark',
});

export const demoImage = (idx) => {
  const images = [
    './assets/images/demo1.jpg',
    './assets/images/demo2.jpg',
    './assets/images/demo3.jpg',
  ];

  idx = Math.max(0, Math.min(idx, images.length)) || Math.floor(Math.random() * images.length);

  return images[idx];
};

export const demoVideos = () => [
  {
    url: './assets/videos/demo.webm',
    type: 'video/webm',
  },
  {
    url: './assets/videos/demo.mp4',
    type: 'video/mp4',
  },
  {
    url: './assets/videos/demo.avi',
    type: 'video/avi',
  },
];

export const demoVideoPoster = () => './assets/videos/demo_poster.png';

export const demoIcon = () => './assets/icons/megaphone.svg';

export const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const randomBool = (skew) => {
  skew = skew || 0.5;
  return Math.random() > skew;
};

export const randomString = (length) => randomText(length).substring(0, length).trim();

export const randomSentence = (words) => {
  words = words || randomInt(5, 25);
  return capitalizeFirstLetter(randomText(words));
};

export const randomText = (words) => {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });

  return lorem.generateWords(words);
};

export const randomUrl = (domain) => {
  domain = domain || 'http://example.com';
  return `${domain}/${(Math.random() + 1).toString(36).substring(7)}`;
};

export const randomLinks = (count, length, domain) => {
  const links = [];
  length = length || 0;

  for (let i = 0; i < count; i++) {
    links.push({
      text: `Link ${i + 1}${length ? ` ${randomString(randomInt(1, length))}` : ''}`,
      url: randomUrl(domain),
      is_new_window: randomBool(),
      is_external: randomBool(0.8),
    });
  }

  return links;
};

export const randomTags = (count, rand) => {
  const tags = [];
  rand = rand || false;

  for (let i = 0; i < count; i++) {
    tags.push(`Topic ${i + 1}${rand ? ` ${randomString(randomInt(2, 5))}` : ''}`);
  }

  return tags;
};

export const randomFormElement = (inputType, options, theme, rand, itr) => {
  const isCheckboxOrRadio = inputType === 'checkbox' || inputType === 'radio';

  const formElementOptions = {
    theme,
    type: inputType,
    label: CivicThemeLabel({
      theme,
      content: options.title ? options.title : `Input title ${itr + 1}${rand ? ` ${randomString(randomInt(2, 5))}` : ''}`,
      attributes: `for="field-${itr}"`,
      required: options.required,
    }),
    label_display: isCheckboxOrRadio ? 'after' : 'before',
    description_position: isCheckboxOrRadio ? 'after' : 'before',
    description: {
      content: options.description ? `Input description ${itr + 1}${rand ? ` ${randomText(randomInt(4, 10))}` : ''}` : '',
    },
    children: [],
    attributes: options.form_element_attributes,
  };
  let attributes = `id="field-${itr}"`;
  if (typeof options.attributes !== 'undefined') {
    attributes += options.attributes;
  }

  const inputOptions = {
    theme,
    type: inputType,
    attributes,
    required: options.required,
    value: typeof options.value !== 'undefined' ? options.value : randomString(randomInt(3, 8)),
  };

  switch (inputType) {
    case 'radio':
      formElementOptions.children.push(CivicThemeRadio(inputOptions));
      break;
    case 'checkbox':
      formElementOptions.children.push(CivicThemeCheckbox(inputOptions));
      break;
    case 'select':
      formElementOptions.children.push(CivicThemeSelect({
        ...inputOptions,
        options: inputOptions.value,
      }));
      break;
    default:
      formElementOptions.children.push(CivicThemeTextfield(inputOptions));
  }

  return CivicThemeFormElement(formElementOptions);
};

export const randomFormElements = (count, theme, rand) => {
  rand = rand || false;

  const inputTypes = [
    'text',
    'textarea',
    'tel',
    'password',
    'radio',
    'checkbox',
    'select',
  ];

  const requiredOptions = ['required', ''];

  const formElements = [];
  for (let i = 0; i < count; i++) {
    const inputType = inputTypes[Math.floor(Math.random() * inputTypes.length)];
    const required = [Math.floor(Math.random() * requiredOptions.length)];

    formElements.push(randomFormElement(
      inputType,
      {
        required,
      },
      theme,
      rand,
      i,
    ));
  }

  return formElements;
};

export const randomDropdownFilter = (filterType, numOfOptions, theme, rand, itr) => {
  const filterOptions = {
    filter_text: `Filter text ${itr + 1}${rand ? ` ${randomString(randomInt(2, 5))}` : ''}`,
    filter_group: 'filter_group',
    options_title: Math.round(Math.random()) ? 'Options title (optional)' : '',
  };
  const children = [];
  let count = itr * numOfOptions;
  for (let i = 1; i <= numOfOptions; i++) {
    const options = {
      required: false,
      description: false,
      attributes: '',
      value: randomString(randomInt(1, 8)),
    };
    options.attributes += filterType === 'radio' ? ` name="test_${itr}"` : ` name="${randomString(randomInt(3, 8))}"`;
    children.push(randomFormElement(filterType, options, theme, true, count++));
  }

  return CivicThemeDropdownFilter({
    theme,
    ...filterOptions,
    type: filterType,
    options: children.join(''),
  });
};

export const generateSlots = (names) => {
  const showSlots = boolean('Show story-slots', false, 'Slots');
  const obj = {};

  if (showSlots) {
    for (const i in names) {
      obj[names[i]] = `<div class="story-slot story-slot--${names[i]}">{{ ${names[i]} }}</div>`;
    }
  }

  return obj;
};

export const generateInputItems = (count, sameName = false, idx = null) => {
  const items = [];
  for (let i = 1; i <= count; i++) {
    const item = {
      label: `Item ${i}`,
      value: `${indexedString('item', idx)}-${i}`,
      name: sameName ? `${indexedString('control-name', idx)}` : `${indexedString('control-name', idx)}-${i}`,
      id: `${indexedString('control-id', idx)}-${i}`,
    };
    items.push(item);
  }
  return items;
};

export const generateSelectItems = (count, type = 'option', prefix = '') => {
  const items = [];
  for (let i = 1; i <= count; i++) {
    const item = {
      type,
      selected: false,
      label: type === 'optgroup' ? `Group ${i}` : `Item ${i}`,
      value: `${prefix}item-${i}`,
      items: type === 'optgroup' ? generateSelectItems(count, 'option', `group-${i}-`) : null,
    };
    items.push(item);
  }
  return items;
};

export const generateItems = (count, content) => {
  const items = [];
  for (let i = 1; i <= count; i++) {
    items.push(content);
  }
  return items;
};

export const placeholder = (content = 'Content placeholder') => `<div class="story-placeholder">${content}</div>`;

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const indexedString = function (prefix, idx = null) {
  return `${prefix}${idx !== null ? `-${idx}` : ''}`;
};

export const objectFromArray = (array) => {
  const obj = {};
  array.forEach((item) => {
    obj[item] = item;
  });
  return obj;
};

export const cleanCssIdentifier = function (string) {
  return string.toLowerCase()
    .replace(/(&\w+?;)/gim, ' ')
    .replace(/[_.~"<>%|'!*();:@&=+$,/?%#[\]{}\n`^\\]/gim, '')
    .replace(/(^\s+)|(\s+$)/gim, '')
    .replace(/\s+/gm, '-');
};

export const arrayCombine = function (keys, values) {
  const obj = {};

  if (!keys || !values || keys.constructor !== Array || values.constructor !== Array) {
    return false;
  }

  if (keys.length !== values.length) {
    return false;
  }

  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }

  return obj;
};

export const toLabels = function (values) {
  const arr = [];
  for (const i in values) {
    arr.push(capitalizeFirstLetter(values[i].replace(/[-_]/, ' ')));
  }
  return arr;
};
