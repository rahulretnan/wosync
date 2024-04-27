import { TableExtension } from '@remirror/extension-react-tables';
import {
  EditorComponent,
  Remirror,
  RemirrorProps,
  TableComponents,
  ThemeProvider,
  useRemirror,
  UseThemeProps,
} from '@remirror/react';
import { AllStyledComponent } from '@remirror/styles/emotion';
import * as linkify from 'linkifyjs';
import { FC, PropsWithChildren, useCallback } from 'react';
import { CreateEditorStateProps } from 'remirror';
import {
  BlockquoteExtension,
  BulletListExtension,
  FontSizeExtension,
  HardBreakExtension,
  LinkExtension,
  NodeFormattingExtension,
  PlaceholderExtension,
  wysiwygPreset,
} from 'remirror/extensions';
import { FloatingLinkToolbar } from './link-edit-dialog';
import { TopToolbar } from './top-toolbar';

export interface ReactEditorProps
  extends Pick<CreateEditorStateProps, 'stringHandler'>,
    Pick<RemirrorProps, 'initialContent' | 'editable' | 'autoFocus' | 'hooks'> {
  placeholder?: string;
  theme?: UseThemeProps['theme'];
}

export type WysiwygEditorProps = Partial<ReactEditorProps>;

export const WysiwygEditor: FC<PropsWithChildren<WysiwygEditorProps>> = ({
  placeholder,
  stringHandler,
  children,
  theme,
  ...rest
}) => {
  const findAutoLinks = (str: string) =>
    linkify.find(str).map((link) => ({
      text: link.value,
      href: link.href,
      start: link.start,
      end: link.end,
    }));
  const isValidUrl = (input: string) => linkify.test(input);
  const extensions = useCallback(
    () => [
      new PlaceholderExtension({ placeholder }),
      new BlockquoteExtension(),
      new NodeFormattingExtension({}),
      new BulletListExtension({}),
      new TableExtension({}),
      new FontSizeExtension({ defaultSize: '16', unit: 'px' }),
      new LinkExtension({
        autoLink: true,
        selectTextOnClick: true,
        findAutoLinks,
        isValidUrl,
        defaultTarget: '_blank',
      }),
      new HardBreakExtension(),
      ...wysiwygPreset(),
    ],
    [placeholder],
  );

  const { manager } = useRemirror({ extensions, stringHandler });

  return (
    <AllStyledComponent>
      <ThemeProvider theme={theme}>
        <Remirror manager={manager} {...rest}>
          <TopToolbar />
          <FloatingLinkToolbar />
          <EditorComponent />
          <TableComponents />
          {children}
        </Remirror>
      </ThemeProvider>
    </AllStyledComponent>
  );
};
