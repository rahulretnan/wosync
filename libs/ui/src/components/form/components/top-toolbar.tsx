import {
  CommandButtonGroup,
  DecreaseFontSizeButton,
  FormattingButtonGroup,
  HeadingLevelButtonGroup,
  IncreaseFontSizeButton,
  IndentationButtonGroup,
  ListButtonGroup,
  TextAlignmentButtonGroup,
  Toolbar,
  VerticalDivider,
} from '@remirror/react';
import { FC } from 'react';
import FontSizeButtons from './buttons/fontsize-button';

export const TopToolbar: FC = () => {
  return (
    <Toolbar>
      <FormattingButtonGroup />
      <VerticalDivider />
      <TextAlignmentButtonGroup showAll />
      <VerticalDivider />
      <HeadingLevelButtonGroup showAll />
      <VerticalDivider />
      <CommandButtonGroup>
        <DecreaseFontSizeButton />
        <FontSizeButtons />
        <IncreaseFontSizeButton />
      </CommandButtonGroup>
      <VerticalDivider />
      <ListButtonGroup />
      <VerticalDivider />
      <IndentationButtonGroup />
    </Toolbar>
  );
};
