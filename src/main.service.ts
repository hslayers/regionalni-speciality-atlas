import { Injectable } from '@angular/core';
import View from 'ol/View';
import { HsConfig } from 'hslayers-ng';
import { Vector, Tile } from 'ol/layer';
import { XYZ, Vector as VectorSource } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { Style, Icon } from 'ol/style';
import { transform } from 'ol/proj';

@Injectable({providedIn: 'root'})
export class MainService {
  constructor(
    private HsConfig: HsConfig
  ) { 
  }

  init(): void {
    this.HsConfig.update({
      assetsPath: 'assets/hslayers-ng',
      proxyPrefix: '../proxy/',
      query: {
        multi: false
      },
      queryPoint: 'hidden',
      default_layers: [
        new Tile({
          source: new XYZ({
            attributions: ['Maps <a href="http://www.thunderforest.com">Thunderforest</a>', 'Data <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'],
            url: 'https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=820bd076452548f894e0059944475cb9',
          }),
          title: 'Base layer',
          base: true
        }),
        new Vector({
          title: 'Regionální speciality',
          source: new VectorSource({
            format: new GeoJSON(),
            url: 'https://db.atlasbestpractices.com/project-geo-json/3/',
          }),
          // style: styleFunction,
          // selectedStyle: highlightedStyleFunction,
          // highlightedStyle: highlightedStyleFunction,
          // featureURI: 'bp_uri',
          // ordering: {
          //   primary: 'position',
          //   secondary: 'bp_id',
          //   defaultReverse: ['position', 'bp_id'],
          // },
          // hsFilters: [
          //   {
          //     title: "Vyhledávání",
          //     valueFields: ["name", "description"],
          //     type: {
          //       type: "fulltext",
          //     },
          //     idField: "bp_id",
          //     suggestions: false
          //   },
          //   {
          //     title: 'Kategorie',
          //     valueField: 'tags',
          //     type: {
          //       type: 'arrayset',
          //       parameters: 'or',
          //     },
          //     options: {
          //       unselectText: 'Zrušit výběr',
          //       selectText: 'Vybrat vše',
          //     },
          //     selected: undefined,
          //     values: [],
          //     gatherValues: true
          //   },
          //   {
          //     title: 'E-shop',
          //     valueField: 'eshop_connect',
          //     type: {
          //       type: 'compare',
          //       parameters: 'neq',
          //     },
          //     selected: false,
          //     value: '',
          //   },
          // ]
        })
      ],
      project_name: 'erra/map',
      default_view: new View({
        center: [1452777.8396518824, 6355469.183800302],
        zoom: 10,
        units: "m"
      }),
      datasources: [],
      hostname: {
        "default": {
          "title": "Default",
          "type": "default",
          "editable": false,
          "url": this.getHostname()
        }
      },
      panelWidths: {
      },
      panelsEnabled: {
        language: true,
        composition_browser: false,
        legend: false,
        info: false,
        saveMap: false,
        draw: false,
        sensors: false,
        feature_crossfilter: false
      },
      layerTooltipDelay: 0,
      translationOverrides: {
        "en": {
          LAYERMANAGER: {
            'conditions': 'Related to environmental variables',
            'yield': 'Related to the length of (optimal) growing period of a crop',
            "mapContent": "Agro-climatic factors",
          },
          LAYERS: {
          }
        }
      }
    });
  }


  getHostname() {
    var url = window.location.href
    var urlArr = url.split("/");
    var domain = urlArr[2];
    return urlArr[0] + "//" + domain;
  }
}