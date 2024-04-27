// @ts-nocheck
import {
  CommandButton,
  FloatingToolbar,
  useActive,
  useAttrs,
  useChainedCommands,
  useCurrentSelection,
  useExtensionEvent,
  useUpdateReason,
} from '@remirror/react';
import { Input, Popover } from 'antd';
import type { ChangeEvent, KeyboardEvent } from 'react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  createMarkPositioner,
  LinkExtension,
  ShortcutHandlerProps,
} from 'remirror/extensions';

function useLinkShortcut() {
  const [linkShortcut, setLinkShortcut] = useState<
    ShortcutHandlerProps | undefined
  >();
  const [isEditing, setIsEditing] = useState(false);

  useExtensionEvent(
    LinkExtension,
    'onShortcut',
    useCallback(
      (props) => {
        if (!isEditing) {
          setIsEditing(true);
        }

        return setLinkShortcut(props);
      },
      [isEditing],
    ),
  );

  return { linkShortcut, isEditing, setIsEditing };
}

function useFloatingLinkState() {
  const chain = useChainedCommands();
  const { isEditing, linkShortcut, setIsEditing } = useLinkShortcut();
  const { to, empty } = useCurrentSelection();

  const url = (useAttrs().link()?.href as string) ?? '';
  const [href, setHref] = useState<string>(url);

  // A positioner which only shows for links.
  const linkPositioner = useMemo(
    () => createMarkPositioner({ type: 'link' }),
    [],
  );

  const onRemove = useCallback(() => chain.removeLink().focus().run(), [chain]);

  const updateReason = useUpdateReason();

  useLayoutEffect(() => {
    if (!isEditing) {
      return;
    }

    if (updateReason.doc || updateReason.selection) {
      setIsEditing(false);
    }
  }, [isEditing, setIsEditing, updateReason.doc, updateReason.selection]);

  useEffect(() => {
    setHref(url);
  }, [url]);

  const submitHref = useCallback(() => {
    setIsEditing(false);
    const range = linkShortcut ?? undefined;

    if (href === '') {
      chain.removeLink();
    } else {
      chain.updateLink({ href, auto: false }, range);
    }

    chain.focus(range?.to ?? to).run();
  }, [setIsEditing, linkShortcut, chain, href, to]);

  const cancelHref = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  const clickEdit = useCallback(() => {
    if (empty) {
      chain.selectLink();
    }

    setIsEditing(true);
  }, [chain, empty, setIsEditing]);

  return useMemo(
    () => ({
      href,
      setHref,
      linkShortcut,
      linkPositioner,
      isEditing,
      clickEdit,
      onRemove,
      submitHref,
      cancelHref,
    }),
    [
      href,
      linkShortcut,
      linkPositioner,
      isEditing,
      clickEdit,
      onRemove,
      submitHref,
      cancelHref,
    ],
  );
}

export const FloatingLinkToolbar = () => {
  const {
    isEditing,
    linkPositioner,
    clickEdit,
    onRemove,
    submitHref,
    href,
    setHref,
    cancelHref,
  } = useFloatingLinkState();
  const active = useActive();
  const activeLink = active.link();
  const { empty } = useCurrentSelection();

  const handleClickEdit = useCallback(() => {
    clickEdit();
  }, [clickEdit]);

  const linkEditButtons = activeLink ? (
    <>
      <CommandButton
        commandName="updateLink"
        onSelect={handleClickEdit}
        icon="pencilLine"
        enabled
      />
      <CommandButton
        commandName="removeLink"
        onSelect={onRemove}
        icon="linkUnlink"
        enabled
      />
    </>
  ) : (
    <CommandButton
      commandName="updateLink"
      onSelect={handleClickEdit}
      icon="link"
      enabled
    />
  );

  return (
    <>
      {!isEditing && (
        <FloatingToolbar className="z-[99999]" children={linkEditButtons} />
      )}
      {!isEditing && empty && (
        <FloatingToolbar
          className="z-[99999]"
          positioner={linkPositioner}
          children={linkEditButtons}
        />
      )}

      <Popover
        placement="top"
        open={isEditing}
        content={
          <Input
            autoFocus
            placeholder="Enter link..."
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setHref(event.target.value)
            }
            value={href}
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
              const { code } = event;
              if (code === 'Enter' || code === 'NumpadEnter') {
                submitHref();
              }

              if (code === 'Escape') {
                cancelHref();
              }
            }}
          />
        }
      />
    </>
  );
};
