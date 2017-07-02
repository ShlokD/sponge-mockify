'use babel';

import SpongeMockifyView from './sponge-mockify-view';
import { CompositeDisposable } from 'atom';

export default {
  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sponge-mockify:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.spongeMockifyView.destroy();
  },

  serialize() {
  },

  spongeMockify(text) {
    if(text) {
      return text.split('').map((letter) => {
        const random = Math.floor(Math.random() * 30);
        return random % 2 === 0 ? letter.toUpperCase() : letter.toLowerCase();
      }).join('');
    }

    return "";
  },

  toggle() {
    let editor;
    if(editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText();
      let spongeText = this.spongeMockify(selection);
      editor.insertText(spongeText);
    }
  }

};
