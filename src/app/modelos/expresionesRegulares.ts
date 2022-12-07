import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ExprecionesRegulares {
    public curp="[A-Z a-z]{1}[AEIOU aeiou]{1}[A-Z a-z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM hm]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE|as|bc|bs|cc|cs|ch|cl|cm|df|dg|gt|gr|hg|jc|mc|mn|ms|nt|nl|oc|pl|qt|qr|sp|sl|sr|tc|ts|tl|vz|yn|zs|ne)[B-DF-HJ-NP-TV-Z b-df-hj-np-tv-z]{3}[0-9A-Z a-z]{1}[0-9]{1}$";
    public email="[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?";
    public codigoPostal="^([0-9]{5})+$";
    public rfc="^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$";   
    public alfanumericos ="[a-zA-Z0-9]+";
    public numerosYLetras="^([a-z ñáéíóú A-Z ÑÁÉÍÓÚ . / , ; \- : 0-9]+[\s]*)+$";
    public numeros="^[0-9,$]*$";
    public numerosDecimales="^[0-9]+([.][0-9]+)?$";
    public letras="[A-Za-z ]";
    public numerosIMSS="/^\d{11}$/";
    
    //public alfanumericoDefinico="([a-z] {2,} [0-9] {3,5})";//Dos o más letras seguidas por tres a cinco números 
}