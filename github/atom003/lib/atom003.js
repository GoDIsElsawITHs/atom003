'use babel';

import Atom003View from './atom003-view';
import { CompositeDisposable } from 'atom';

export default {

  atom003View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atom003View = new Atom003View(state.atom003ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atom003View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom003:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atom003View.destroy();
  },

  serialize() {
    return {
      atom003ViewState: this.atom003View.serialize()
    };
  },

  toggle() {
    console.log('Atom003 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
