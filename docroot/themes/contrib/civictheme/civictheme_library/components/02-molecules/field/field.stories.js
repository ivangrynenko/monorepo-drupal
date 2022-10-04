// phpcs:ignoreFile
import { boolean, radios, text } from '@storybook/addon-knobs';
import CivicThemeField from './field.twig';
import { Select } from '../../01-atoms/select/select.stories';
import { Textfield } from '../../01-atoms/textfield/textfield.stories';
import { Textarea } from '../../01-atoms/textarea/textarea.stories';
import { Checkbox } from '../../01-atoms/checkbox/checkbox.stories';
import {
  CheckboxGroup,
} from '../../01-atoms/checkbox-group/checkbox-group.stories';
import { RadioGroup } from '../../01-atoms/radio-group/radio-group.stories';

export default {
  title: 'Molecules/Field',
  parameters: {
    layout: 'centered',
  },
};

export const Field = () => {
  const generalKnobTab = 'General';
  const generalKnobs = {
    theme: radios(
      'Theme',
      {
        Light: 'light',
        Dark: 'dark',
      },
      'light',
      generalKnobTab,
    ),
    type: radios(
      'Type',
      {
        Textfield: 'textfield',
        Textarea: 'textarea',
        Select: 'select',
        'Radio Group': 'radio-group',
        Checkbox: 'checkbox',
        'Checkbox Group': 'checkbox-group',
        Hidden: 'hidden',
        Other: 'other',
      },
      'textfield',
      generalKnobTab,
    ),
    direction: radios(
      'Direction',
      {
        Horizontal: 'horizontal',
        Vertical: 'vertical',
      },
      'vertical',
      generalKnobTab,
    ),
    control_direction: radios(
      'Control direction (for group controls)',
      {
        Horizontal: 'horizontal',
        Vertical: 'vertical',
      },
      'vertical',
      generalKnobTab,
    ),
    label: text('Label', 'Field label', generalKnobTab),
    description: text('Description', 'Content sample with long text that spans on the multiple lines to test text vertical spacing', generalKnobTab),
    is_required: boolean('Required', false, generalKnobTab),
    is_disabled: boolean('Disabled', false, generalKnobTab),
    is_invalid: boolean('Is invalid', false, generalKnobTab),
    message: text('Message', 'Content sample with long text that spans on the multiple lines to test text vertical spacing', generalKnobTab),
    modifier_class: `story-wrapper-size--medium ${text('Additional class', '', generalKnobTab)}`,
    attributes: text('Additional attributes', '', generalKnobTab),
  };

  generalKnobs.control = {};

  const controlKnobTab = 'Control';
  let controlKnobs = {};

  switch (generalKnobs.type) {
    case 'textfield':
      controlKnobs = Textfield(controlKnobTab, false);
      break;

    case 'textarea':
      controlKnobs = Textarea(controlKnobTab, false);
      break;

    case 'select':
      controlKnobs = Select(controlKnobTab, false);
      break;

    case 'checkbox':
      controlKnobs = Checkbox(controlKnobTab, false);
      break;

    case 'checkbox-group':
      controlKnobs = CheckboxGroup(controlKnobTab, false);
      break;

    case 'radio-group':
      controlKnobs = RadioGroup(controlKnobTab, false);
      break;

    default:
      controlKnobs = Textfield(controlKnobTab, false);
  }

  return CivicThemeField({
    ...generalKnobs,
    control: controlKnobs,
  });
};
