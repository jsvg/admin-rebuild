// C application-ui
import Ember from 'ember';
const { $, Component, run } = Ember;
export default Component.extend({

  didInsertElement() {
    run.next(() => {
      this.adminLTELogic();
    });
  },

  adminLTELogic() {

    $.AdminLTE = {};

    $(() => {
      // setup object, activate the layout maker, sidebar tree view, pushMenus
      _init();
      $.AdminLTE.layout.activate();
      $.AdminLTE.tree();
    });

    function _init() {
      $.AdminLTE.layout = {
        activate() {
          this.fix();
          $(window, ".wrapper").resize(() => {
            this.fix();
          });
        },
        fix() {
          // adjusts content window size
          // get window height and the wrapper height
          const neg = $('.main-footer').outerHeight();
          const window_height = $(window).height();
          const sidebar_height = $(".sidebar").height();
          if (window_height >= sidebar_height) {
            $(".content-wrapper, .right-side").css('min-height', window_height - neg);
          } else {
            $(".content-wrapper, .right-side").css('min-height', sidebar_height);
          }
        }
      };

      $.AdminLTE.tree = function () {
        const layoutFix = this.layout.fix;
        const animationSpeed = 'fast';
        $('.sidebar').on('click', 'li a', function (e) {
          // get the clicked link and the next element
          const link = $(this);
          const menuList = link.next();

          // check if the next element is (1) a tree-view menu, (2) visible, (3) sidebar isn't collapsed
          // and if so, close it
          if ( menuList.is('.treeview-menu') && menuList.is(':visible') && !$('body').hasClass('sidebar-collapse') ) {
            menuList.slideUp(animationSpeed, function () {
              menuList.removeClass('menu-open');
            });
          }
          else if ( menuList.is('.treeview-menu') && !menuList.is(':visible') ) {
            const parent = link.parents('ul').first();
            const ul = parent.find('ul:visible').slideUp(animationSpeed);
            ul.removeClass('menu-open');
            menuList.slideDown(animationSpeed, function () {
              menuList.addClass('menu-open');
              layoutFix();
            });
          }
          // if this isn't a link, prevent the page from being redirected to # by <a> tag
          if (menuList.is('.treeview-menu')) {
            e.preventDefault();
          }
        });
      };
    }
  },

  actions: {
    toggleAside() {
      $('body').toggleClass('sidebar-collapse');
    }
  }
});