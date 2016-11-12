import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

import { TaskQuestionEditorComponent } from './questions/task-question-editor.component';
import { TaskQuestionComponent } from './questions/task-question.component';
import { TaskQuestionsComponent } from './questions/task-questions.component';
import { NavbarComponent } from './navbar/index';
import { PanelComponent } from './panel/panel.component';
import { TogglableFormComponent } from './togglable-form/togglable-form.component';
import { EditableFormComponent, EditableFormContentComponent, EditableFormReadOnlyComponent  } from './editable-form/editable-form.component';
import { PanelBodyComponent } from './panel-body/panel-body.component';
import { CardComponent } from './card/card.component';
import { ListComponent } from './list/list.component';
import { TileComponent } from './tile/tile.component';
import { MarkDownViewerComponent } from './markdown/markdown-viewer.component';
import { FaComponent } from 'angular2-fontawesome/components';
import { DisqusComponent } from './disqus/disqus.component';

import { RoleGuard, TaskStatusHighlighterDirective } from './index';

import { AuthHttpService, AuthenticationService, CurrentUserService, AuthGuard, HomeGuard } from './services/index';
import { ErrorHandlerService } from './services/error-handler.service';
import { TagInputModule } from 'ng2-tag-input';
import { TagsComponent } from './tags/tags.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
/**AuthenticationService
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, MaterialModule.forRoot(), TagInputModule],
  declarations: [NavbarComponent, PanelComponent, TogglableFormComponent,
  ListComponent, PanelBodyComponent, CardComponent, TileComponent,MarkDownViewerComponent,
  FaComponent, DisqusComponent, TaskQuestionsComponent, TaskQuestionComponent,
   TaskQuestionEditorComponent, EditableFormComponent,
   EditableFormContentComponent, EditableFormReadOnlyComponent,
   TagsComponent, DatePickerComponent, TaskStatusHighlighterDirective],
  exports: [NavbarComponent, PanelComponent, TogglableFormComponent, CardComponent,
  ListComponent, PanelBodyComponent, TileComponent,  CommonModule, FormsModule,
   RouterModule, FaComponent, MarkDownViewerComponent,
   DisqusComponent,TaskQuestionsComponent,TaskQuestionComponent, TaskQuestionEditorComponent
   , MaterialModule, EditableFormComponent, EditableFormContentComponent,
   EditableFormReadOnlyComponent, TagsComponent, DatePickerComponent, TaskStatusHighlighterDirective]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ AuthenticationService,
      AuthHttpService, CurrentUserService, AuthGuard, RoleGuard, HomeGuard, ErrorHandlerService]
    };
  }
}
