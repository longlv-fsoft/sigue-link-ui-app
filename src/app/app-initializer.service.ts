import { APP_INITIALIZER } from '@angular/core';
import { ThemeControlService } from './services/theme-control.service';

export const AppInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: (themeControlService: ThemeControlService) => () => {
    return themeControlService.loadTheme();
  },
  deps: [ThemeControlService],
  multi: true,
};
