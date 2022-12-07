import { AltaDocenteModel, CategoriaAcademico, DatosPersonaFisicaCURPModel, DepartamentoEned, NivelAcademico, PaisModel, PerfilAcademico, RelContactoDocente, RelDocente, RelDocenteComplex, TipoContacto, TipoContratacion, UbicacionGeograficaModel } from './../../../../modelos/Catalogos';
import { CatalogosServices } from 'src/app/servicios/catalogos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VariablesService } from 'src/app/servicios/variableGL.service';
import { RenapoService } from 'src/app/servicios/renapo.service';
import { MatTable } from '@angular/material/table';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { MatAccordion } from '@angular/material/expansion';

const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'delete_outline'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'delete_outline'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'delete_outline'},
];

@Component({
  selector: 'vex-registro-docentes',
  templateUrl: './registro-docentes.component.html',
  styleUrls: ['./registro-docentes.component.scss']
})


export class RegistroDocentesComponent implements OnInit {

  @ViewChild("tablaContacto") tablaContacto: MatTable<any>;
  @ViewChild(MatAccordion) accordion: MatAccordion;



  datosGeneralesHabilitados =  false;
  listaUbicaciones: UbicacionGeograficaModel[] = [];
  personaFisica = new DatosPersonaFisicaCURPModel();
  param: RelDocente
  patronCURP = '^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$'
  patronCodigoPostal = '^[0-9]{5}'
  formDocente: FormGroup;
  FormularioContacto: FormGroup;
  panelOpenState = false;

  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];//

  displayedColumns: string[] = [
    "tipoContacto",
    "contacto",
    "acciones",
  ];

  //dataSource = ELEMENT_DATA;
  dataSource = [];

  DocenteModel: DatosPersonaFisicaCURPModel
  listaPaises: PaisModel[] = [];
  listaTipoContacto: TipoContacto[] = [];
  listaCategoriasAcademico: CategoriaAcademico[] = [];
  listaTipoContratacion: TipoContratacion[] = [];
  listaNivelAcademico: NivelAcademico[] = [];
  listaPerfilAcademico: PerfilAcademico[] = [];
  listaDepartamentoEned: DepartamentoEned[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private catalogosServices: CatalogosServices,
    private toastService:VariablesService,
    private renapoService: RenapoService
    ) {

      if (this.route.snapshot.data['docente']) {
        this.param = this.route.snapshot.data['docente'];
        this.dataSource = this.param.relContactosDocente;
      } else {
        this.irNuevodocente();
      }
      console.log(this.param)
      this.iniciarForm();
    }


  async ngOnInit() {

    await this.llenarCatalogos();

    if(this.param){
      await this.llenarForm();
      this.curp.disable();
      this.emailInstitucional.disable();
    }



    //this.DocenteModel = await this.validarCURP();


  }
  onFocusOutEvent(event: any){

    const value=event.target.value;
this.curp.setValue(value.toUpperCase( ));
    console.log(event.target.value);
 
 }

  public async llenarCatalogos(){
    await this.obtenerPaises();
    await this.obtenerTiposContacto();
    await this.obtenerCategoriasAcademico();
    await this.obtenerTiposContratacion();
    await this.obtenerNivelAcademico();
    await this.obtenerDepartamentosEned();
    await this.obtenerPerfilAcademico();
  }

  public async obtenerPaises(){
    const respuesta = await this.catalogosServices.consultarPaises();
    this.listaPaises = respuesta.objeto ? respuesta.objeto : [];
  }

  public async obtenerTiposContacto(){
    const respuesta = await this.catalogosServices.consultarTipoContacto();
    this.listaTipoContacto = respuesta.objeto ? respuesta.objeto : [];
  }

  public async obtenerCategoriasAcademico(){
    const respuesta = await this.catalogosServices.consultarCategoriasAcademico();
    this.listaCategoriasAcademico =  respuesta.objeto ? respuesta.objeto : [];
  }

  public async obtenerTiposContratacion(){
    const respuesta = await this.catalogosServices.consultarTipoContratacion();
    this.listaTipoContratacion = respuesta.objeto ? respuesta.objeto : [];
  }

  public async obtenerNivelAcademico(){
    const respuesta = await this.catalogosServices.consultarNivelAcademico();
    this.listaNivelAcademico = respuesta.objeto ? respuesta.objeto : [];
  }

  public async obtenerDepartamentosEned(){
    const respuesta = await this.catalogosServices.consultarDepartamentosEned();
    this.listaDepartamentoEned = respuesta.objeto ? respuesta.objeto : [];
  }

  public async obtenerPerfilAcademico(){
    const respuesta = await this.catalogosServices.consultarPerfilAcademico();
    this.listaPerfilAcademico = respuesta.objeto ? respuesta.objeto : [];
  }

  //#region Formulario
  public iniciarForm() {
    this.formDocente = this.formBuilder.group({
      //#region datos Personales
   /*    curp: ['', [Validators.required,Validators.pattern(this.patronCURP)]],
      nombre: ['', [Validators.required]],
      apPaterno: ['', [Validators.required]],
      apMaterno: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      numInterior: ['', [Validators.required]],
      numExterior: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      cp: ['', [Validators.required]],
      tipoTelefono: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      turno: ['', [Validators.required]], */

      curp: ['', [Validators.required,Validators.pattern(this.patronCURP)]],
      nombre: [{value: '', disabled: true},[Validators.required]],
      apPaterno: [{value: '', disabled: true},[Validators.required]],
      apMaterno: [{value: '', disabled: true}],
      calle: [{value: '', disabled: true},[Validators.required]],
      numInterior: [{value: '', disabled: true},[Validators.required]],
      numExterior: [{value: '', disabled: true},[Validators.required]],
      colonia: [{value: '', disabled: true},[Validators.required]],
      pais: [{value: '', disabled: true},[Validators.required]],
      estado: [{value: '', disabled: true},[Validators.required]],
      municipio: [{value: '', disabled: true},[Validators.required]],
      emailInstitucional: ['',[Validators.required,Validators.email]],
      cp: [{value: '', disabled: true},[Validators.required,Validators.pattern(this.patronCodigoPostal)]],
      /* tipoTelefono: [{value: '', disabled: true}],
      numero: [{value: '', disabled: true}], */
      turno: [{value: '', disabled: true}],
      //#endregion

      //#region Datos Academicos
      categoria: ['', [Validators.required]],
      tipoContratacion: ['', [Validators.required]],
      nivelAcademico: ['', [Validators.required]],
      tieneAsignacion: [false, [Validators.required]],
      perfilAcademico: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      //#endregion

      //#region Disponibilidad
      horaInicio: ['', [Validators.required]],
      horaFin: ['', [Validators.required]],
      horasNombramiento: ['', [Validators.required]],
      horasFrenteGrupo: ['', [Validators.required]],
      horasDescarga: ['', [Validators.required]],
      //#endregion
    });

    this.FormularioContacto = this.formBuilder.group({
      tipoContacto: [null, [Validators.required]],
      contacto: [null, [Validators.required]]
    });

    this.FormularioContacto.get("tipoContacto").valueChanges.subscribe(
     async (tipocontacto) => {
      if(tipocontacto == 4){// 4 es correo
        const contactoControl = this.FormularioContacto.get("contacto");
        contactoControl.setValidators([Validators.required, Validators.email]);
        contactoControl.updateValueAndValidity();
      } else if(tipocontacto) {
        const contactoControl = this.FormularioContacto.get("contacto");
        contactoControl.setValidators([Validators.required]);
        contactoControl.updateValueAndValidity();
      }
     }
    );

  }

  get emailInstitucional() {return this.formDocente.get('emailInstitucional');}
  get curp()              { return this.formDocente.get('curp'); }
  get nombre()            { return this.formDocente.get('nombre'); }
  get apPaterno()         { return this.formDocente.get('apPaterno'); }
  get apMaterno()         { return this.formDocente.get('apMaterno'); }
  get calle()             { return this.formDocente.get('calle'); }
  get numInterior()       { return this.formDocente.get('numInterior'); }
  get numExterior()       { return this.formDocente.get('numExterior'); }
  get colonia()           { return this.formDocente.get('colonia'); }
  get pais()              { return this.formDocente.get('pais'); }
  get estado()            { return this.formDocente.get('estado'); }
  get municipio()         { return this.formDocente.get('municipio'); }
  get cp()                { return this.formDocente.get('cp'); }
/*   get tipoTelefono()      { return this.formDocente.get('tipoTelefono'); }
  get numero()            { return this.formDocente.get('numero'); } */

  get tipoContacto()      { return this.FormularioContacto.get('tipoContacto'); }
  get contacto()            { return this.FormularioContacto.get('contacto'); }

  get turno()             { return this.formDocente.get('turno'); }
  get categoria()         { return this.formDocente.get('categoria'); }
  get tipoContratacion()  { return this.formDocente.get('tipoContratacion'); }
  get nivelAcademico()    { return this.formDocente.get('nivelAcademico'); }
  get tieneAsignacion()   { return this.formDocente.get('tieneAsignacion'); }
  get perfilAcademico()   { return this.formDocente.get('perfilAcademico'); }
  get departamento()      { return this.formDocente.get('departamento'); }
  get horaInicio()        { return this.formDocente.get('horaInicio'); }
  get horaFin()           { return this.formDocente.get('horaFin'); }
  get horasNombramiento() { return this.formDocente.get('horasNombramiento'); }
  get horasFrenteGrupo()  { return this.formDocente.get('horasFrenteGrupo'); }
  get horasDescarga()     { return this.formDocente.get('horasDescarga'); }
  //#endregion

  public async enviar() {
    console.log(this.formDocente);
  }

  async consultarCurp(){

  }

  irAdocentes() {
    this.router.navigateByUrl('/components/docentes');
  }

  irNuevodocente() {
    this.router.navigateByUrl('/components/registro-docentes');
  }


  public async obtenerUbicacionGeografica(idUbicacionGeografica){
    const respuesta = await this.catalogosServices.consultarUbicacionGeograficaById(idUbicacionGeografica);
    return respuesta.objeto ? respuesta.objeto[0] : {};
  }


  public async llenarForm(){
    console.log('LLENAR form')
    this.curp.setValue(this.param.curp)
    await this.validarCURP();


    //PARA INSERTAR NUEVOS TELEFONOS
/*     this.tipoTelefono.setValue(this.param.docentecontactoId);
    this.numero.setValue(this.param.contacto); */
    this.turno.setValue('');
    this.categoria.setValue(this.param.categoriaacademicoId);
    this.tipoContratacion.setValue(this.param.tipocontratacionId);
    this.nivelAcademico.setValue(this.param.nivelacademicoId);
    this.tieneAsignacion.setValue(this.param.tieneasignacion);
    this.perfilAcademico.setValue(this.param.perfilacademicoId);
    this.departamento.setValue(this.param.deptoenedId);
    this.horaInicio.setValue(this.param.horarioInicio);
    this.horaFin.setValue(this.param.horarioFin);
    this.horasNombramiento.setValue(this.param.horasNombramiento);
    this.horasFrenteGrupo.setValue(this.param.horasFrentegrupo);
    this.horasDescarga.setValue(this.param.horasDescargaacademica);
    this.emailInstitucional.setValue(this.param.correo);
  }

  public habilitarDatosGenerales(habilitar: boolean){
    if(habilitar){
      this.cp.enable();
      this.calle.enable();
      this.numInterior.enable();
      this.numExterior.enable();
      this.colonia.enable();
      this.pais.enable();
      this.datosGeneralesHabilitados = true;
    } else {
      this.cp.disable();
      this.calle.disable();
      this.numInterior.disable();
      this.numExterior.disable();
      this.colonia.disable();
      this.pais.disable();
      this.datosGeneralesHabilitados = false;
    }
  }2.

  public async validarCURPRENAPO(){

    //SE LIMPIAN CAMPOS
    this.listaUbicaciones = [];
    this.nombre.setValue(null);
    this.apPaterno.setValue(null);
    this.apMaterno.setValue(null);
    this.calle.setValue(null);
    this.numInterior.setValue(null);
    this.numExterior.setValue(null);
    this.colonia.setValue(null);
    this.pais.setValue(null);
    this.estado.setValue(null);
    this.municipio.setValue(null);
    this.cp.setValue(null);


    const respuesta = await this.renapoService.ObtieneDatosCurp(this.curp.value);

    if(respuesta.StatusOper == 'EXITOSO'){
      this.personaFisica = new DatosPersonaFisicaCURPModel();
      this.personaFisica.curp  = respuesta.CURP;
      this.personaFisica.nombre = respuesta.nombres;
      this.personaFisica.paterno = respuesta.apellido1;
      this.personaFisica.materno = respuesta.apellido2;
      this.personaFisica.idGenero = respuesta.sexo == 'H' ? 1 : 2;

      var fechaNac = respuesta.fechNac.split('/');
      this.personaFisica.fechaNacimiento = fechaNac[2] + '-' + fechaNac[1] + '-' + fechaNac[0] + 'T00:00:00';

      this.nombre.setValue(this.personaFisica.nombre);
      this.apPaterno.setValue(this.personaFisica.paterno);
      this.apMaterno.setValue(this.personaFisica.materno);

      this.habilitarDatosGenerales(true);
    }

    console.log(respuesta) ;

  }





  public async validarCURP(){

    //SE LIMPIAN CAMPOS
    this.listaUbicaciones = [];
    this.nombre.setValue(null);
    this.apPaterno.setValue(null);
    this.apMaterno.setValue(null);
    this.calle.setValue(null);
    this.numInterior.setValue(null);
    this.numExterior.setValue(null);
    this.colonia.setValue(null);
    this.pais.setValue(null);
    this.estado.setValue(null);
    this.municipio.setValue(null);
    this.cp.setValue(null);



    const respuesta = await this.catalogosServices.validarCURP(this.curp.value);


    if(respuesta.exito){
      //this.toastService.toastSuccess('Se encontró registro en RENADE');
      this.personaFisica = respuesta.objeto;

      this.curp.setValue(this.personaFisica.curp);
      this.nombre.setValue(this.personaFisica.nombre);
      this.apPaterno.setValue(this.personaFisica.paterno);
      this.apMaterno.setValue(this.personaFisica.materno);
      this.calle.setValue(this.personaFisica.calle);
      this.numInterior.setValue(this.personaFisica.numInt);
      this.numExterior.setValue(this.personaFisica.numExt);

      this.pais.setValue(this.personaFisica.tblPaisId);

        //A apartir de catUbicaciongeograficaId se consumiria el servicio de ubicacion geografica y se llenarian los campos de direccion
       const ubicacion: UbicacionGeograficaModel =  await this.obtenerUbicacionGeografica(this.personaFisica.catUbicaciongeograficaId);

       this.listaUbicaciones = [];
       this.listaUbicaciones.push(ubicacion);



      this.estado.setValue(ubicacion.estado);
      this.municipio.setValue(ubicacion.municipio);
      this.cp.setValue(ubicacion.codigoPostal);
      //this.colonia.setValue(ubicacion.colonia);
      this.colonia.setValue(this.personaFisica.catUbicaciongeograficaId);
      this.habilitarDatosGenerales(false);

    } else {
      this.personaFisica = new DatosPersonaFisicaCURPModel();
      //this.toastService.toastErr(respuesta.error);

      this.validarCURPRENAPO();
    }



    //PARA INSERTAR NUEVOS TELEFONOS
    //this.tipoTelefono.setValue(datosPersonaFisica.);
    //this.numero.setValue();


    //this.turno.setValue();
    //this.categoria.setValue();
    //this.tipoContratacion.setValue();
    //this.nivelAcademico.setValue();
    //this.tieneAsignacion.setValue();
    //this.perfilAcademico.setValue();
    //this.departamento.setValue();
    //this.horaInicio.setValue();
    //this.horaFin.setValue();
    //this.horasNombramiento.setValue();
    //this.horasFrenteGrupo.setValue();
    //this.horasDescarga.setValue();


    //return respuesta.objeto ? respuesta.objeto : new DatosPersonaFisicaCURPModel();






  }


  public inicializarForm(){
/*
this.curp.setValue();
this.nombre.setValue();
this.apPaterno.setValue();
this.apMaterno.setValue();
this.calle.setValue();
this.numInterior.setValue();
this.numExterior.setValue();
this.colonia.setValue();
this.pais.setValue();
this.estado.setValue();
this.municipio.setValue();
this.cp.setValue();
this.tipoTelefono.setValue();
this.numero.setValue();
this.turno.setValue();
this.categoria.setValue();
this.tipoContratacion.setValue();
this.nivelAcademico.setValue();
this.tieneAsignacion.setValue();
this.perfilAcademico.setValue();
this.departamento.setValue();
this.horaInicio.setValue();
this.horaFin.setValue();
this.horasNombramiento.setValue();
this.horasFrenteGrupo.setValue();
this.horasDescarga.setValue();     */
  }



  public async consultarCatalogoPais(){
    const respuesta = await this.catalogosServices.consultarPaises();

  }

  public async altaDocente(){

    const docente = new AltaDocenteModel();
	  docente.controlEscolar.id= 0;
	  docente.controlEscolar.bovedaCatPersonafisicaId= this.personaFisica.idPersona;
	  docente.controlEscolar.catEstatusDocentesId= 1;
	  docente.controlEscolar.catDocentesContactoId= 1;
	  docente.controlEscolar.catCategoriaAcademicoId=  this.categoria.value;
	  docente.controlEscolar.catDepartamentoEnedId= this.departamento.value;
	  docente.controlEscolar.catPerfilAcademicoId= this.perfilAcademico.value;
	  docente.controlEscolar.bovedaCatTipoContratacionId= this.tipoContratacion.value;
	  docente.controlEscolar.bovedaCatNivelAcademicoId= this.nivelAcademico.value;
	  docente.controlEscolar.tieneasignacion= this.tieneAsignacion.value;
	  docente.controlEscolar.horarioInicio= this.horaInicio.value;
	  docente.controlEscolar.horarioFin= this.horaFin.value;
	  docente.controlEscolar.horasNombramiento= this.horasNombramiento.value;
	  docente.controlEscolar.horasFrentegrupo= this.horasFrenteGrupo.value;
	  docente.controlEscolar.horasDescargaacademica= this.horasDescarga.value
    docente.controlEscolar.relContactosDocente = this.dataSource;


    docente.cndBoveda.idPersona = this.personaFisica.idPersona;
    docente.cndBoveda.paterno = this.personaFisica.paterno  ? this.personaFisica.paterno : this.apPaterno.value;
    docente.cndBoveda.materno = this.personaFisica.materno  ? this.personaFisica.materno : this.apMaterno.value;
    docente.cndBoveda.nombre = this.personaFisica.nombre  ? this.personaFisica.nombre : this.nombre.value;
    docente.cndBoveda.curp = this.personaFisica.curp  ? this.personaFisica.curp : this.curp.value;
    docente.cndBoveda.fechaNacimiento = this.personaFisica.fechaNacimiento;
    docente.cndBoveda.fechaRegistro = this.personaFisica.fechaRegistro ? this.personaFisica.fechaRegistro : new Date();
    docente.cndBoveda.fechaModificacion = this.personaFisica.fechaModificacion ? this.personaFisica.fechaModificacion : new Date();
    docente.cndBoveda.activo = 1;
    docente.cndBoveda.idEscolaridad = this.personaFisica.idEscolaridad;
    docente.cndBoveda.idEstatusEscolaridad = this.personaFisica.idEstatusEscolaridad;
    docente.cndBoveda.calle = this.personaFisica.calle ? this.personaFisica.calle: this.calle.value;
    docente.cndBoveda.numExt = this.personaFisica.numExt ? this.personaFisica.numExt: this.numExterior.value
    docente.cndBoveda.numInt = this.personaFisica.numInt? this.personaFisica.numInt: this.numInterior.value
    docente.cndBoveda.idGenero = this.personaFisica.idGenero;
    docente.cndBoveda.extranjero = this.personaFisica.extranjero;
    docente.cndBoveda.tipoIdentificacion = this.personaFisica.tipoIdentificacion;
    docente.cndBoveda.numeroIdentificacion = this.personaFisica.numeroIdentificacion;
    docente.cndBoveda.catUbicaciongeograficaId = this.personaFisica.catUbicaciongeograficaId ? this.personaFisica.catUbicaciongeograficaId: this.colonia.value
    docente.cndBoveda.tblOrganismosId = this.personaFisica.tblOrganismosId;
    docente.cndBoveda.tokenFoto = this.personaFisica.tokenFoto;
    docente.cndBoveda.comentarioInactivo = this.personaFisica.comentarioInactivo;
    docente.cndBoveda.colonia = this.personaFisica.colonia ? this.personaFisica.colonia: this.listaUbicaciones.find(x=> x.id == this.colonia.value).colonia;
    docente.cndBoveda.fm3 = this.personaFisica.fm3;
    docente.cndBoveda.noPasaporte = this.personaFisica.noPasaporte;
    
    docente.cndBoveda.tblPaisId = this.personaFisica.tblPaisId ? this.personaFisica.tblPaisId: this.pais.value
    docente.cndBoveda.tblEquipoMultidiciplinarioId = this.personaFisica.tblEquipoMultidiciplinarioId;
    
    docente.cndBoveda.correo=this.emailInstitucional.value;

    const respuesta = await this.catalogosServices.agregarDocente(docente);
    if(respuesta.exito){
      this.toastService.toastSuccess(respuesta.mensaje);
      this.router.navigateByUrl('components/docentes')
    } else {
      this.toastService.toastErr(respuesta.error);
    }
  }


  public async actualizarDocente(){

    const docente = new RelDocenteComplex();
	  docente.id= this.param.id;
	  docente.bovedaCatPersonafisicaId= this.personaFisica.idPersona;
	  docente.catEstatusDocentesId= 1;
	  docente.catDocentesContactoId= 1;
	  docente.catCategoriaAcademicoId=  this.categoria.value;
	  docente.catDepartamentoEnedId= this.departamento.value;
	  docente.catPerfilAcademicoId= this.perfilAcademico.value;
	  docente.bovedaCatTipoContratacionId= this.tipoContratacion.value;
	  docente.bovedaCatNivelAcademicoId= this.nivelAcademico.value;
	  docente.tieneasignacion= this.tieneAsignacion.value;
	  docente.horarioInicio= this.horaInicio.value;
	  docente.horarioFin= this.horaFin.value;
	  docente.horasNombramiento= this.horasNombramiento.value;
	  docente.horasFrentegrupo= this.horasFrenteGrupo.value;
	  docente.horasDescargaacademica= this.horasDescarga.value;
    docente.relContactosDocente = this.dataSource;


    const respuesta = await this.catalogosServices.actualizarDocente(docente);
    if(respuesta.exito){
      this.toastService.toastSuccess(respuesta.mensaje);
      this.router.navigateByUrl('components/docentes')
    } else {
      this.toastService.toastErr(respuesta.error);
    }
  }

  public navegar(){
    this.router.navigateByUrl('components/docentes')
  }

  public async buscarCP(){

    const respuesta=  await this.catalogosServices.consultarUbicacionGeograficaCP(this.cp.value);

    let ubicacion: UbicacionGeograficaModel[]  = respuesta.objeto;

      this.estado.setValue(ubicacion[0].estado);
      this.municipio.setValue(ubicacion[0].municipio);
      //this.cp.setValue(ubicacion[].codigoPostal);

      this.listaUbicaciones = [];
      ubicacion.forEach((x)=>{
        this.listaUbicaciones.push(x);
      });


  }

  public agregarContacto() {
    let contacto = new RelContactoDocente();
    contacto.bovedaCatTipoContactoId = this.tipoContacto.value;
    contacto.tipo = this.listaTipoContacto.find(x=>x.id == this.tipoContacto.value).tipo
    contacto.contacto = this.contacto.value;
    this.dataSource.push(contacto);

    this.FormularioContacto.reset();
    this.actualizarTablaContactos();
  }

  public actualizarTablaContactos() {
    this.dataSource = this.dataSource;
    this.tablaContacto.renderRows();
  }

/*   public formularioContactoObligatorio(habilitar: boolean) {
    const tipoContacto = this.FormularioContacto.get("tipocontacto");
    const contacto = this.FormularioContacto.get("contacto");
    if (habilitar) {
      tipoContacto.setValidators([Validators.required]);
      contacto.setValidators([Validators.required]);
      tipoContacto.updateValueAndValidity();
      contacto.updateValueAndValidity();
    } else {
      tipoContacto.clearValidators();
      contacto.clearValidators();
      tipoContacto.updateValueAndValidity();
      contacto.updateValueAndValidity();
    }
  } */

  eliminarContacto(row: any) {
    console.log("clic eliminar", row);
    const index = this.dataSource.indexOf(row);
    this.dataSource.splice(index);

    this.actualizarTablaContactos();


  }

}
