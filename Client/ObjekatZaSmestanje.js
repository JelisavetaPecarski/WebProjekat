export class ObjekatZaSmestanje
{
    constructor(id,opis,boja,soba,tip)
    {
        this.ID=id;
        this.Opis=opis;
        this.Boja=boja;
        this.Soba=soba;
        this.Tip=tip;
        this.Div=null;
    }
    CrtajObjekat(host,redniBr)
    {
        this.Div=document.createElement("div");
        this.Div.classList.add("objekat",this.Boja);
        this.Div.value=redniBr;
        this.ObjInnerHTML();
        host.appendChild(this.Div);
    }
    PromeniSobu(soba)
    {
        this.Soba=soba;
        this.ObjInnerHTML();
    }
    ObjInnerHTML()
    {
        this.Div.innerHTML=this.Div.value+"."+"<br />"+this.Opis+"<br />"+"("+this.Soba+")"+"<br />"+"<br />"+"-"+this.Tip+"-";
    }
    
}