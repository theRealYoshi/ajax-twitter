(function ($) {

  $.UserSearch = function(el){
    this.$el = $(el);
    this.$searchField = $('.search-field');
    this.$ul = $('.users');
    this.$searchField.keyup(this.handleInput.bind(this));
  };

  $.UserSearch.prototype.handleInput = function() {
    this.txt = this.$searchField.val();
    var that = this;
    $.ajax ({
      url: '/users/search',
      type: 'get',
      data: {query: this.txt},
      dataType: 'json',
      success: function (responseData) {
        that.renderResults(responseData);
        console.log(responseData);
      }
    });
  };

  $.UserSearch.prototype.renderResults = function (responseData) {
    this.$ul.empty();
    for (var i = 0; i < responseData.length; i++) {
      var $button = ("<button type='button' data-user-id='"+responseData[i].id +"' class='follow-toggle' data-initial-follow-state='"+responseData[i].followed+"'></button>");
      this.$ul.append('<li><a>' + responseData[i].username + '</a></li>');
      this.$ul.append($button);
    }
    this.$ul.find('button').followToggle();
  };

  $.fn.usersSearch = function () {
    return this.each(function () {
      new $.UserSearch(this);
    });
  };

})(jQuery);

$(function () {
  $("div.users-search").usersSearch();
});
