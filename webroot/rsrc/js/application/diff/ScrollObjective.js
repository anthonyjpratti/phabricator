/**
 * @provides phabricator-scroll-objective
 * @requires javelin-dom
 *           javelin-util
 *           javelin-stratcom
 *           javelin-install
 *           javelin-workflow
 * @javelin
 */


JX.install('ScrollObjective', {

  construct : function() {
    var node = this.getNode();

    var onclick = JX.bind(this, this._onclick);
    JX.DOM.listen(node, 'click', null, onclick);
  },

  members: {
    _list: null,

    _node: null,
    _anchor: null,

    _visible: false,
    _callback: false,

    getNode: function() {
      if (!this._node) {
        var attributes = {
          className: 'scroll-objective'
        };

        var content = this._getIconObject().getNode();

        var node = JX.$N('div', attributes, content);

        this._node = node;
      }

      return this._node;
    },

    setCallback: function(callback) {
      this._callback = callback;
      return this;
    },

    setObjectiveList: function(list) {
      this._list = list;
      return this;
    },

    _getIconObject: function() {
      if (!this._iconObject) {
        this._iconObject = new JX.PHUIXIconView();
      }
      return this._iconObject;
    },

    _onclick: function(e) {
      (this._callback && this._callback(e));

      if (e.getPrevented()) {
        return;
      }

      e.kill();

      // This is magic to account for the banner, and should probably be made
      // less hard-coded.
      var buffer = 48;

      JX.DOM.scrollToPosition(null, JX.$V(this.getAnchor()).y - buffer);
    },

    setAnchor: function(node) {
      this._anchor = node;
      return this;
    },

    getAnchor: function() {
      return this._anchor;
    },

    setIcon: function(icon) {
      this._getIconObject().setIcon(icon);
      return this;
    },

    setColor: function(color) {
      this._getIconObject().setColor(color);
      return this;
    },

    setTooltip: function(tip) {
      var node = this._getIconObject().getNode();
      JX.Stratcom.addSigil(node, 'has-tooltip');
      JX.Stratcom.getData(node).tip = tip;
      JX.Stratcom.getData(node).align = 'W';
      return this;
    },

    show: function() {
      this._visible = true;
      return this;
    },

    hide: function() {
      this._visible = false;
    },

    isVisible: function() {
      return this._visible;
    }

  }

});
