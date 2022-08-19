import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeControlService {

  public static DARK_THEME = 'dark';
  public static LIGHT_THEME = 'light';

  public isDashMode: boolean = false;
  private currentTheme: string;
  private renderer: Renderer2;

  private themeObs: Subject<string> = new Subject();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2,
    ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.currentTheme = ThemeControlService.LIGHT_THEME;
  }



  switchTheme(theme: string) {
    this.renderer.removeClass(this.document.documentElement, this.currentTheme);
    this.renderer.addClass(this.document.documentElement, theme)
    this.currentTheme = theme;
    this.isDashMode = this.currentTheme === ThemeControlService.DARK_THEME;
    this.emitTheme(theme);
    return this.loadTheme(false);
  }

  emitTheme(theme: string) {
    this.themeObs.next(theme);
  }

  themeChanged() {
    return this.themeObs.asObservable();
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const style = this.document.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      style.id = id;
      style.onload = resolve;
      style.onerror = reject;
      this.document.head.append(style);
    });
  }

  public loadTheme(firstLoad = true): Promise<Event> {
    const theme = this.currentTheme;
    if (firstLoad) {
      document.documentElement.classList.add(theme);
    }
    return new Promise<Event>((resolve, reject) => {
      this.loadCss(`${theme}.css`, theme).then(
        (e) => {
          if (!firstLoad) {
            this.document.documentElement.classList.add(theme);
          }
          // this.removeUnusedTheme(this.reverseTheme(theme));
          resolve(e);
        },
        (e) => reject(e)
      );
    });
  }
}
