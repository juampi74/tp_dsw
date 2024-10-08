import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component.js';
import { ClientsComponent } from './cli-folder/cli/cli.component.js';
import { ClientFormComponent } from './cli-folder/cli-form/cli-form.component.js';
import { CategoriasComponent } from './cat-folder/cat/cat.component.js';
import { CategoriaFormComponent } from './cat-folder/cat-form/cat-form.component.js';
import { MarcasComponent } from './mar-folder/mar/mar.component.js';
import { MarcaFormComponent } from './mar-folder/mar-form/mar-form.component.js';
import { ColorsComponent } from './col-folder/col/col.component.js';
import { ColorFormComponent } from './col-folder/col-form/col-form.component.js';
import { SucursalesComponent } from './suc-folder/suc/suc.component.js';
import { SucursalFormComponent } from './suc-folder/suc-form/suc-form.component.js';
import { ModelosComponent } from './mod-folder/mod/mod.component.js';
import { ModeloFormComponent } from './mod-folder/mod-form/mod-form.component.js';
import { VehicleListComponent } from './veh-folder/veh-list/veh-list.component.js';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'clientes', component: ClientsComponent },
  { path: 'clientes/creacion', component: ClientFormComponent },
  { path: 'clientes/modificacion/:id', component: ClientFormComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'categorias/creacion', component: CategoriaFormComponent },
  { path: 'categorias/modificacion/:id', component: CategoriaFormComponent },
  { path: 'marcas', component: MarcasComponent },
  { path: 'marcas/creacion', component: MarcaFormComponent },
  { path: 'marcas/modificacion/:id', component: MarcaFormComponent },
  { path: 'colores', component: ColorsComponent },
  { path: 'colores/creacion', component: ColorFormComponent },
  { path: 'colores/modificacion/:id', component: ColorFormComponent },
  { path: 'sucursales', component: SucursalesComponent },
  { path: 'sucursales/creacion', component: SucursalFormComponent },
  { path: 'sucursales/modificacion/:id', component: SucursalFormComponent },
  { path: 'modelos', component: ModelosComponent },
  { path: 'modelos/creacion', component: ModeloFormComponent },
  { path: 'modelos/modificacion/:id', component: ModeloFormComponent },
  { path: 'vehiculos', component: VehicleListComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
