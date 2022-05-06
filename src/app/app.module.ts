import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { PostagemComponent } from './postagem/postagem.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SobreNosComponent,
    PostagemComponent,
    MenuComponent,
    RodapeComponent,
    CadastroComponent,
    LoginComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
