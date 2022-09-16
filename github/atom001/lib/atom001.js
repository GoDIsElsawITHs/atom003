'use babel';

import Atom001View from './atom001-view';
import { CompositeDisposable } from 'atom';

export default {

  atom001View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atom001View = new Atom001View(state.atom001ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atom001View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom001:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atom001View.destroy();
  },

  serialize() {
    return {
      atom001ViewState: this.atom001View.serialize()
    };
  },

  toggle() {
    console.log('Atom001 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
