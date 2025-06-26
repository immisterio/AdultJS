(function() {
  'use strict';

  var Defined = {
    use_api: 'AdultJS'
  };

  Lampa.Lang.add({
    lampac_adultName: {
      ru: 'Для взрослых',
      en: 'Adult 18+',
      uk: 'Для взрослых',
      zh: 'Adult 18+'
    }
  });

  var network = new Lampa.Reguest();
  var preview_timer, preview_video;

  function sourceTitle(title) {
    return Lampa.Utils.capitalizeFirstLetter(title.split('.')[0]);
  }

  function qualityDefault(qualitys) {
    var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
    var url;

    if (qualitys) {
      for (var q in qualitys) {
        if (q.indexOf(preferably) == 0) url = qualitys[q];
      }

      if (!url) url = qualitys[Lampa.Arrays.getKeys(qualitys)[0]];
    }

    return url;
  }

  function play(element) {
    var controller_enabled = Lampa.Controller.enabled().name;

    if (element.json) {
      Lampa.Loading.start(function() {
        network.clear();
        Lampa.Loading.stop();
      });
      Api.qualitys(element.video, function(data) {
        if (data.error) {
          Lampa.Noty.show(Lampa.Lang.translate('torrent_parser_nofiles'));
          Lampa.Loading.stop();
          return;
        }

        var qualitys = data.qualitys || data;
        var recomends = data.recomends || [];
        Lampa.Loading.stop();

        var video = {
          title: element.name,
          url: qualityDefault(qualitys),
          url_reserve: data.qualitys_proxy ? qualityDefault(data.qualitys_proxy) : false,
          quality: qualitys,
		  headers: data.headers_stream
        };
        Lampa.Player.play(video);

        if (recomends.length) {
          recomends.forEach(function(a) {
            a.title = Lampa.Utils.shortText(a.name, 50);
            a.icon = '<img class="size-youtube" src="' + a.picture + '" />';
            a.template = 'selectbox_icon';

            a.url = function(call) {
              if (a.json) {
                Api.qualitys(a.video, function(data) {
                  a.quality = data.qualitys;
                  a.url = qualityDefault(data.qualitys);
                  if (data.qualitys_proxy) a.url_reserve = qualityDefault(data.qualitys_proxy);
                  call();
                });
              } else {
                a.url = a.video;
                call();
              }
            };
          });
          Lampa.Player.playlist(recomends);
        } else {
          Lampa.Player.playlist([video]);
        }

        Lampa.Player.callback(function() {
          Lampa.Controller.toggle(controller_enabled);
        });
      }, function() {
        Lampa.Noty.show(Lampa.Lang.translate('torrent_parser_nofiles'));
        Lampa.Loading.stop();
      });
    } else {
      var video = {
        title: element.name,
        url: qualityDefault(element.qualitys) || element.video,
        url_reserve: qualityDefault(element.qualitys_proxy) || element.video_reserve || '',
        quality: element.qualitys
      };
      Lampa.Player.play(video);
      Lampa.Player.playlist([video]);
      Lampa.Player.callback(function() {
        Lampa.Controller.toggle(controller_enabled);
      });
    }
  }

  function fixCards(json) {
    json.forEach(function(m) {
      m.background_image = m.picture;
      m.poster = m.picture;
      m.img = m.picture;
      m.name = Lampa.Utils.capitalizeFirstLetter(m.name).replace(/\&(.*?);/g, '');
    });
  }

  function hidePreview() {
    clearTimeout(preview_timer);

    if (preview_video) {
      var vid = preview_video.find('video')
			  
	  var pausePromise;

		try{
			pausePromise = vid.pause()
		}
		catch(e){ }

		if (pausePromise !== undefined) {
			pausePromise.then(function(){
				
			})
			.catch(function(e){
				
			});
		}
      preview_video.addClass('hide');
      preview_video = false;
    }
  }

  function preview(target, element) {
    hidePreview();
    preview_timer = setTimeout(function() {
      if (!element.preview || !Lampa.Storage.field('sisi_preview')) return;
      var video = target.find('video');
      var container = target.find('.sisi-video-preview');

      if (!video) {
        video = document.createElement('video');
        container = document.createElement('div');
        container.addClass('sisi-video-preview');
        container.style.position = 'absolute';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.left = '0';
        container.style.top = '0';
        container.style.overflow = 'hidden';
        container.style.borderRadius = '1em';
        video.style.position = 'absolute';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.left = '0';
        video.style.top = '0';
        video.style.objectFit = 'cover';
        container.append(video);
        target.find('.card__view').append(container);
        video.src = element.preview; // 'https://thumb-v4.xhcdn.com/a/og0z25CtaTIZXgzkV7qJ8Q/023/463/094/526x298.44.t.webm'
		video.addEventListener('ended', function() {
			container.addClass('hide')
		})
        video.load();
      }

      preview_video = container;
	  
	  var playPromise;

		try{
			playPromise = video.play()
		}
		catch(e){ }


		if (playPromise !== undefined) {
			playPromise.then(function(){
				
			})
			.catch(function(e){
				
			});
		}

      container.removeClass('hide');
    }, 1500);
  }

  function fixList(list) {
    list.forEach(function(a) {
      if (!a.quality && a.time) a.quality = a.time;
    });
    return list;
  }
  
  function menu$2(target, card_data) {
    var cm = [];

    if (card_data.related) {
      cm.push({
        title: 'Похожие',
        related: true
      });
    }

    if (card_data.model) {
      cm.push({
        title: card_data.model.name,
        model: true
      });
    }

    Lampa.Select.show({
      title: 'Меню',
      items: cm,
      onSelect: function onSelect(m) {
        if (m.model) {
          Lampa.Activity.push({
            url: card_data.model.uri,
            title: 'Модель - ' + card_data.model.name,
            component: 'sisi_view_' + Defined.use_api,
            page: 1
          });
        } else if (m.related) {
          Lampa.Activity.push({
            url: card_data.video + '&related',
            title: 'Похожие - ' + card_data.title,
            component: 'sisi_view_' + Defined.use_api,
            page: 1
          });
        }
      },
      onBack: function onBack() {
        Lampa.Controller.toggle('content');
      }
    });
  }

  var Utils = {
    sourceTitle: sourceTitle,
    play: play,
    fixCards: fixCards,
    preview: preview,
    hidePreview: hidePreview,
    fixList: fixList,
    menu: menu$2
  };

  var menu$1;

  function ApiPWA() {
    var _this = this;

    var network = new Lampa.Reguest();

    this.menu = function(success, error) {
      if (menu$1) return success(menu$1);
	  var data = AdultJS.Menu();
      if (data) {
          menu$1 = data;
          success(menu$1);
        } else {
          error(data.msg);
        }
    };

    this.view = function(params, success, error) {
	  AdultJS.Invoke(Lampa.Utils.addUrlComponent(params.url, 'pg=' + (params.page || 1))).then(function(json) {
        if (json.list) {
          json.results = Utils.fixList(json.list);
          json.collection = true;
          json.total_pages = json.total_pages || 30;
          Utils.fixCards(json.results);
          delete json.list;
          success(json);
        } else {
          error();
        }
      })["catch"](function() {
        console.log('AdultJS', 'no load', params.url);
        error();
      });
    };

    this.playlist = function(add_url_query, oncomplite, error) {
      var load = function load() {
        var status = new Lampa.Status(menu$1.length);

        status.onComplite = function(data) {
          var items = [];
          menu$1.forEach(function(m) {
            if (data[m.playlist_url] && data[m.playlist_url].results.length) items.push(data[m.playlist_url]);
          });
          if (items.length) oncomplite(items);
          else error();
        };

        menu$1.forEach(function(m, i) {
          var separator = m.playlist_url.indexOf('?') !== -1 ? '&' : '?';
          var url_query = add_url_query.indexOf('?') !== -1 || add_url_query.indexOf('&') !== -1 ? add_url_query.substring(1) : add_url_query;

          var b = false;
          var w = setTimeout(function() {
            b = true;
            status.error();
          }, 1000 * 8);
		  AdultJS.Invoke(m.playlist_url + separator + url_query).then(function(json) {
            clearTimeout(w);
            if (b) return;

            if (json.list) {
              json.title = Utils.sourceTitle(m.title);
              json.results = Utils.fixList(json.list);
              json.url = m.playlist_url;
              json.collection = true;
              json.line_type = 'none';
              json.card_events = {
                onMenu: Utils.menu,
                onEnter: function onEnter(card, element) {
                  Utils.hidePreview();
                  Utils.play(element);
                }
              };
              Utils.fixCards(json.results);
              delete json.list;
              status.append(m.playlist_url, json);
            } else {
              status.error();
            }
          })["catch"](function() {
            console.log('AdultJS', 'no load', m.playlist_url + separator + url_query);
            clearTimeout(w);
            status.error();
          });
        });
      };

      if (menu$1) load();
      else {
        _this.menu(load, error);
      }
    };

    this.main = function(params, oncomplite, error) {
      this.playlist('', oncomplite, error);
    };

    this.search = function(params, oncomplite, error) {
      this.playlist('?search=' + encodeURIComponent(params.query), oncomplite, error);
    };

    this.qualitys = function(video_url, oncomplite, error) {
      AdultJS.Invoke(video_url).then(oncomplite)["catch"](function(e) {
        console.log('AdultJS', 'no load', video_url);
        error();
      });
    };

    this.clear = function() {
      network.clear();
    };
  }

  var Api = new ApiPWA();

  function Sisi(object) {
    var comp = new Lampa.InteractionMain(object);

    comp.create = function() {
      this.activity.loader(true);
      Api.main(object, this.build.bind(this), this.empty.bind(this));
      return this.render();
    };

    comp.empty = function(er) {
      var _this = this;

      var empty = new Lampa.Empty({
        descr: typeof er == 'string' ? er : Lampa.Lang.translate('empty_text_two')
      });
      Lampa.Activity.all().forEach(function(active) {
        if (_this.activity == active.activity) active.activity.render().find('.activity__body > div')[0].appendChild(empty.render(true));
      });
      this.start = empty.start;
      this.activity.loader(false);
      this.activity.toggle();
    };

    comp.onMore = function(data) {
      Lampa.Activity.push({
        url: data.url,
        title: data.title,
        component: 'sisi_view_' + Defined.use_api,
        page: 2
      });
    };

    comp.onAppend = function(line, element) {
      line.onAppend = function(card) {
        var origFocus = card.onFocus;

        card.onFocus = function(target, card_data) {
          origFocus(target, card_data);
          Utils.preview(target, card_data);
        };
      };
    };

    return comp;
  }

  function View(object) {
    var comp = new Lampa.InteractionCategory(object);
    var menu;

    comp.create = function() {
      var _this = this;

      this.activity.loader(true);
      Api.view(object, function(data) {
        menu = data.menu;

        if (menu) {
          menu.forEach(function(m) {
            var spl = m.title.split(':');
            m.title = spl[0].trim();
            if (spl[1]) m.subtitle = Lampa.Utils.capitalizeFirstLetter(spl[1].trim().replace(/all/i, 'Любой'));

            if (m.submenu) {
              m.submenu.forEach(function(s) {
                s.title = Lampa.Utils.capitalizeFirstLetter(s.title.trim().replace(/all/i, 'Любой'));
              });
            }
          });
        }

        _this.build(data);
		
      }, this.empty.bind(this));
    };

    comp.nextPageReuest = function(object, resolve, reject) {
      Api.view(object, resolve.bind(this), reject.bind(this));
    };

    comp.cardRender = function(object, element, card) {
      card.onMenu = function(target, card_data) {
        return Utils.menu(target, card_data);
      };

      card.onEnter = function() {
        Utils.hidePreview();
        Utils.play(element);
      };

      var origFocus = card.onFocus;

      card.onFocus = function(target, card_data) {
        origFocus(target, card_data);
        Utils.preview(target, element);
      };
    };

    comp.filter = function() {
      if (menu) {
        var items = menu.filter(function(m) {
          return !m.search_on;
        });
        var search = menu.find(function(m) {
          return m.search_on;
        });
        if (!search) search = object.search_start;
        if (!items.length && !search) return;

        if (search) {
          Lampa.Arrays.insert(items, 0, {
				title: 'Найти',
				onSelect: function onSelect() {
				  $('body').addClass('ambience--enable')
				  Lampa.Input.edit({
					title: 'Поиск',
					value: '',
					free: true,
					nosave: true
				  }, function (value) {
					$('body').removeClass('ambience--enable')
					Lampa.Controller.toggle('content');

					if (value) {
					  var separator = search.playlist_url.indexOf('?') !== -1 ? '&' : '?';
					  Lampa.Activity.push({
						url: search.playlist_url + separator + 'search=' + encodeURIComponent(value),
						title: 'Поиск - ' + value,
						component: 'sisi_view_' + Defined.use_api,
						search_start: search,
						page: 1
					  });
					}
				  });
				}
			  });
        }

        Lampa.Select.show({
          title: 'Фильтр',
          items: items,
          onBack: function onBack() {
            Lampa.Controller.toggle('content');
          },
          onSelect: function onSelect(a) {
            menu.forEach(function(m) {
              m.selected = m == a ? true : false;
            });

            if (a.submenu) {
              Lampa.Select.show({
                title: a.title,
                items: a.submenu,
                onBack: function onBack() {
                  comp.filter();
                },
                onSelect: function onSelect(b) {
                  Lampa.Activity.push({
                    title: object.title,
                    url: b.playlist_url,
                    component: 'sisi_view_' + Defined.use_api,
                    page: 1
                  });
                }
              });
            } else {
              comp.filter();
            }
          }
        });
      }
    };

    comp.onRight = comp.filter.bind(comp);
    return comp;
  }
  
	

  function startPlugin() {
    window['plugin_adultjs_' + Defined.use_api + '_ready'] = true;

    Lampa.Component.add('sisi_' + Defined.use_api, Sisi);
    Lampa.Component.add('sisi_view_' + Defined.use_api, View); 

    function addFilter() {
      var activi;
      var timer;
      var button = $("<div class=\"head__action head__settings selector\">\n            <svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <rect x=\"1.5\" y=\"1.5\" width=\"35\" height=\"33\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"3\"></rect>\n                <rect x=\"7\" y=\"8\" width=\"24\" height=\"3\" rx=\"1.5\" fill=\"currentColor\"></rect>\n                <rect x=\"7\" y=\"16\" width=\"24\" height=\"3\" rx=\"1.5\" fill=\"currentColor\"></rect>\n                <rect x=\"7\" y=\"25\" width=\"24\" height=\"3\" rx=\"1.5\" fill=\"currentColor\"></rect>\n                <circle cx=\"13.5\" cy=\"17.5\" r=\"3.5\" fill=\"currentColor\"></circle>\n                <circle cx=\"23.5\" cy=\"26.5\" r=\"3.5\" fill=\"currentColor\"></circle>\n                <circle cx=\"21.5\" cy=\"9.5\" r=\"3.5\" fill=\"currentColor\"></circle>\n            </svg>\n        </div>");
      button.hide().on('hover:enter', function() {
        if (activi) {
          activi.activity.component().filter();
        }
      });
      $('.head .open--search').after(button);
      Lampa.Listener.follow('activity', function(e) {
        if (e.type == 'start') activi = e.object;
        clearTimeout(timer);
        timer = setTimeout(function() {
          if (activi) {
            if (activi.component !== 'sisi_view_' + Defined.use_api) {
              button.hide();
              activi = false;
            }
          }
        }, 1000);

        if (e.type == 'start' && e.component == 'sisi_view_' + Defined.use_api) {
          button.show();
          activi = e.object;
        }
      });
    }

    function addSettings() {
      if (window.sisi_add_param_ready) return;
		window.sisi_add_param_ready = true;
      Lampa.SettingsApi.addComponent({
        component: 'AdultJS',
        name: Lampa.Lang.translate('lampac_adultName'),
        icon: "<svg width=\"200\" height=\"243\" viewBox=\"0 0 200 243\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M187.714 130.727C206.862 90.1515 158.991 64.2019 100.983 64.2019C42.9759 64.2019 -4.33044 91.5669 10.875 130.727C26.0805 169.888 63.2501 235.469 100.983 234.997C138.716 234.526 168.566 171.303 187.714 130.727Z\" stroke=\"currentColor\" stroke-width=\"15\"/><path d=\"M102.11 62.3146C109.995 39.6677 127.46 28.816 169.692 24.0979C172.514 56.1811 135.338 64.2018 102.11 62.3146Z\" stroke=\"currentColor\" stroke-width=\"15\"/><path d=\"M90.8467 62.7863C90.2285 34.5178 66.0667 25.0419 31.7127 33.063C28.8904 65.1461 68.8826 62.7863 90.8467 62.7863Z\" stroke=\"currentColor\" stroke-width=\"15\"/><path d=\"M100.421 58.5402C115.627 39.6677 127.447 13.7181 85.2149 9C82.3926 41.0832 83.5258 35.4214 100.421 58.5402Z\" stroke=\"currentColor\" stroke-width=\"15\"/><rect x=\"39.0341\" y=\"98.644\" width=\"19.1481\" height=\"30.1959\" rx=\"9.57407\" fill=\"currentColor\"/><rect x=\"90.8467\" y=\"92.0388\" width=\"19.1481\" height=\"30.1959\" rx=\"9.57407\" fill=\"currentColor\"/><rect x=\"140.407\" y=\"98.644\" width=\"19.1481\" height=\"30.1959\" rx=\"9.57407\" fill=\"currentColor\"/><rect x=\"116.753\" y=\"139.22\" width=\"19.1481\" height=\"30.1959\" rx=\"9.57407\" fill=\"currentColor\"/><rect x=\"64.9404\" y=\"139.22\" width=\"19.1481\" height=\"30.1959\" rx=\"9.57407\" fill=\"currentColor\"/><rect x=\"93.0994\" y=\"176.021\" width=\"19.1481\" height=\"30.1959\" rx=\"9.57407\" fill=\"currentColor\"/></svg>"
      });
      Lampa.SettingsApi.addParam({
        component: 'AdultJS',
        param: {
          name: 'sisi_preview',
          type: 'trigger',
          values: '',
          "default": true
        },
        field: {
          name: 'Предпросмотр',
          description: 'Показывать предпросмотр при наведение на карточку'
        },
        onRender: function onRender(item) {}
      });
    }

    function add() {
      var button = $("<li class=\"menu__item selector\" data-action=\"adultjs\">\n            <div class=\"menu__ico\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 29.461 29.461\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\"><g><path d=\"M28.855 13.134c-.479 0-.91-.197-1.371-.452-1.671 7.509-10.383 11.899-12.765 12.972-2.514-1.125-12.034-5.916-12.963-14.188-.043.029-.088.056-.132.084-.411.269-.797.523-1.299.523-.064 0-.121-.029-.184-.038C1.586 22.377 14.72 27.47 14.72 27.47s12.227-4.74 14.386-14.362a1.397 1.397 0 0 1-.251.026z\" fill=\"currentColor\" ></path><path d=\"M29.379 8.931C28.515-.733 16.628.933 14.721 6.432 12.814.932.928-.733.062 8.931c-.397 4.426 1.173.063 3.508 1.205 1.008.494 1.99 2.702 3.356 2.974 1.998.397 3.109-1.551 4.27-1.631 3.174-.222 2.394 6.596 5.424 5.586 1.961-.653 2.479-3.016 4.171-2.806 1.582.195 3.296-3.711 4.78-3.571 2.471.23 4.305 3.786 3.808-1.757z\" fill=\"currentColor\" ></path><path d=\"M14.894 21.534c2.286 0-.929-3.226-.588-4.511-1.994 1.276-1.697 4.511.588 4.511z\" fill=\"currentColor\"></path></g></svg>\n            </div>\n            <div class=\"menu__text\">" + Lampa.Lang.translate('lampac_adultName') + "</div>\n        </li>");

      if (true) {
        var pw = $('<div>JS</div>');
        pw.css({
          position: 'absolute',
          right: '-0.4em',
          bottom: '-0.4em',
          color: '#fff',
          fontSize: '0.6em',
          borderRadius: '0.5em',
          fontWeight: 900,
          textTransform: 'uppercase'
        });
        button.find('.menu__ico').css('position', 'relative').append(pw);
      }

      button.on('hover:enter', function() {
        // Проверка и создание Lampa.ParentalControl, если не существует
        if (!Lampa.ParentalControl) {
            Lampa.ParentalControl = {
            query: function(success, error) {
                // По умолчанию всегда разрешает доступ
                if (typeof success === 'function') success();
            }
            };
        }
        Lampa.ParentalControl.query(function() {
          Api.menu(function(data) {
            var items = [];

            data.forEach(function(a) {
              a.title = Utils.sourceTitle(a.title);
            });
            items = items.concat(data);
            Lampa.Select.show({
              title: 'Сайты',
              items: items,
              onSelect: function onSelect(a) {
                if (a.playlist_url) {
                  Lampa.Activity.push({
                    url: a.playlist_url,
                    title: a.title,
                    component: 'sisi_view_' + Defined.use_api,
                    page: 1
                  });
                } else {
                  Lampa.Activity.push({
                    url: '',
                    title: Lampa.Lang.translate('lampac_adultName'),
                    component: 'sisi_' + Defined.use_api,
                    page: 1
                  });
                }
              },
              onBack: function onBack() {
                Lampa.Controller.toggle('menu');
              }
            });
          }, function() {});
        }, function() {});
      });
      $('.menu .menu__list').eq(0).append(button);
      addFilter();
      addSettings();
    }

    if (window.appready) add();
    else {
      Lampa.Listener.follow('app', function(e) {
        if (e.type == 'ready') add();
      });
    }
  }

  if (!window['plugin_adultjs_' + Defined.use_api + '_ready'])
	  startPlugin();

})();