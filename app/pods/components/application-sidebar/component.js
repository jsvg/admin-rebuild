import Ember from 'ember';
const { $, Component, run } = Ember;

export default Component.extend({
  tagName: 'aside',
  classNames: ['main-sidebar'],
  actions: {
    toggleTree(e) {
      console.log('a', e);
    }
  },

  didInsertElement() {
    run.next(() => {
      this.adminLTELogic();
    });
  },

  adminLTELogic() {

    $.AdminLTE = {};

    $(function () {

      //Fix for IE page transitions
      $("body").removeClass("hold-transition");

      //Set up the object
      _init();

      //Activate the layout maker
      $.AdminLTE.layout.activate();

      //Enable sidebar tree view controls
      $.AdminLTE.tree('.sidebar');

      //Activate sidebar push menu
      $.AdminLTE.pushMenu.activate("[data-toggle='offcanvas']");
    });

    function _init() {
      $.AdminLTE.layout = {
        activate() {
          this.fix();
          this.fixSidebar();
          $(window, ".wrapper").resize(() => {
            this.fix();
            this.fixSidebar();
          });
        },
        fix() {
          // get window height and the wrapper height
          const neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
          const window_height = $(window).height();
          const sidebar_height = $(".sidebar").height();
          // set the min-height of the content and sidebar based on the the height of the document
          if ($("body").hasClass("fixed")) {
            $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
          } else {
            let postSetWidth;
            if (window_height >= sidebar_height) {
              $(".content-wrapper, .right-side").css('min-height', window_height - neg);
              postSetWidth = window_height - neg;
            } else {
              $(".content-wrapper, .right-side").css('min-height', sidebar_height);
              postSetWidth = sidebar_height;
            }
          }
        },
        fixSidebar() {
          if (!$("body").hasClass("fixed")) {
            if (typeof $.fn.slimScroll !== 'undefined') {
              $(".sidebar").slimScroll({destroy: true}).height("auto");
            }
            return;
          }
          if (typeof $.fn.slimScroll !== 'undefined') {
            $(".sidebar").slimScroll({destroy: true}).height("auto");
            $(".sidebar").slimscroll({
              height: ($(window).height() - $(".main-header").height()) + "px",
              color: "rgba(0,0,0,0.2)",
              size: "3px"
            });
          }
        }
      };

      $.AdminLTE.pushMenu = {
        activate(toggleBtn) {
          //Get the screen sizes
          var screenSizes = { xs: 480, sm: 768, md: 992, lg: 1200 };
          //Enable sidebar toggle
          $(document).on('click', toggleBtn, function (e) {
            e.preventDefault();
            //Enable sidebar push menu
            if ($(window).width() > (screenSizes.sm - 1)) {
              if ($("body").hasClass('sidebar-collapse')) {
                $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
              } else {
                $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
              }
            }
            //Handle sidebar push menu for small screens
            else {
              if ($("body").hasClass('sidebar-open')) {
                $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
              } else {
                $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
              }
            }
          });

          $(".content-wrapper").click(function () {
            //Enable hide menu when clicking on the content-wrapper on small screens
            if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
              $("body").removeClass('sidebar-open');
            }
          });
        }
      };

      $.AdminLTE.tree = function (menu) {
        var _this = this;
        const animationSpeed = 'fast';
        $(menu).on('click', 'li a', function (e) {
          //Get the clicked link and the next element
          var $this = $(this);
          var checkElement = $this.next();

          //Check if the next element is a menu and is visible
          if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
            //Close the menu
            checkElement.slideUp(animationSpeed, function () {
              checkElement.removeClass('menu-open');
              //Fix the layout in case the sidebar stretches over the height of the window
              //_this.layout.fix();
            });
            checkElement.parent("li").removeClass("active");
          }
          //If the menu is not visible
          else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            //Get the parent menu
            var parent = $this.parents('ul').first();
            //Close all open menus within the parent
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            //Remove the menu-open class from the parent
            ul.removeClass('menu-open');
            //Get the parent li
            var parent_li = $this.parent("li");

            //Open the target menu and add the menu-open class
            checkElement.slideDown(animationSpeed, function () {
              //Add the class active to the parent li
              checkElement.addClass('menu-open');
              parent.find('li.active').removeClass('active');
              parent_li.addClass('active');
              //Fix the layout in case the sidebar stretches over the height of the window
              _this.layout.fix();
            });
          }
          //if this isn't a link, prevent the page from being redirected
          if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
          }
        });
      };

    }
  }

});