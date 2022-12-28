import { Component, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { ConfigService } from '../@vex/config/config.service';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import { LayoutService } from '../@vex/services/layout.service';
import { ActivatedRoute } from '@angular/router';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { VexConfigName } from '../@vex/config/config-name.model';
import { ColorSchemeName } from '../@vex/config/colorSchemeName';
import { MatIconRegistry, SafeResourceUrlWithIconOptions } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ColorVariable, colorVariables } from '../@vex/components/config-panel/color-variables';
import { LoaderService } from './servicios/loader.service';

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private configService: ConfigService,
              private renderer: Renderer2,
              private platform: Platform,
              @Inject(DOCUMENT) private document: Document,
              @Inject(LOCALE_ID) private localeId: string,
              private layoutService: LayoutService,
              private route: ActivatedRoute,
              private navigationService: NavigationService,
              private splashScreenService: SplashScreenService,
              private readonly matIconRegistry: MatIconRegistry,
              private readonly domSanitizer: DomSanitizer,
              private loaderService: LoaderService
              ) {

    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    this.matIconRegistry.addSvgIconResolver(
      (
        name: string,
        namespace: string
      ): SafeResourceUrl | SafeResourceUrlWithIconOptions | null => {
        switch (namespace) {
          case 'mat':
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/material-design-icons/two-tone/${name}.svg`
            );

          case 'logo':
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/logos/${name}.svg`
            );

          case 'flag':
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/flags/${name}.svg`
            );
        }
      }
    );

    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap.subscribe(queryParamMap => {
      if (queryParamMap.has('layout')) {
        this.configService.setConfig(queryParamMap.get('layout') as VexConfigName);
      }

      if (queryParamMap.has('style')) {
        this.configService.updateConfig({
          style: {
            colorScheme: queryParamMap.get('style') as ColorSchemeName
          }
        });
      }

      if (queryParamMap.has('primaryColor')) {
        const color: ColorVariable = colorVariables[queryParamMap.get('primaryColor')];

        if (color) {
          this.configService.updateConfig({
            style: {
              colors: {
                primary: color
              }
            }
          });
        }
      }

      if (queryParamMap.has('rtl')) {
        this.configService.updateConfig({
          direction: coerceBooleanProperty(queryParamMap.get('rtl')) ? 'rtl' : 'ltr'
        });
      }
    });

    /**
     * Add your own routes here
     */
    this.navigationService.items = [
/*       {
        type: 'subheading',
        label: 'Dashboards',
        children: [
          {
            type: 'link',
            label: 'Analytics',
            route: '/',
            icon: 'mat:insights',
            routerLinkActiveOptions: { exact: true }
          }
        ]
      },
      {
        type: 'subheading',
        label: 'Apps',
        children: [
          {
            type: 'link',
            label: 'All-In-One Table',
            route: '/apps/aio-table',
            icon: 'mat:assignment'
          }
        ]
      }
      ,
      {
        type: 'subheading',
        label: 'UI Elements',
        children: [
          {
            type: 'dropdown',
            label: 'Components',
            icon: 'mat:bubble_chart',
            children: [
              {
                type: 'link',
                label: 'Overview',
                route: '/ui/components/overview'
              },
              {
                type: 'link',
                label: 'Autocomplete',
                route: '/ui/components/autocomplete'
              },
              {
                type: 'link',
                label: 'Buttons',
                route: '/ui/components/buttons'
              },
              {
                type: 'link',
                label: 'Button Group',
                route: '/ui/components/button-group'
              },
              {
                type: 'link',
                label: 'Cards',
                route: '/ui/components/cards'
              },
              {
                type: 'link',
                label: 'Checkbox',
                route: '/ui/components/checkbox'
              },
              {
                type: 'link',
                label: 'Dialogs',
                route: '/ui/components/dialogs'
              },
              {
                type: 'link',
                label: 'Grid List',
                route: '/ui/components/grid-list'
              },
              {
                type: 'link',
                label: 'Input',
                route: '/ui/components/input'
              },
              {
                type: 'link',
                label: 'Lists',
                route: '/ui/components/lists'
              },
              {
                type: 'link',
                label: 'Menu',
                route: '/ui/components/menu'
              },
              {
                type: 'link',
                label: 'Progress',
                route: '/ui/components/progress'
              },
              {
                type: 'link',
                label: 'Progress Spinner',
                route: '/ui/components/progress-spinner'
              },
              {
                type: 'link',
                label: 'Radio',
                route: '/ui/components/radio'
              },
              {
                type: 'link',
                label: 'Slide Toggle',
                route: '/ui/components/slide-toggle'
              },
              {
                type: 'link',
                label: 'Slider',
                route: '/ui/components/slider'
              },
              {
                type: 'link',
                label: 'Snack Bar',
                route: '/ui/components/snack-bar'
              },
              {
                type: 'link',
                label: 'Tooltip',
                route: '/ui/components/tooltip'
              },
            ]
          },
          {
            type: 'dropdown',
            label: 'Forms',
            icon: 'mat:format_color_text',
            children: [
              {
                type: 'link',
                label: 'Form Elements',
                route: '/ui/forms/form-elements'
              },
              {
                type: 'link',
                label: 'Form Wizard',
                route: '/ui/forms/form-wizard'
              }
            ]
          },
          {
            type: 'dropdown',
            label: 'Icons',
            icon: 'mat:star',
            children: [
              {
                type: 'link',
                label: 'Material Icons',
                route: '/ui/icons/ic'
              },
              {
                type: 'link',
                label: 'FontAwesome Icons',
                route: '/ui/icons/fa'
              }
            ]
          },
          {
            type: 'dropdown',
            label: 'Page Layouts',
            icon: 'mat:view_compact',
            children: [
              {
                type: 'dropdown',
                label: 'Card',
                children: [
                  {
                    type: 'link',
                    label: 'Default',
                    route: '/ui/page-layouts/card',
                    routerLinkActiveOptions: { exact: true }
                  },
                  {
                    type: 'link',
                    label: 'Tabbed',
                    route: '/ui/page-layouts/card/tabbed',
                  },
                  {
                    type: 'link',
                    label: 'Large Header',
                    route: '/ui/page-layouts/card/large-header',
                    routerLinkActiveOptions: { exact: true }
                  },
                  {
                    type: 'link',
                    label: 'Tabbed & Large Header',
                    route: '/ui/page-layouts/card/large-header/tabbed'
                  }
                ]
              },
              {
                type: 'dropdown',
                label: 'Simple',
                children: [
                  {
                    type: 'link',
                    label: 'Default',
                    route: '/ui/page-layouts/simple',
                    routerLinkActiveOptions: { exact: true }
                  },
                  {
                    type: 'link',
                    label: 'Tabbed',
                    route: '/ui/page-layouts/simple/tabbed',
                  },
                  {
                    type: 'link',
                    label: 'Large Header',
                    route: '/ui/page-layouts/simple/large-header',
                    routerLinkActiveOptions: { exact: true }
                  },
                  {
                    type: 'link',
                    label: 'Tabbed & Large Header',
                    route: '/ui/page-layouts/simple/large-header/tabbed'
                  }
                ]
              },
              {
                type: 'link',
                label: 'Blank',
                icon: 'mat:picture_in_picture',
                route: '/ui/page-layouts/blank'
              },
            ]
          },
        ]
      }
      , */
      {
        type: 'subheading',
        label: 'ENED',
        children: [
          {
            type: 'dropdown',
            label: 'Catalogos',
            icon: 'mat:bookmarks',
            children: [

              {
                type: 'link',
                label: 'Registro Docentes',
                route: '/components/docentes'
              },
              {
                type: 'link',
                label: 'Plan de Estudios',
                route: '/components/plan-estudios'
              },
              {
                type: 'link',
                label: 'Espacios Academicos',
                route: '/components/espacios-academicos'
              },
              {
                type: 'link',
                label: 'Oferta Educativa',
                route: '/components/oferta-educativa'
              },
              {
                type: 'link',
                label: 'Ciclo Escolar',
                route: '/components/ciclo-escolar'
              },
              {
                type: 'link',
                label: 'Grupos',
                route: '/components/grupos'
              },
              {
                type: 'link',
                label: 'Apertura Inscripción',
                route: '/components/apertura-inscripcion'
              },
              {
                type: 'link',
                label: 'Rama',
                route: '/components/rama'
              },
/*               {
                type: 'link',
                label: 'Horarios',
                route: '/components/horarios'
              }, */
              // {
              //   type: 'link',
              //   label: 'Calendario',
              //   route: '/components/calendario'
              // },
              {
                type: 'link',
                label: 'Deportes-Especialidad',
                route: '/components/deportes-especialidad'
              },
              {
                type: 'dropdown',
                label: 'Asignaturas',
                children: [

                  {
                    type: 'link',
                    label: 'Base',
                    route: '/components/asignatura/base'
                  },
                  {
                    type: 'link',
                    label: 'No base',
                    route: '/components/asignatura/no-base'
                  }
                ]
              },
              {
                type: 'link',
                label: 'Configuración materia no base',
                route: '/components/configuracion-materias-no-base'
              }

            ]
          },
          {
            type: 'dropdown',
            label: 'Administración',
            icon: 'mat:bubble_chart',
            children: [
              {
                type: 'link',
                label: 'Formularios',
                route: '/components/lista-formulario'
              },
              {
                type: 'link',
                label: 'Grupos opciones',
                route: '/components/lista-opciones'
              }
            ]
          },
          {
            type: 'dropdown',
            label: 'Aspirantes licenciatura',
            icon: 'mat:check_circle_outline',
            children: [
              {
                type: 'link',
                label: 'Documentos Preinscripción',
                route: '/components/validacion-documentos-preinscripcion'
              },
              {
                type: 'link',
                label: 'Seleccionar Aspirantes Licenciatura',
                route: '/components/seleccionar-aspirantes'
              },
              {
                type: 'link',
                label: 'Seleccionar Aspirantes Posgrado',
                route: '/components/seleccionar-aspirantes-posgrado'

              },
              {
                type: 'link',
                label: 'Proceso admisión',
                route: '/components/escalafon-aspirantes'
              }
            ]
          }
        ]
      }
 /*      ,
      {
        type: 'subheading',
        label: 'Convocatoria',
        children: [
          {
            type: 'dropdown',
            label: 'Preregistro',
            icon: 'mat:bubble_chart',
            children: [
              {
                type: 'link',
                label: 'Aspirante',
                route: '/no-auth/preregistro-aspirante'
              }
            ]
          },
          {
            type: 'dropdown',
            label: 'Formulario',
            icon: 'mat:bubble_chart',
            children: [
              {
                type: 'link',
                label: 'Aspirante',
                route: '/no-auth/formulario'
              }
            ]
          }
        ]
      } */
    ];
  }
}
