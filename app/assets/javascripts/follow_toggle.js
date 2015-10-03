(function ($) {

  $.FollowToggle = function (el, options) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id');
    this.followState = this.$el.data('initial-follow-state');
    this.render();
    this.$el.on("click", this.handleClick.bind(this));
  };

  $.FollowToggle.prototype.handleClick = function (e) {
    var ajaxType;

    e.preventDefault();
    var that = this;
    this.$el.prop('disabled', true);

    if(this.followState){
      ajaxType = "delete";
    } else {
      ajaxType = "post";
    }

    $.ajax({
      url: '/users/' + this.userId + "/follow",
      type: ajaxType,
      dataType: "json",
      success: function(responseData){
        that.followState = !that.followState;
        that.render();
        console.log(responseData);
      }
    });
  };

  $.FollowToggle.prototype.render = function () {
    this.$el.prop('disabled', false);

    if (this.followState) {
      this.$el.text("Unfollow!");
    } else {
      this.$el.text("Follow!");
    }
  };

  $.fn.followToggle = function (options) {
    return this.each(function () {
      new $.FollowToggle(this, options);
    });
  };

})(jQuery);

$(function () {
  $("button.follow-toggle").followToggle();
});
