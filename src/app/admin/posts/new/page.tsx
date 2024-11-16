'use client';

import { useCallback, useState } from 'react';

import { ProseMirror } from '@nytimes/react-prosemirror';

import { EditorState, type Transaction } from 'prosemirror-state';
import { ProseMirrorUnified } from 'prosemirror-unified';
import { GFMExtension } from 'prosemirror-remark';

import PageWrapper from '$/components/admin/PageWrapper/PageWrapper';
import { submit } from './actions';

export default function NewPost() {
  const pmu = new ProseMirrorUnified([new GFMExtension()]);

  const [title, setTitle] = useState<string>('');

  const [mount, setMount] = useState<HTMLElement | null>(null);
  const [state, setState] = useState<EditorState>(() =>
    EditorState.create({
      // Set the initial content of the editor from sourceMarkdown
      doc: pmu.parse(''),
      plugins: [pmu.inputRulesPlugin(), pmu.keymapPlugin()],
      schema: pmu.schema(),
    }),
  );

  const dispatchTransaction = useCallback((tr: Transaction) => setState(oldState => oldState.apply(tr)), []);

  return (
    <PageWrapper title="New post">
      <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
      <ProseMirror mount={mount} state={state} dispatchTransaction={dispatchTransaction}>
        <div ref={setMount} />
      </ProseMirror>
      <button onClick={() => submit(title, pmu.serialize(state.doc))}>Submit</button>
    </PageWrapper>
  );
}
