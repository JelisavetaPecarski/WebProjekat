import { ObjekatZaSmestanje } from "./ObjekatZaSmestanje.js";
import { Predmet } from "./Predmet.js";
export class Korisnik
{
    constructor(listaTipova,listaSoba)
    {
        this.ID=0;
        this.korisnickoIme=null;
        this.listaTipova=listaTipova;
        this.listaSoba=listaSoba;
        this.listaObjekata=[];
        this.listaPredmeta=[];
        this.kontejner=null;
        this.DivBr=0;
        this.DivObjektiPrikaz=null;

    }
    IzborKorisnika(host)
    {

        this.kontejner=document.createElement("div");
        this.kontejner.className="LogovanjeForma";
        host.appendChild(this.kontejner);

        let lblKorisnickoIme=document.createElement("lebel");
        lblKorisnickoIme.innerHTML="Korisničko ime:"
        let korisnickoIme=document.createElement("input");
        korisnickoIme.className="KorisnickoIme";
        korisnickoIme.type="text";

        let lblSifra=document.createElement("lebel");
        lblSifra.innerHTML="Šifra:"
        let Sifra=document.createElement("input");
        Sifra.className="Sifra";
        Sifra.type="password";
      
        this.kontejner.appendChild(lblKorisnickoIme);
        this.kontejner.appendChild(korisnickoIme);
        this.kontejner.appendChild(lblSifra);
        this.kontejner.appendChild(Sifra);

        let divDugmici=document.createElement("div");
        divDugmici.className="LogovanjeDugmici";

        const btnRegistrujSe=document.createElement("button");
        btnRegistrujSe.innerHTML="Kreiraj nalog";
        btnRegistrujSe.className="Registracija";

        const btnUlogujSe=document.createElement("button");
        btnUlogujSe.innerHTML="Uloguj se";
        btnUlogujSe.className="Logovanje";

        divDugmici.appendChild(btnRegistrujSe);
        divDugmici.appendChild(btnUlogujSe);
        this.kontejner.appendChild(divDugmici);
        btnRegistrujSe.onclick=(ev)=> this.Registracija(host);
        btnUlogujSe.onclick=(ev)=> this.Logovanje(host);

    }
    Registracija(host)
    {
        let korisnickoIme=document.querySelector(".KorisnickoIme").value;
        let sifra=document.querySelector(".Sifra").value;
        console.log("Uneta šifra:"+sifra);
        if (this.ProveriUnos(korisnickoIme,sifra)==false)
        return;
        fetch("https://localhost:5001/Korisnik/DodajKorisnika/"+sifra+"/"+korisnickoIme,
        {
            method:"POST"
        }).then(p=>{
            if(!p.ok)
            throw Error('Već postoji korisnik sa ovim korisničkim imenom i šifrom');
            (p.ok)
            {
                p.json().then(id=>
                {
                    this.ID=id;
                    this.korisnickoIme=korisnickoIme;
                    host.removeChild(this.kontejner);
                    this.DrugaStrCrtaj(host);
                    
                })
                    
            }
        }).catch(e=>
            {
                alert(e.message);
            })
        
    }
    Logovanje(host)
    {
        let korisnickoIme=document.querySelector(".KorisnickoIme").value;
        let sifra=document.querySelector(".Sifra").value;
        console.log("Uneta šifra:"+sifra);
        if (this.ProveriUnos(korisnickoIme,sifra)==false)
        return;

        fetch("https://localhost:5001/Korisnik/NadjiKorisnika/"+sifra+"/"+korisnickoIme,
        {
            method:"GET"
        }).then(k=>{ 
            if(!k.ok)
            throw Error('Nije pronadjen korisnik,unesite ponovo korisničko ime i šifru');

            k.json().then(korisnik=>{
                if(k.ok)
                {
                    this.ID=korisnik;
                    this.korisnickoIme=korisnickoIme;
                    this.preuzmiObjekte(host);
                    
                }
            })
    
        }).catch(e=>
            {
                alert(e.message);
            })

    }
    preuzmiObjekte(host){

        fetch("https://localhost:5001/ObjekatZaSmestanje/ObjektiZaSmestanjePrikaz/"+this.ID,
                    {
                        method:"GET"
                    }).then(o=>{
                                o.json().then(objekti=>{
                                    objekti.forEach(objekat=>{
                                        var obj=new ObjekatZaSmestanje(objekat.id,objekat.opis,objekat.boja,objekat.soba,objekat.tip);
                                        this.listaObjekata.push(obj);
                                    });

                                    host.removeChild(this.kontejner);
                                    this.DrugaStrCrtaj(host);
                                })
                            });
    }

    ProveriUnos(korisnickoIme,sifra)
    {
        if(korisnickoIme.length == 0)
        {
            alert("Morate uneti korisničko ime");
            return false;
        }

        if(sifra.length == 0)
        {
            alert("Morate uneti šifru");
            return false;
        }
        if(sifra.length<8)
        {
            alert("Šifra mora sadržati najmanje 8 karaktera");
            return false;
        }
        if(korisnickoIme.length >30)
        {
            alert("Korisničko ime može da ima maksimalno 30 karaktera");
            return false;
        }
        return true;
    }

    DrugaStrCrtaj(host)
    {
        this.kontejner=document.createElement("div");
        this.kontejner.className="KorisnikDiv";
        host.appendChild(this.kontejner);

        let naslov=document.createElement("div");
        naslov.innerHTML="Organizujte svoj dom i omogućite sebi da bilo koji predmet iz kuće nađete pomoću jednog klika";
        naslov.className="Naslov";
        this.kontejner.appendChild(naslov);

        let odjava=document.createElement("div");
        odjava.className="Odjava";
        let korisnickoIme=document.createElement("div");
        korisnickoIme.className="korisnickoImeOdjava"
        korisnickoIme.innerHTML="Korisničko ime: "+ this.korisnickoIme;

        let btnOdjaviSe=document.createElement("button");
        btnOdjaviSe.innerHTML="Odjavi se";
        btnOdjaviSe.className="btnOdjava";
        odjava.appendChild(korisnickoIme);
        odjava.appendChild(btnOdjaviSe);
        this.kontejner.appendChild(odjava);
        btnOdjaviSe.onclick=(ev)=> this.VratiSeNaLogovanje(host);

        let kreirajObjekat=document.createElement("div");
        kreirajObjekat.className="KreirajObjekat";
        this.kontejner.appendChild(kreirajObjekat);

        this.crtajFormuKreirajObjekat(kreirajObjekat,host);
        
        if(this.listaObjekata.length!=0)
            this.crtajFormeNakonPrikazaZaObjekte(host);

    }
    VratiSeNaLogovanje(host)
    {
        host.removeChild(this.kontejner);

        this.ID=0;
        this.korisnickoIme=null;
        this.listaObjekata=[];
        this.listaPredmeta=[];
        this.DivBr=0;
        this.DivObjektiPrikaz=null;

        this.IzborKorisnika(host);

    }
    crtajFormuKreirajObjekat(host,zaOnClick)
    {
        let txtKreirajObjekat=document.createElement("div");
        txtKreirajObjekat.innerHTML="Kreirajte nekoliko objekta za smeštanje vaših predmeta:";
        txtKreirajObjekat.className="NasloviManjihFormi";
        host.appendChild(txtKreirajObjekat);

        let Boje=["bela","žuta","narandžasta","roze","crvena","ljubičasta","plava","zelena","siva","braon","crna"];

        let Boja=document.createElement("div");
        Boja.className="NizBoja";
        let lblBoja=document.createElement("label");
        lblBoja.innerHTML="Boja:";
        Boja.appendChild(lblBoja); 

        Boje.forEach(boja=>{
            let rbBoja=document.createElement("input");
            rbBoja.type="radio";   
            rbBoja.value=boja;
            rbBoja.name=this.ID;
            rbBoja.className="rdbBoje";
            Boja.appendChild(rbBoja);
            let lbl=document.createElement("label");
            lbl.innerHTML=boja;
            Boja.appendChild(lbl);
        });

        host.appendChild(Boja);

        let Tip=document.createElement("div");
        let lblTip=document.createElement("label");
        lblTip.innerHTML="Tip:";
        Tip.appendChild(lblTip);
        let seTip=document.createElement("select");
        seTip.className="select";
        seTip.name="selectTip";
        Tip.appendChild(seTip);
        let opcija;
        this.listaTipova.forEach(tip=>{
                opcija=document.createElement("option");
                opcija.innerHTML=tip.naziv;
                opcija.value=tip.ID;
                seTip.appendChild(opcija);
            });
        host.appendChild(Tip);

        let Soba=document.createElement("div");
        let lblSoba;
        let seSoba;

        this.IzaberiSobu(lblSoba,"Soba:",seSoba,"selectSoba",Soba);

        host.appendChild(Soba);

        let lblOpis=document.createElement("lebel");
        lblOpis.innerHTML="Opišite vaš objekat za smeštanje radi lakšeg snalaženja:"
        let opis=document.createElement("input");
        opis.className="Opis";
        opis.type="text";
        host.appendChild(lblOpis);
        host.appendChild(opis);

        const btnKreiraj=document.createElement("button");
        btnKreiraj.innerHTML="Kreiraj";
        btnKreiraj.className="btnDrugaStr";

        if(this.listaObjekata != null)
          this.CrtajPostojeceObjekte();

        host.appendChild(btnKreiraj); 
        btnKreiraj.onclick=(ev)=> this.KreirajObjekatZaSmestanje(zaOnClick);
    
    }
    IzaberiSobu(lblSoba,lblTxt,seSoba,seSobaName,Div)
    {
        lblSoba=document.createElement("label");
        lblSoba.innerHTML=lblTxt;
        Div.appendChild(lblSoba);
        seSoba=document.createElement("select");
        seSoba.className="select";
        seSoba.name=seSobaName;
        Div.appendChild(seSoba);
        let opcija;
        this.listaSoba.forEach(soba=>{
                opcija=document.createElement("option");
                opcija.innerHTML=soba.naziv;
                opcija.value=soba.ID;
                seSoba.appendChild(opcija);
            });

    }
    CrtajPostojeceObjekte()
    {
        this.DivObjektiPrikaz=document.createElement("div");
        this.DivObjektiPrikaz.className="Objekti";
        this.listaObjekata.forEach(obj=>{
           this.DivBr++;
           obj.CrtajObjekat(this.DivObjektiPrikaz,this.DivBr);
        }); 

        this.kontejner.appendChild(this.DivObjektiPrikaz);

            
    }
    KreirajObjekatZaSmestanje(host)
    {

        let opis=document.querySelector(".Opis");
        if(opis.value.length == 0)
        {
            alert("Morate uneti opis objekta za smeštanje");
            return;
        }
        if(opis.value.length >80)
        {
            alert("Opis objekta za smeštanje ne sme biti duži od 80 karaktera");
            return;
        }

        let boja=document.querySelector(".rdbBoje:checked");
        if(boja==null)
        {
            alert("Morate izabrati boju");
            return;
        }     

        let tip=document.querySelector("select[name='selectTip']");
        tip=tip.options[tip.selectedIndex];

        let soba=document.querySelector("select[name='selectSoba']");
        soba=soba.options[soba.selectedIndex];
        
        let obj;
        fetch("https://localhost:5001/ObjekatZaSmestanje/DodajObjekatZaSmestanje/"+opis.value+"/"+boja.value+"/"+tip.value+"/"+soba.value+"/"+this.ID,
        {
            method:"POST"
        }).then(p=>{
            (p.ok)
            {
                p.json().then(id=>
                {
                    obj=new ObjekatZaSmestanje(id,opis.value,boja.value,soba.innerHTML,tip.innerHTML);
                    
                    if(this.DivObjektiPrikaz==null)
                    this.DivObjektiPrikaz==document.createElement("div");

                    this.listaObjekata.push(obj);

                    document.querySelector(".Opis").value="";

                    alert("Kreiran je objekat za smeštanje");

                    this.DivBr=0;
                    host.removeChild(this.kontejner);
                    this.DrugaStrCrtaj(host); 

                })
                    
            }
        })
        
    }  
    crtajFormeNakonPrikazaZaObjekte(host)
    {
        let divObjekti=document.createElement("div");
        divObjekti.className="NaslovObjekti";
        divObjekti.innerHTML="Izmenite objekte za smeštanje ovde:";

        this.kontejner.appendChild(divObjekti);

        this.PremestiObjekatForma(host);
        this.IzbrisiobjekatForma(host);

        let divPredmeti=document.createElement("div");
        divPredmeti.className="NaslovObjekti";
        divPredmeti.innerHTML="Dodajte i izmenite predmete ovde:";

        this.kontejner.appendChild(divPredmeti);

        if(this.listaPredmeta.length!=0)
        this.CrtajFormuDodajPredmet(host);
        else
        {
            fetch("https://localhost:5001/Predmet/PreuzmiPredmete/"+this.ID,
            {
                method:"GET"
            }).then(p=>{
                if(p.ok)
                {
                        p.json().then(predmti=>{
                            let obj;
                            predmti.forEach(predmet=>{

                                this.listaObjekata.forEach(objekat=>{

                                if(objekat.ID==predmet.objekatID)
                                    obj=objekat; 
        
                                })
                            
                                var pr=new Predmet(predmet.id,predmet.naziv,obj);
                                this.listaPredmeta.push(pr);
                            });

                            this.CrtajFormuDodajPredmet(host);
                        })

                }

            })
        }
    } 

    PremestiObjekatForma(host)
    {
        let FormaPremestiObjekat=document.createElement("div");
        FormaPremestiObjekat.className="FormaPremestiObjekat";

        let naslov=document.createElement("div");
        naslov.className="NasloviManjihFormi";
        naslov.innerHTML="Premestite objekat za smeštanje u drugu sobu: ";
        FormaPremestiObjekat.appendChild(naslov);

        let Div=document.createElement("div");
        Div.className="PremestiObjekat";

        let DivObjekat=document.createElement("div");
        DivObjekat.className="ObjPremestiObjekat";

        let lblBrObjekta;
        let seBrObjekta;
        this.IzaberiObjekatZaSmestanje(lblBrObjekta,seBrObjekta,"sePremestiObjekat",DivObjekat);

        Div.appendChild(DivObjekat);

        let DivSoba=document.createElement("div");
        DivSoba.className="SobaPremestiObjekat";

        let lblSoba;
        let seSoba;
        this.IzaberiSobu(lblSoba,"Soba u kojoj se premešta: ",seSoba,"seSobaPremestiObejkat",DivSoba);

        Div.appendChild(DivSoba);

        FormaPremestiObjekat.appendChild(Div);

        let btnPremesti=document.createElement("button");
        btnPremesti.innerHTML="Premesti";
        btnPremesti.className="btnDrugaStr";
        FormaPremestiObjekat.appendChild(btnPremesti);

        btnPremesti.onclick=(ev)=> this.PremestiObjekat(host);

        this.kontejner.appendChild(FormaPremestiObjekat);
        
    }
    PremestiObjekat(host)
    {
        let brObjekta=document.querySelector("select[name='sePremestiObjekat']");
        brObjekta=brObjekta.options[brObjekta.selectedIndex];

        let soba=document.querySelector("select[name='seSobaPremestiObejkat']");
        soba=soba.options[soba.selectedIndex];

        let objekat;
        let SobaObj;
        this.listaObjekata.forEach(obj=>
        {
            if(obj.Div.value==brObjekta.innerHTML)
                objekat=obj;
        })

        this.listaSoba.forEach(s=>
            {
                if(s.ID==soba.value)
                SobaObj=s;
            })
        
        objekat.PromeniSobu(soba.innerHTML);

        fetch("https://localhost:5001/ObjekatZaSmestanje/PremestiObjekatZaSmestanje/"+objekat.ID+"/"+soba.value+"/",
        {
            method:"PUT"
        }).then(o=>{
            (o.ok)
            {
                this.DivBr=0;
                alert("Objekat za smeštanje je prebačen u drugu sobu");
                host.removeChild(this.kontejner);
                this.DrugaStrCrtaj(host);
                    
            }
        })

        

    }
    IzbrisiobjekatForma(host)
    {
        let IzbrisiObjekatForma=document.createElement("div");
        IzbrisiObjekatForma.className="IzbrisiObjekat";
        
        let naslov=document.createElement("div");
        naslov.className="NasloviManjihFormi";
        naslov.innerHTML="Izbrišite željeni objekat za smeštanje (Ukoliko ne želite da budu izbrisani i svi predmeti ovde smešteni prvo premestite sve predmete!): ";
        IzbrisiObjekatForma.appendChild(naslov);

        let DivObjekat=document.createElement("div");
        DivObjekat.className="ObjPremestiObjekat";

        let lblBrObjekta;
        let seBrObjekta;
        this.IzaberiObjekatZaSmestanje(lblBrObjekta,seBrObjekta,"seIzbrisiObjekat",DivObjekat);

        IzbrisiObjekatForma.appendChild(DivObjekat);

        let btnIzbrisi=document.createElement("button");
        btnIzbrisi.innerHTML="Izbriši";
        btnIzbrisi.className="btnDrugaStr";
        IzbrisiObjekatForma.appendChild(btnIzbrisi);

        btnIzbrisi.onclick=(ev)=> this.IzbrisiObjekat(host);

        this.kontejner.appendChild(IzbrisiObjekatForma);

    }
    IzbrisiObjekat(host)
    {
        let brObjekta=document.querySelector("select[name='seIzbrisiObjekat']");
        brObjekta=brObjekta.options[brObjekta.selectedIndex];

        let index;
        let objekat;
        this.listaObjekata.forEach((obj,i)=>
        {
            if(obj.Div.value==brObjekta.innerHTML)
            {
                objekat=obj;
                index=i;
            }
   
        })

        fetch("https://localhost:5001/ObjekatZaSmestanje/ObrisiObjekatZaSmestanje/"+objekat.ID+"/",
        {
            method:"DELETE"
        }).then(o=>{
            (o.ok)
            {
                this.DivBr=0;
                this.listaObjekata.splice(index,1);
                alert("Objekat za smeštanje je izbrisan");
                host.removeChild(this.kontejner);
                this.listaPredmeta=[];
                this.DrugaStrCrtaj(host);
                    
            }
        })

    }
    CrtajFormuDodajPredmet(host)
    {
        let FormaDodajPredmet=document.createElement("div");
        FormaDodajPredmet.className="FormaDodajPredmet";
        let txtDodajPredmet=document.createElement("div");
        txtDodajPredmet.className="NasloviManjihFormi";
        txtDodajPredmet.innerHTML="Dodajte predmet u željeni objekat za smeštanje:";
        this.kontejner.appendChild(FormaDodajPredmet);
        FormaDodajPredmet.appendChild(txtDodajPredmet);

        let BrObjekta=document.createElement("div");
        let lblBrObjekta;
        let seBrObjekta;
        this.IzaberiObjekatZaSmestanje(lblBrObjekta,seBrObjekta,"selectBrObjekta",BrObjekta);
        FormaDodajPredmet.appendChild(BrObjekta);

        let Predmet=document.createElement("div");
        Predmet.className="NazivPredmetaDiv";
        let lblPredmet=document.createElement("label");
        lblPredmet.innerHTML="Unesite naziv predmeta: ";
        Predmet.appendChild(lblPredmet);

        let NazivPredmeta=document.createElement("input");
        NazivPredmeta.className="NazivPredmeta";
        NazivPredmeta.type="text";
        Predmet.appendChild(NazivPredmeta);

        FormaDodajPredmet.appendChild(Predmet);

        let btnDodaj=document.createElement("button");
        btnDodaj.innerHTML="Smesti predmet";
        btnDodaj.className="btnDrugaStr";
        FormaDodajPredmet.appendChild(btnDodaj);

        if(this.listaPredmeta.length!=0)
        {
            this.CrtajFormuPronadjiPredmet(host);
            this.CrtajFormuPremestiPredmet();
            this.CrtajFormuIzbrisiPredmet(host);
        }

        btnDodaj.onclick=(ev)=> this.SmestiPredmet(host);

    }
    IzaberiObjekatZaSmestanje(lblBrObjekta,seBrObjekta,seName,Div)
    {
        lblBrObjekta=document.createElement("label");
        lblBrObjekta.innerHTML="Redni broj objekta za smeštanje: ";
        Div.appendChild(lblBrObjekta);
        seBrObjekta=document.createElement("select");
        seBrObjekta.className="select";
        seBrObjekta.name=seName;
        Div.appendChild(seBrObjekta);
        let opcija;
        for(let i=1;i<=this.DivBr;i++)
        {
            opcija=document.createElement("option");
            opcija.innerHTML=i;
            seBrObjekta.appendChild(opcija);
        }
    }
    SmestiPredmet(host)
    {
        let nazivPredmeta=document.querySelector(".NazivPredmeta").value;
        if(nazivPredmeta.length == 0)
        {
            alert("Morate uneti naziv predmeta");
            return;
        }
        if(nazivPredmeta.length >80)
        {
            alert("Naziv predmeta ne sme biti duži od 80 karaktera");
            return;
        }

        let brObjekta=document.querySelector("select[name='selectBrObjekta']");
        brObjekta=brObjekta.options[brObjekta.selectedIndex];

        let objekat;
        this.listaObjekata.forEach(obj=>
        {
            if(obj.Div.value==brObjekta.innerHTML)
                objekat=obj;
        })

        let predmet;
        fetch("https://localhost:5001/Predmet/DodajPredmet/"+nazivPredmeta+"/"+objekat.ID,
        {
            method:"POST"
        }).then(p=>{
            (p.ok)
            {
                p.json().then(id=>{
                    predmet=new Predmet(id,nazivPredmeta,objekat);
                    this.listaPredmeta.push(predmet);
                    alert("Predmet je smešten u objekat za smeštanje sa rednim brojem "+ predmet.Objekat.Div.value+" : "+ predmet.Objekat.Opis);
                    document.querySelector(".NazivPredmeta").value="";  
                    this.DivBr=0;
                    host.removeChild(this.kontejner);
                    this.DrugaStrCrtaj(host);  

                })   
            }
        })
        if(this.listaPredmeta.length==1)
        {
            this.CrtajFormuPronadjiPredmet(host);
            this.CrtajFormuPremestiPredmet();
            this.CrtajFormuIzbrisiPredmet(host);
        }
        
    }
    CrtajFormuPremestiPredmet()
    {
        let Div=document.createElement("div");
        Div.className="PremestiPredmetForma";

        let lblNaslov=document.createElement("div");
        lblNaslov.innerHTML="Premestite predmet:";
        lblNaslov.className="NasloviManjihFormi";

        Div.appendChild(lblNaslov);

        let Div1=document.createElement("div");
        Div1.className="PremestiPredmet";

        let lblPredmet;
        let NazivPredmetaTrazi;
        let sePredmeti;
        let divPredmeti;
        this.NapraviInputISelectZaPredmete(lblPredmet,NazivPredmetaTrazi,"PremestiPredmetNazivPredmeta",sePredmeti,"sePredmeti",divPredmeti,"PremestiPredmetPolovina",Div1);

        let divObjekti=document.createElement("div");
        divObjekti.className="PremestiPredmetDrugaPolovina";
        let lblObjeka=document.createElement("label");
        lblObjeka.innerHTML="Redni broj objekta za smeštanje u koji se premešta predmet:";

        let divSelect=document.createElement("div");
        let seBrObjekta=document.createElement("select");
        seBrObjekta.className="select";
        seBrObjekta.name="BrObjektaPremestiPredmet";
    
        let opcija;
        for(let i=1;i<=this.DivBr;i++)
        {
            opcija=document.createElement("option");
            opcija.innerHTML=i;
            seBrObjekta.appendChild(opcija);
        }
        divObjekti.appendChild(lblObjeka);
        divSelect.appendChild(seBrObjekta);
        divObjekti.appendChild(divSelect);

        Div1.appendChild(divObjekti);
        
        let btnPremeseti=document.createElement("button");
        btnPremeseti.innerHTML="Premesti predmet";
        btnPremeseti.className="btnDrugaStr";
        Div.appendChild(Div1);
        Div.appendChild(btnPremeseti);
        this.kontejner.appendChild(Div);

        btnPremeseti.onclick=(ev)=> this.PremestiPredmet();

        
    }
    FiltrirajPredmete(nazivPredmeta,sePredmeti,host)
    {
        let seStaro=host.querySelector("."+sePredmeti.className);
        if(nazivPredmeta.length==0)
         {
            host.removeChild(seStaro);
            host.appendChild(sePredmeti);
            return;
         }

        let brOpcija=this.listaPredmeta.length;

        let opcija;
        let novaOpcija;
        let lista=[];

        for(let i=0;i<brOpcija;i++)
        {
            opcija=sePredmeti.options[i];
        
            if((opcija.innerHTML.toUpperCase()).includes(nazivPredmeta.toUpperCase()))
            {
                novaOpcija=document.createElement("option");
                novaOpcija.innerHTML=opcija.innerHTML;
                novaOpcija.value=opcija.value; 
        
                lista.push(novaOpcija);
            }
        }
              
        if(lista.length==0)
        {
            host.removeChild(seStaro);
            host.appendChild(sePredmeti);
            return;
        
        }

        let seNova=document.createElement("select");
        seNova.className=sePredmeti.className;
        seNova.name=sePredmeti.name;

        lista.forEach(o=>{
            seNova.appendChild(o);
        });

        host.removeChild(seStaro);
        host.appendChild(seNova);

    }
    PremestiPredmet()
    {   
        let predmet=document.querySelector("select[name='sePredmeti']");
        let objekat=document.querySelector("select[name='BrObjektaPremestiPredmet']");
        predmet=predmet.options[predmet.selectedIndex];
        objekat=objekat.options[objekat.selectedIndex];

        let noviObjekat;
        this.listaObjekata.forEach(obj=>
        {
            if(obj.Div.value==objekat.innerHTML)
                noviObjekat=obj;
        })

        let pr;
        fetch("https://localhost:5001/Predmet/PremestiPredmet/"+predmet.value+"/"+noviObjekat.ID,
        {
            method:"PUT"
        }).then(p=>{
            (p.ok)
            {
                this.listaPredmeta.forEach(p1=>{
                    if(p1.ID==predmet.value)
                        pr=p1;
                })

                pr.PremestiPredmet(noviObjekat);
                document.querySelector(".PremestiPredmetNazivPredmeta").value="";     
                alert("Predmet je premešten u objekat za smeštanje sa rednim brojem "+ pr.Objekat.Div.value+" : "+ pr.Objekat.Opis);
            }
        })

    }
    CrtajFormuPronadjiPredmet(host)
    {
        let Div=document.createElement("div");
        Div.className="PronadjiPredmetFormaGlavna";     
        let lblNaslov=document.createElement("div");
        lblNaslov.innerHTML="Pronadjite željeni predmet:";
        lblNaslov.className="NasloviManjihFormi";
        Div.appendChild(lblNaslov);

        let lblPredmet;
        let NazivPredmetaTrazi;
        let sePredmeti;
        let divPredmeti;
        this.NapraviInputISelectZaPredmete(lblPredmet,NazivPredmetaTrazi,"PronadjiPredmetNazivPredmeta",sePredmeti,"selPredmeti",divPredmeti,"PronadjiPredmetForma",Div);
        let btnPronadji=document.createElement("button");
        btnPronadji.className="btnDrugaStr";
        btnPronadji.innerHTML="Pronadji predmet";
        Div.appendChild(btnPronadji);
        btnPronadji.onclick=(ev)=> this.PronadjiPredmet(host);

        this.kontejner.appendChild(Div);
    }
    NapraviInputISelectZaPredmete(lblPredmet,NazivPredmetaTrazi,InputClassName,sePredmeti,seName,divPredmeti,formaNaziv,DIV)
    {
        divPredmeti=document.createElement("div");
        divPredmeti.className=formaNaziv;

        lblPredmet=document.createElement("label");
        lblPredmet.innerHTML="Filtrirajte listu predmeta pomoću ovog polja:";
        NazivPredmetaTrazi=document.createElement("input");
        NazivPredmetaTrazi.className=InputClassName;
        NazivPredmetaTrazi.type="text";

        sePredmeti=document.createElement("select");
        sePredmeti.className="select";
        sePredmeti.name=seName;
        let opcija;
        this.listaPredmeta.forEach(predmet=>{
            opcija=document.createElement("option");
            opcija.innerHTML=predmet.naziv;
            opcija.value=predmet.ID;
            sePredmeti.appendChild(opcija);
        });
        divPredmeti.appendChild(lblPredmet);
        divPredmeti.appendChild(NazivPredmetaTrazi);
        divPredmeti.appendChild(sePredmeti);

        NazivPredmetaTrazi.onkeyup=(ev)=> this.FiltrirajPredmete(NazivPredmetaTrazi.value,sePredmeti,divPredmeti);
        DIV.appendChild(divPredmeti);
    }
    PronadjiPredmet(host)
    {
        let predmet=document.querySelector("select[name='selPredmeti']");
        predmet=predmet.options[predmet.selectedIndex].value;

        fetch("https://localhost:5001/Predmet/PronadjiPredmet/"+predmet,
        {
            method:"GET"
        }).then(p=>{
            (p.ok)
            {
                let obj;
                p.json().then(idObjekta=>{

                    this.listaObjekata.forEach(objekat=>{

                        if(objekat.ID==idObjekta)
                         obj=objekat; 

                     })
                    document.querySelector(".PronadjiPredmetNazivPredmeta").value="";  
            
                    this.CrtajPronadjenPredmet(host,obj);

                })   
            }
        })

    }
    CrtajPronadjenPredmet(host,obj)
    {
        host.removeChild(this.kontejner);
        this.kontejner=document.createElement("div");
        this.kontejner.className="PronadjenPredmetPrikaz";  
        host.appendChild(this.kontejner);

        let labela=document.createElement("label");
        labela.innerHTML="Traženi predmet je uspešno pronadjen.Nalazi se u ovom objektu za smeštanje:";

        this.kontejner.appendChild(labela);
        this.kontejner.appendChild(obj.Div);

        let btnVratiSe=document.createElement("button");
        btnVratiSe.innerHTML="Vrati se nazad";
        btnVratiSe.className="btnVratiSe";

        this.kontejner.appendChild(btnVratiSe);
        btnVratiSe.onclick=(ev)=> this.VratiSe(host);

    }
    VratiSe(host)
    {
        this.DivBr=0;
        host.removeChild(this.kontejner);
        this.DrugaStrCrtaj(host);
    }
    CrtajFormuIzbrisiPredmet(host)
    {
        let Div=document.createElement("div");
        Div.className="FormaIzbrisiPredmet";
        let lblNaslov=document.createElement("div");
        lblNaslov.innerHTML="Izbrišite predmet:";
        lblNaslov.className="NasloviManjihFormi";
        Div.appendChild(lblNaslov);

        let lblPredmet;
        let NazivPredmetaTrazi;
        let sePredmeti;
        let divPredmeti;
        this.NapraviInputISelectZaPredmete(lblPredmet,NazivPredmetaTrazi,"IzbisiPredmetNazivPredmeta",sePredmeti,"seIzbrisiPredmet",divPredmeti,"IzbrisiPredmetForma",Div);
        let btnIzbrisi=document.createElement("button");
        btnIzbrisi.className="btnDrugaStr";
        btnIzbrisi.innerHTML="Izbriši predmet";
        Div.appendChild(btnIzbrisi);
        btnIzbrisi.onclick=(ev)=> this.IzbrisiPredmet(host);

        this.kontejner.appendChild(Div);

    }
    IzbrisiPredmet(host)
    {
        let predmet=document.querySelector("select[name='seIzbrisiPredmet']");
        predmet=predmet.options[predmet.selectedIndex].value;
        
        let index;
        fetch("https://localhost:5001/Predmet/UkloniPredmet/"+predmet,
        {
            method:"DELETE"
        }).then(p=>{
            (p.ok)
            {
                this.listaPredmeta.forEach((p1,i)=>{
                    if(p1.ID==predmet)
                        index=i;
                })

                this.listaPredmeta.splice(index,1);
                alert("Izabrani predmet je obrisan");
                document.querySelector(".IzbisiPredmetNazivPredmeta").value=""; 
                this.DivBr=0;
                host.removeChild(this.kontejner);
                this.DrugaStrCrtaj(host);    
            }
        })
    }

}