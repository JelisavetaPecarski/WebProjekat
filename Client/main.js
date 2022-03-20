import { TipObjektaZaSmestanje } from "./TipObjektaZaSmestanje.js";
import { Soba } from "./Soba.js";
import { Korisnik } from "./Korisnik.js";

var listaTipova=[];
var listaSoba=[];
fetch("https://localhost:5001/TipObjektaZaSmestanje/PreuzmiTipoveObjekataZaSmestanje")
.then(p=>{
        p.json().then(tipovi=>{
            tipovi.forEach(tip=>{
                var t=new TipObjektaZaSmestanje(tip.id,tip.naziv);
                listaTipova.push(t);
            });
            fetch("https://localhost:5001/Soba/PreuzmiSobe")
            .then(p=>{
                    p.json().then(sobe=>{
                        sobe.forEach(soba=>{
                            var s=new Soba(soba.id,soba.naziv);
                            listaSoba.push(s);
                        });

                        var korisnik=new Korisnik(listaTipova,listaSoba);
                        korisnik.IzborKorisnika(document.body);
                    })
                })
 
            })
    })
